"""Regressões da fila SQLite, com provedores simulados."""

from concurrent.futures import ThreadPoolExecutor
from contextlib import closing
from threading import Barrier
import json
import os
import unittest
from unittest.mock import Mock, patch

from requests.exceptions import ReadTimeout

from test_v6 import TEXTO, app, dados_ficticios
from banco import conectar, inicializar_banco
from fila_redacao import finalizar, limites, processar, reservar
from redacao_ia_api import _normalizar


class TestFilaRedacao(unittest.TestCase):
    def setUp(self):
        self.config = patch.dict(os.environ, {
            'ATIVAR_OLLAMA': 'true', 'OLLAMA_URL': 'http://ollama:11434', 'OLLAMA_MODEL': 'teste',
            'ATIVAR_GEMINI': 'true', 'GEMINI_API_KEY': 'teste',
            'REDACAO_IA_CONCORRENCIA': '2', 'REDACAO_GEMINI_CONCORRENCIA': '1',
        })
        self.config.start()
        self.addCleanup(self.config.stop)
        self.cliente = self.cadastrar()
        self.tema = self.cliente.get('/api/temas-redacao').json['temas'][0]['id']
        self.addCleanup(self.cliente.delete, '/api/redacoes')

    def cadastrar(self):
        cliente = app.test_client()
        resposta = cliente.post('/api/cadastro', json={
            'nome': 'Aluno da fila', 'email': f'fila-{os.urandom(8).hex()}@example.org',
            'senha': 'senha-teste-fila', 'serie': 3, 'vests': ['ENEM'],
        })
        self.assertEqual(resposta.status_code, 201, resposta.json)
        return cliente

    def enviar(self, texto=TEXTO, provedor='ollama', detalhe='resumido'):
        resposta = self.cliente.post('/api/redacao/avaliacoes', json={
            'texto': texto, 'tema_id': self.tema, 'provedor': provedor, 'detalhe': detalhe,
        })
        self.assertEqual(resposta.status_code, 202, resposta.json)
        return resposta.json

    def test_turma_com_vagas_independentes_e_resultados_isolados(self):
        primeiro = self.enviar()
        self.assertEqual(primeiro['id'], self.enviar()['id'])
        segundo = self.enviar(detalhe='detalhado')
        terceiro = self.enviar(provedor='gemini')
        for i in range(27):
            self.enviar(texto=f'{TEXTO}\n\nTrecho revisado {i}.')
        with ThreadPoolExecutor(max_workers=6) as pool:
            reservas = list(pool.map(lambda _: reservar(limites()), range(8)))
        ativos = {r['id']: r for r in reservas if r}
        self.assertEqual(set(ativos), {primeiro['id'], segundo['id'], terceiro['id']})
        painel = self.cliente.get('/api/redacoes').json
        self.assertEqual(len(painel['avaliacoes']), 30)
        self.assertEqual(sum(a['estado'] == 'fila' for a in painel['avaliacoes']), 27)

        for envio, nota in ((terceiro, 1000), (segundo, 800), (primeiro, 600)):
            bruto = dados_ficticios()
            for competencia in bruto['competencias']:
                competencia['nota_estimada'] = nota // 5
            trabalho = ativos[envio['id']]
            alvo = 'redacao_ia_api._gerar_ollama' if trabalho['provedor'] == 'ollama' else 'redacao_ia_api._gerar_gemini'
            with patch(alvo, return_value=bruto):
                processar(trabalho)
        painel = self.cliente.get('/api/redacoes').json
        self.assertEqual(next(r['nota'] for r in painel['redacoes'] if r['id'] == primeiro['redacao_id']), 1000)
        avaliacoes = {a['id']: a for a in painel['avaliacoes']}
        for envio, nota in ((terceiro, 1000), (segundo, 800), (primeiro, 600)):
            url = f"/api/redacao/avaliacoes/{envio['id']}"
            self.assertEqual(avaliacoes[envio['id']]['nota'], nota)
            self.assertIn(f'"nota_estimada": {nota}', self.cliente.get(url).json['resultado_ia'])
        self.assertEqual(len(avaliacoes), 30)
        self.assertEqual(self.cadastrar().get(url).status_code, 404)

    def test_expiracao_de_reserva_e_exclusao(self):
        envio = self.enviar()
        expirado = reservar(limites(), agora=1000)
        novo = reservar(limites(), agora=1601)
        self.assertEqual(expirado['id'], novo['id'])
        self.assertNotEqual(expirado['reserva'], novo['reserva'])
        resultado = _normalizar(dados_ficticios(), TEXTO, 'ENEM')
        finalizar(expirado, resultado)
        self.assertEqual(self.cliente.get(f"/api/redacao/avaliacoes/{envio['id']}").json['estado'], 'processando')
        self.cliente.delete(f"/api/redacoes/{envio['redacao_id']}")
        finalizar(novo, resultado)
        self.assertEqual(self.cliente.get(f"/api/redacao/avaliacoes/{envio['id']}").status_code, 404)

    def test_gemini_processa_duas_versoes_simultaneamente(self):
        envios = [self.enviar(texto=f'{TEXTO} Versão {n}.', provedor='gemini') for n in (1, 2)]
        vagas = {**limites(), 'gemini': 2}
        trabalhos = [reservar(vagas), reservar(vagas)]
        simultaneos = Barrier(2, timeout=5)

        def gerar(_prompt):
            simultaneos.wait()
            return dados_ficticios()

        with patch('redacao_ia_api._gerar_gemini', side_effect=gerar):
            with ThreadPoolExecutor(max_workers=2) as pool:
                list(pool.map(processar, trabalhos))
        for envio in envios:
            status = self.cliente.get(f"/api/redacao/avaliacoes/{envio['id']}").json
            self.assertEqual(status['estado'], 'concluida')

    def test_ollama_reaproveita_relatorio_valido_mesmo_sem_extras(self):
        envio = self.enviar(detalhe='detalhado')
        trabalho = reservar(limites())
        bruto = dados_ficticios()
        bruto.pop('resumo')
        for c in bruto['competencias']:
            c['nota_estimada'] = '160'
            c.pop('pontos_fortes')
            c.pop('ajustes')
        resposta = Mock()
        resposta.json.return_value = {'response': json.dumps(bruto), 'done_reason': 'length'}
        with patch('requests.post', return_value=resposta) as chamada:
            processar(trabalho)
        self.assertEqual(chamada.call_count, 1)
        salvo = self.cliente.get(f"/api/redacao/avaliacoes/{envio['id']}").json
        self.assertEqual(salvo['estado'], 'concluida')
        resultado = json.loads(salvo['resultado_ia'])
        self.assertEqual(resultado['nota_estimada'], 800)
        self.assertEqual(resultado['detalhe'], 'resumido')
        self.assertIn('entregou uma avaliação resumida', resultado['aviso'])
        historico = self.cliente.get('/api/redacoes').json['avaliacoes']
        self.assertEqual(historico[0]['detalhe'], 'detalhado')
        self.assertEqual(historico[0]['detalhe_entregue'], 'resumido')

    def test_ollama_tenta_resposta_resumida_apos_timeout_ou_json_truncado(self):
        resposta = Mock()
        resposta.json.return_value = {'response': json.dumps(dados_ficticios())}
        truncada = Mock()
        truncada.json.return_value = {'response': '{"competencias": [', 'done_reason': 'length'}
        for falha in (truncada, ReadTimeout('simulado')):
            with self.subTest(falha=falha):
                envio = self.enviar(detalhe='detalhado')
                trabalho = reservar(limites())
                with patch('requests.post', side_effect=[falha, resposta]) as chamada:
                    processar(trabalho)
                self.assertEqual(chamada.call_count, 2)
                primeira, segunda = [c.kwargs for c in chamada.call_args_list]
                self.assertEqual(segunda['json']['think'], False)
                self.assertLess(segunda['json']['options']['num_predict'], primeira['json']['options']['num_predict'])
                self.assertLess(sum(primeira['timeout']) + sum(segunda['timeout']), 600)
                salvo = self.cliente.get(f"/api/redacao/avaliacoes/{envio['id']}").json
                self.assertEqual(salvo['estado'], 'concluida')
                self.assertEqual(json.loads(salvo['resultado_ia'])['detalhe'], 'resumido')

    def test_status_do_gemini_distingue_chave_ausente_e_recusada(self):
        from google.genai.errors import ClientError

        with patch.dict(os.environ, {'GEMINI_API_KEY': ''}):
            config = self.cliente.get('/api/config-publica').json
            self.assertIn('sem chave', config['gemini_redacao_mensagem'])
            self.assertNotIn('gemini', config['provedores_redacao'])
        envio = self.enviar(provedor='gemini')
        trabalho = reservar(limites())
        erro = ClientError(400, {'error': {
            'message': 'Credencial privada de teste',
            'status': 'INVALID_ARGUMENT',
            'details': [{'reason': 'API_KEY_INVALID'}],
        }})
        with patch('redacao_ia_api._gerar_gemini', side_effect=erro):
            processar(trabalho)
        salvo = self.cliente.get(f"/api/redacao/avaliacoes/{envio['id']}").json
        self.assertEqual(salvo['estado'], 'falhou')
        self.assertIn('recusou a chave', salvo['erro'])
        self.assertNotIn('Credencial privada', salvo['erro'])
        historico = self.cliente.get('/api/redacoes').json['avaliacoes']
        self.assertEqual(historico[0]['redacao_id'], envio['redacao_id'])
        self.assertEqual(historico[0]['erro'], salvo['erro'])
        self.assertFalse(historico[0]['tem_relatorio'])

    def test_migracao_preserva_nota_anterior(self):
        resposta = self.cliente.post('/api/redacoes', json={'tema_id': self.tema, 'texto': TEXTO})
        redacao_id = resposta.json['id']
        with closing(conectar()) as conexao, conexao:
            conexao.execute('UPDATE redacoes SET nota=720 WHERE id=?', (redacao_id,))
        inicializar_banco()
        inicializar_banco()
        notas = self.cliente.get('/api/redacoes').json['avaliacoes']
        self.assertEqual([(a['provedor'], a['nota']) for a in notas], [('anterior', 720)])


if __name__ == '__main__':
    unittest.main()
