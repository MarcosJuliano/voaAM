"""Regressões finais do voaAM sem chamadas pagas nem acesso ao Supabase.

Execute: python -m unittest discover -s tests -p 'test_finalizacao_voaam.py' -v
"""
import os
import unittest
from contextlib import closing
from unittest.mock import patch

from test_v6 import TEXTO, app, dados_ficticios
from banco import conectar
from redacao_ia_api import _normalizar
from fila_redacao import finalizar
from redacoes_api import obter_redacao, buscar_tema


class TestFinalizacaoVoaam(unittest.TestCase):
    def setUp(self):
        self.cliente = app.test_client()
        resposta = self.cliente.post('/api/cadastro', json={
            'nome': 'Aluno Fictício',
            'email': f'finalizacao-{os.urandom(8).hex()}@example.test',
            'senha': 'senha-somente-para-teste',
            'serie': 3, 'vests': ['ENEM'],
        })
        self.assertEqual(resposta.status_code, 201, resposta.get_json())
        self.uid = resposta.get_json()['usuario']['id']
        self.tema = self.cliente.get('/api/temas-redacao').get_json()['temas'][0]
        self.addCleanup(self.cliente.delete, '/api/redacoes')

    def _enviar(self, texto, provedor='cloudflare'):
        return self.cliente.post('/api/redacao/avaliacoes', json={
            'tema_id': self.tema['id'], 'texto': texto, 'provedor': provedor,
            'detalhe': 'detalhado',
        })

    def test_api_privada_nao_permite_cache_compartilhado(self):
        resposta = self.cliente.get('/api/redacoes')
        self.assertEqual(resposta.status_code, 200)
        self.assertIn('no-store', resposta.headers.get('Cache-Control', ''))

    def test_recompensa_uma_vez_para_duas_avaliacoes_da_mesma_redacao(self):
        with closing(conectar()) as c, c:
            c.execute('BEGIN IMMEDIATE')
            redacao_id, _ = obter_redacao(c, self.uid, self.tema, TEXTO)
            trabalhos = []
            for provedor in ('cloudflare', 'ollama'):
                token = os.urandom(16).hex()
                cursor = c.execute(
                    """INSERT INTO avaliacoes_redacao
                         (redacao_id, provedor, detalhe, estado, reserva, tentativas)
                       VALUES (?, ?, 'detalhado', 'processando', ?, 1)""",
                    (redacao_id, provedor, token),
                )
                trabalhos.append({'id': cursor.lastrowid, 'redacao_id': redacao_id, 'reserva': token})
        relatorio = _normalizar(dados_ficticios(), TEXTO, 'ENEM')
        for trabalho in trabalhos:
            finalizar(trabalho, relatorio)
        with closing(conectar()) as c:
            recompensa = c.execute(
                'SELECT COUNT(*) AS total, SUM(xp) AS xp FROM recompensas_redacoes_assinaturas WHERE usuario_id=?',
                (self.uid,),
            ).fetchone()
            progresso = c.execute('SELECT xp FROM progresso WHERE usuario_id=?', (self.uid,)).fetchone()
            estados = c.execute(
                'SELECT estado FROM avaliacoes_redacao WHERE redacao_id=?', (redacao_id,)
            ).fetchall()
        self.assertEqual(recompensa['total'], 1)
        self.assertEqual(recompensa['xp'], 32)
        self.assertEqual(progresso['xp'], 32)
        self.assertEqual([r['estado'] for r in estados], ['concluida', 'concluida'])

    def test_falha_tecnica_nao_consume_cota_de_sucessos_mas_tem_limite(self):
        with patch('fila_redacao.provedores_disponiveis', return_value=['cloudflare']), \
             patch.dict(os.environ, {'CLOUDFLARE_LIMITE_DIA': '2'}):
            for i in range(3):
                resposta = self._enviar(TEXTO + f' Tentativa de teste {i}.')
                self.assertEqual(resposta.status_code, 202, resposta.get_json())
                with closing(conectar()) as c, c:
                    c.execute('BEGIN IMMEDIATE')
                    c.execute(
                        "UPDATE avaliacoes_redacao SET estado='falhou', erro='Falha simulada' WHERE id=?",
                        (resposta.get_json()['id'],),
                    )
            limite = self._enviar(TEXTO + ' Quarta tentativa de teste.')
            self.assertEqual(limite.status_code, 429)
            self.assertIn('tentativas', limite.get_json()['message'].lower())

    def test_cota_conta_fila_e_nao_duplica_pedido_ativo(self):
        with patch('fila_redacao.provedores_disponiveis', return_value=['cloudflare']), \
             patch.dict(os.environ, {'CLOUDFLARE_LIMITE_DIA': '2'}):
            um = self._enviar(TEXTO + ' Primeira versão.')
            self.assertEqual(um.status_code, 202, um.get_json())
            repetido = self._enviar(TEXTO + ' Primeira versão.')
            self.assertEqual(repetido.status_code, 202)
            self.assertTrue(repetido.get_json().get('reutilizada'))
            dois = self._enviar(TEXTO + ' Segunda versão.')
            self.assertEqual(dois.status_code, 202, dois.get_json())
            tres = self._enviar(TEXTO + ' Terceira versão.')
            self.assertEqual(tres.status_code, 429)


if __name__ == '__main__':
    unittest.main()
