"""Regressão desta atualização: rode no Docker `python tests/test_feedback_2026.py`."""
from hashlib import sha256
import io
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

BASE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE))
TEMP = tempfile.TemporaryDirectory()
os.environ['DATABASE_PATH'] = str(Path(TEMP.name) / 'isolado.db')
os.environ['FLASK_SECRET_KEY'] = 'chave-somente-teste'
os.environ['ATIVAR_GEMINI'] = 'false'
os.environ['ATIVAR_OLLAMA'] = 'false'
from app import app  # noqa: E402
from banco import conectar  # noqa: E402
from treino_api import catalogo  # noqa: E402
from fila_redacao import finalizar  # noqa: E402


class TestarFeedback(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.email = f'aluno-{os.urandom(6).hex()}@example.test'
        r = self.client.post('/api/cadastro', json={
            'nome': 'Aluno Teste', 'email': self.email, 'senha': 'senha1234',
            'confirmar_senha': 'senha1234', 'serie': 3, 'vests': ['ENEM'],
        })
        self.assertEqual(r.status_code, 201, r.get_json())
        self.uid = r.get_json()['usuario']['id']

    def test_frontend_entrega_recursos_da_mesma_versao(self):
        import re

        for caminho in ('/', '/index.html'):
            resposta = self.client.get(caminho)
            html = resposta.get_data(as_text=True)
            versao = re.search(r'data-versao="([0-9a-f]{16})"', html)
            self.assertIsNotNone(versao)
            self.assertIn(f'css/style.css?v={versao[1]}', html)
            self.assertNotIn('__VOAAM_FRONTEND__', html)
            self.assertEqual(resposta.headers['Cache-Control'], 'no-store')
            for recurso in ('components/header.html', 'pages/perfil.html', 'js/modules/conta.js'):
                arquivo = self.client.get(f'/{recurso}?v={versao[1]}')
                self.assertEqual(arquivo.status_code, 200)
                arquivo.close()

    def test_confirmacao_senha(self):
        r = self.client.post('/api/cadastro', json={
            'nome': 'Outro Aluno', 'email': 'outro' + os.urandom(4).hex() + '@example.test',
            'senha': 'senha1234', 'confirmar_senha': 'outra-senha',
            'serie': 3, 'vests': ['ENEM']})
        self.assertEqual(r.status_code, 400)

    def test_notas_exercicios_respeitam_lista_conta_e_ordem(self):
        questoes = [q for q in catalogo() if q['id'].startswith('banco:')][:3]
        q1, q2, q3 = questoes
        url = '/api/praticar/exercicios/notas?id=' + q1['id'] + '&id=' + q2['id']
        for q, acertou in ((q1, True), (q2, True), (q3, True), (q1, False)):
            indice = q['correta'] if acertou else (q['correta'] + 1) % len(q['alternativas'])
            r = self.client.post('/api/avaliacao/responder', json={'questao_id': q['id'], 'alternativa': indice})
            self.assertEqual(r.status_code, 200, r.get_json())
        resposta = self.client.get(url)
        self.assertEqual(resposta.headers['Cache-Control'], 'private, no-store')
        self.assertEqual(resposta.get_json(), {
            'ultimas': [{'questao_id': q1['id'], 'nota': 0}, {'questao_id': q2['id'], 'nota': 100},
                        {'questao_id': q1['id'], 'nota': 100}],
            'por_questao': {q1['id']: 0, q2['id']: 100},
        })
        self.assertEqual(app.test_client().get(url).status_code, 401)
        outro = app.test_client()
        self.assertEqual(outro.post('/api/cadastro', json={
            'nome': 'Visitante', 'email': 'visita-' + self.email, 'senha': 'senha1234', 'serie': 3,
        }).status_code, 201)
        self.assertEqual(outro.get(url).get_json(), {'ultimas': [], 'por_questao': {}})

    def test_notas_simulado_simples_maxima_minima_ultima(self):
        questoes = [q for q in catalogo() if q['id'].startswith('banco:')][:2]
        url = '/api/praticar/simulados/notas'
        dados = {'modo': 'simples', 'chave': 'SIS1', 'questoes': [q['id'] for q in questoes]}
        resumo = url + '?modo=simples&chave=SIS1'
        self.assertIsNone(self.client.get(resumo).get_json()['notas'])
        for acertos in (2, 0, 1):
            respostas = []
            for i, q in enumerate(questoes):
                indice = q['correta'] if i < acertos else (q['correta'] + 1) % len(q['alternativas'])
                r = self.client.post('/api/avaliacao/responder', json={'questao_id': q['id'], 'alternativa': indice})
                respostas.append(r.get_json()['resposta_id'])
            r = self.client.post(url, json={**dados, 'tentativa': os.urandom(16).hex(), 'respostas': respostas})
            self.assertEqual(r.status_code, 200, r.get_json())
            self.assertEqual(r.get_json()['acertos'], acertos)
        nova_sessao = app.test_client()
        login = nova_sessao.post('/api/login', json={'email': self.email, 'senha': 'senha1234'})
        self.assertEqual(login.status_code, 200)
        self.assertEqual(nova_sessao.get(resumo).get_json()['notas'], {'ultima': 50, 'maxima': 100, 'minima': 0})
        self.assertIsNone(self.client.get(url + '?modo=completo&chave=SIS1').get_json()['notas'])

    def test_simulado_completo_corrige_e_salva_sem_duplicar_tentativa(self):
        prova = [q for q in catalogo() if q['id'].startswith('oficial:SIS1:')]
        primeira = prova[0]
        url = '/api/praticar/simulados/notas'
        dados = {'modo': 'completo', 'chave': 'SIS1', 'tentativa': os.urandom(16).hex(),
                 'respostas': [{'id': primeira['id'], 'alternativa': primeira['correta']}]}
        for _ in range(2):
            r = self.client.post(url, json=dados)
            self.assertEqual(r.status_code, 200, r.get_json())
            self.assertEqual(r.get_json()['acertos'], 1)
            self.assertEqual(r.get_json()['total'], len(prova))
        progresso = self.client.get('/api/progresso').get_json()
        self.assertEqual((progresso['questoes_respondidas'], progresso['xp']), (1, 20))
        nota = int(100 / len(prova) + 0.5)
        resumo = self.client.get(url + '?modo=completo&chave=SIS1').get_json()['notas']
        self.assertEqual(resumo, {'ultima': nota, 'maxima': nota, 'minima': nota})
        with conectar() as c:
            self.assertEqual(c.execute('SELECT COUNT(*) FROM notas_simulados WHERE usuario_id=?',
                                       (self.uid,)).fetchone()[0], 1)

    def test_xp_so_acerto_e_repeticao(self):
        q = catalogo()[0]
        correta = int(q['correta'])
        errada = (correta + 1) % len(q['alternativas'])
        dados = {'questao_id': q['id'], 'alternativa': errada}
        r = self.client.post('/api/avaliacao/responder', json=dados)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.get_json()['xp_ganho'], 0)
        dados['alternativa'] = correta
        r = self.client.post('/api/avaliacao/responder', json=dados)
        self.assertEqual(r.get_json()['xp_ganho'], 20)
        r = self.client.post('/api/avaliacao/responder', json=dados)
        self.assertEqual(r.get_json()['xp_ganho'], 0)
        self.assertEqual(self.client.get('/api/progresso').get_json()['xp'], 20)

    def test_xp_redacao_nao_duplica(self):
        with conectar() as c:
            r = c.execute("INSERT INTO redacoes(usuario_id,tema_id,tema,texto) VALUES(?,?,?,?)",
                          (self.uid, 'tema', 'Tema', 'Texto corrigido e salvo.'))
            redacao = r.lastrowid
            a = c.execute("INSERT INTO avaliacoes_redacao(redacao_id,provedor,detalhe,estado,reserva) VALUES(?,?,?,'processando',?)",
                          (redacao, 'ollama', 'resumido', 'token'))
            avaliacao = a.lastrowid
        finalizar({'id': avaliacao, 'redacao_id': redacao, 'reserva': 'token'}, {'nota_estimada': 800})
        self.assertEqual(self.client.get('/api/progresso').get_json()['xp'], 32)
        with conectar() as c:
            c.execute("DELETE FROM redacoes WHERE id=?", (redacao,))
            r = c.execute("INSERT INTO redacoes(usuario_id,tema_id,tema,texto) VALUES(?,?,?,?)",
                          (self.uid, 'tema', 'Tema', 'Texto corrigido e salvo.'))
            novo = r.lastrowid
            a = c.execute("INSERT INTO avaliacoes_redacao(redacao_id,provedor,detalhe,estado,reserva) VALUES(?,?,?,'processando',?)",
                          (novo, 'ollama', 'resumido', 'novo'))
        finalizar({'id': a.lastrowid, 'redacao_id': novo, 'reserva': 'novo'}, {'nota_estimada': 900})
        self.assertEqual(self.client.get('/api/progresso').get_json()['xp'], 32)

    def test_preferencias_e_suporte(self):
        prefs = self.client.get('/api/preferencias')
        self.assertEqual(prefs.status_code, 200)
        self.assertFalse(prefs.get_json()['configurado'])
        self.assertGreater(len(prefs.get_json()['opcoes']), 2)
        materia = prefs.get_json()['opcoes'][1]
        r = self.client.post('/api/preferencias', json={'disciplina': materia})
        self.assertTrue(r.get_json()['configurado'])
        self.assertEqual(r.get_json()['disciplina'], materia)
        r = self.client.post('/api/suporte', json={'assunto': 'Erro na tela',
                                                 'mensagem': 'A questão não aparece após abrir a página.'})
        self.assertEqual(r.status_code, 201, r.get_json())
        self.assertIsInstance(r.get_json()['protocolo'], int)

    def test_ranking_com_perfil_publico(self):
        r = self.client.get('/api/ranking')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.get_json()['minha_posicao']['pagina'], 1)
        r = self.client.get(f'/api/alunos/{self.uid}/perfil-publico')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(set(r.get_json()), {'nome', 'banner', 'serie', 'vests',
                                             'xp', 'questoes', 'acertos', 'foto_url', 'foto_status', 'foto_revisao', 'banner_url',
                                             'banner_status', 'banner_revisao', 'destaque', 'mais_praticada',
                                             'questoes_distintas'})
        r = self.client.put('/api/perfil', json={'nome': 'Aluno Teste', 'serie': 4,
                                                  'vests': ['ENEM', 'PSC'], 'banner': 'aurora'})
        self.assertEqual(r.status_code, 200)
        r = self.client.get(f'/api/alunos/{self.uid}/perfil-publico')
        self.assertEqual(r.get_json()['banner'], 'aurora')
        self.assertEqual(r.get_json()['serie'], 4)
        self.assertEqual(r.get_json()['vests'], ['ENEM', 'PSC'])
        self.assertEqual(app.test_client().get(f'/api/alunos/{self.uid}/perfil-publico').status_code, 401)

    def test_ranking_destaca_materia_por_ultima_resposta(self):
        por_materia = {}
        for q in catalogo():
            por_materia.setdefault(q['disciplina'], []).append(q)
        matematica = por_materia['Matemática'][:4]
        portugues = por_materia['Português'][:3]
        for q in matematica + portugues:
            self.client.post('/api/avaliacao/responder', json={'questao_id': q['id'], 'alternativa': q['correta']})
        q = matematica[0]
        errada = (q['correta'] + 1) % len(q['alternativas'])
        self.client.post('/api/avaliacao/responder', json={'questao_id': q['id'], 'alternativa': errada})
        dados = self.client.get(f'/api/alunos/{self.uid}/perfil-publico').get_json()
        self.assertEqual(dados['questoes_distintas'], 7)
        self.assertEqual(dados['destaque']['nome'], 'Português')
        self.assertEqual(dados['destaque']['acertos'], 3)
        self.assertEqual(dados['mais_praticada']['nome'], 'Matemática')
        self.assertEqual(dados['mais_praticada']['respondidas'], 4)

    @patch.dict(app.config, {'MODERAR_IMAGENS_PERFIL': True})
    def test_salvar_foto_e_banner_com_o_perfil(self):
        from PIL import Image

        def arquivo(tamanho):
            dados = io.BytesIO()
            Image.new('RGB', tamanho, (80, 160, 210)).save(dados, 'PNG')
            # Emula o tamanho de uploads normais e exercita o limite conjunto.
            dados.write(bytes(600_000))
            dados.seek(0)
            return dados, 'imagem.png'

        perfil = {'nome': 'Aluno Atualizado', 'serie': 3, 'vests': ['SIS'], 'banner': 'noite'}
        dados = {'dados': json.dumps(perfil)}
        url_publica = f'/api/alunos/{self.uid}/perfil-publico'
        url_banner = f'/api/ranking/banner/{self.uid}'
        r = self.client.put('/api/perfil', data={
            **dados, 'foto': arquivo((256, 256)), 'banner': (io.BytesIO(b'invalido'), 'invalido.png'),
        })
        r.request.input_stream.close()
        self.assertEqual(r.status_code, 400, r.get_json())
        self.assertEqual(self.client.get('/api/me').get_json()['perfil']['nome'], 'Aluno Teste')
        self.assertEqual(self.client.get('/api/perfil/foto').status_code, 404)

        r = self.client.put('/api/perfil', data={
            **dados, 'foto': arquivo((256, 256)), 'banner': arquivo((1600, 800)),
        })
        r.request.input_stream.close()
        self.assertEqual(r.status_code, 200, r.get_json())
        self.assertTrue(r.get_json()['usuario']['tem_banner'])
        self.assertTrue(r.get_json()['usuario']['tem_foto'])
        self.assertEqual(r.get_json()['perfil']['nome'], perfil['nome'])
        foto = self.client.get('/api/perfil/foto')
        self.assertEqual(Image.open(io.BytesIO(foto.data)).size, (320, 320))
        banner = self.client.get('/api/perfil/banner')
        self.assertEqual(Image.open(io.BytesIO(banner.data)).size, (1280, 640))
        versao = r.get_json()['imagens_salvas']['banner']
        self.assertEqual(versao, sha256(banner.data).hexdigest())
        r = self.client.put('/api/perfil', data={
            'dados': json.dumps({**perfil, 'banner_modo': 'personalizado'}),
            'banner': arquivo((1280, 320)),
        })
        r.request.input_stream.close()
        self.assertEqual(r.status_code, 200, r.get_json())
        nova_versao = r.get_json()['imagens_salvas']['banner']
        self.assertNotEqual(nova_versao, versao)
        sessao_nova = app.test_client()
        login = sessao_nova.post('/api/login', json={'email': self.email, 'senha': 'senha1234'})
        self.assertEqual(login.status_code, 200, login.get_json())
        banner_reaberto = sessao_nova.get('/api/perfil/banner?v=' + nova_versao)
        self.assertEqual(sha256(banner_reaberto.data).hexdigest(), nova_versao)
        self.assertEqual(Image.open(io.BytesIO(banner_reaberto.data)).size, (1280, 320))
        self.assertEqual(self.client.get(url_banner).status_code, 404)
        meu_perfil = self.client.get(url_publica).get_json()
        self.assertEqual(meu_perfil['banner_url'], f'/api/perfil/banner?v={nova_versao}')
        self.assertEqual(meu_perfil['banner_status'], 'pendente')
        self.assertIsNone(meu_perfil['banner_revisao'])
        self.assertEqual(self.client.get('/api/moderacao/banners').status_code, 403)

        admin = app.test_client()
        resposta = admin.post('/api/cadastro', json={
            'nome': 'Admin Teste', 'email': f'adm-{self.email}', 'senha': 'senha1234', 'serie': 3,
        })
        self.assertEqual(resposta.status_code, 201, resposta.get_json())
        self.assertIsNone(admin.get(url_publica).get_json()['banner_url'])
        self.assertEqual(admin.get(url_banner).status_code, 404)
        self.assertEqual(admin.get('/api/perfil/banner').status_code, 404)
        comando = app.test_cli_runner().invoke(args=['imagens', 'moderador', f'adm-{self.email}'])
        self.assertEqual(comando.exit_code, 0, comando.output)
        self.assertEqual(admin.get('/api/me').get_json()['usuario']['tipo'], 'ALUNO')
        revisar = admin.get(url_publica).get_json()
        self.assertEqual(revisar['banner_status'], 'pendente')
        self.assertEqual(revisar['foto_status'], 'pendente')
        self.assertEqual(admin.get(revisar['banner_url']).status_code, 200)
        self.assertEqual(admin.get(revisar['foto_url']).status_code, 200)
        sem_permissao = self.client.get(revisar['foto_url'])
        self.assertEqual(sem_permissao.status_code, 403)
        url_moderacao = f'/api/moderacao/banners/{self.uid}'
        self.assertEqual(admin.post(url_moderacao, json={'decisao': 'aprovar', 'versao': 'antiga'}).status_code, 409)
        aprovado = admin.post(url_moderacao, json={'decisao': 'aprovar', 'versao': revisar['banner_revisao']})
        self.assertEqual(aprovado.status_code, 200, aprovado.get_json())
        self.assertEqual(admin.get(url_publica).get_json()['banner_url'], f'{url_banner}?v={nova_versao}')
        self.assertEqual(admin.get(url_banner).status_code, 200)
        self.assertEqual(app.test_client().get(url_banner).status_code, 401)
        r = admin.post(f'/api/moderacao/fotos/{self.uid}',
                       json={'decisao': 'aprovar', 'versao': revisar['foto_revisao']})
        self.assertEqual(r.status_code, 200, r.get_json())
        revogar = app.test_cli_runner().invoke(args=['imagens', 'moderador', f'adm-{self.email}', '--revogar'])
        self.assertEqual(revogar.exit_code, 0, revogar.output)
        self.assertEqual(admin.get('/api/moderacao/fotos').status_code, 403)
        publicado = admin.get(url_publica).get_json()
        self.assertEqual(publicado['foto_url'], f'/api/ranking/foto/{self.uid}?v={sha256(foto.data).hexdigest()}')
        self.assertEqual(publicado['banner_url'], f'{url_banner}?v={nova_versao}')
        self.assertEqual(admin.get(url_banner).status_code, 200)
        minha_posicao = admin.get('/api/ranking').get_json()['minha_posicao']
        self.assertEqual(minha_posicao['id'], admin.get('/api/me').get_json()['usuario']['id'])
        pagina = self.client.get('/api/ranking').get_json()['minha_posicao']['pagina']
        alunos = admin.get(f'/api/ranking?pagina={pagina}').get_json()['alunos']
        aluno = next(aluno for aluno in alunos if aluno['id'] == self.uid)
        self.assertEqual(aluno['foto_url'], publicado['foto_url'])
        self.assertEqual(admin.get(aluno['foto_url']).status_code, 200)

        r = self.client.put('/api/perfil', json={**perfil, 'banner_modo': 'padrao'})
        self.assertEqual(r.get_json()['perfil']['banner_modo'], 'padrao')
        self.assertIsNone(admin.get(url_publica).get_json()['banner_url'])
        self.assertEqual(admin.get(url_banner).status_code, 404)
        self.assertEqual(self.client.get('/api/perfil/banner').status_code, 200)
        r = self.client.put('/api/perfil', json={**perfil, 'banner_modo': 'personalizado'})
        self.assertEqual(r.get_json()['perfil']['banner_modo'], 'personalizado')
        self.assertEqual(admin.get(url_publica).get_json()['banner_url'], publicado['banner_url'])

        r = self.client.put('/api/perfil', data={**dados, 'remover_banner': '1', 'remover_foto': '1'},
                            content_type='multipart/form-data')
        self.assertEqual(r.status_code, 200, r.get_json())
        self.assertFalse(r.get_json()['usuario']['tem_banner'])
        self.assertFalse(r.get_json()['usuario']['tem_foto'])
        self.assertEqual(r.get_json()['imagens_salvas'], {'foto': None, 'banner': None})
        self.assertIsNone(admin.get(url_publica).get_json()['banner_url'])
        self.assertEqual(admin.get(url_banner).status_code, 404)

    def test_ranking_atualiza_foto_e_banner_para_duas_contas(self):
        from PIL import Image

        visita = app.test_client()
        r = visita.post('/api/cadastro', json={
            'nome': 'Visitante', 'email': f'visita-{self.email}', 'senha': 'senha1234', 'serie': 3,
        })
        self.assertEqual(r.status_code, 201)
        url = f'/api/alunos/{self.uid}/perfil-publico'
        perfil = {'nome': 'Aluno Teste', 'serie': 3, 'vests': ['ENEM'], 'banner_modo': 'personalizado'}
        pagina = self.client.get('/api/ranking').get_json()['minha_posicao']['pagina']

        def imagem(tamanho, cor):
            arquivo = io.BytesIO()
            Image.new('RGB', tamanho, cor).save(arquivo, 'PNG')
            arquivo.seek(0)
            return arquivo, 'teste.png'

        anteriores = {}
        for cor in ('blue', 'green'):
            r = self.client.put('/api/perfil', data={
                'dados': json.dumps(perfil),
                'foto': imagem((128, 128), cor), 'banner': imagem((512, 128), cor),
            })
            self.assertEqual(r.status_code, 200, r.get_json())
            resposta = r.get_json()
            for sessao in (self.client, visita):
                publico = sessao.get(url).get_json()
                ranking = sessao.get(f'/api/ranking?pagina={pagina}').get_json()
                aluno = next(a for a in ranking['alunos'] if a['id'] == self.uid)
                self.assertEqual(aluno['foto_url'], publico['foto_url'])
                for tipo, versao in resposta['imagens_salvas'].items():
                    imagem_url = publico[f'{tipo}_url']
                    self.assertEqual(imagem_url, f'/api/ranking/{tipo}/{self.uid}?v={versao}')
                    self.assertNotEqual(imagem_url, anteriores.get(tipo))
                    self.assertIsNone(publico[f'{tipo}_status'])
                    with sessao.get(imagem_url) as midia:
                        self.assertEqual(midia.status_code, 200)
                        self.assertEqual(sha256(midia.data).hexdigest(), versao)
                    self.assertEqual(app.test_client().get(imagem_url).status_code, 401)
            anteriores = {tipo: publico[f'{tipo}_url'] for tipo in ('foto', 'banner')}

        # Um upload antigo que estava pendente também fica visível no modo padrão.
        with conectar() as c:
            for tabela in ('fotos_perfil', 'banners_perfil'):
                c.execute(f"UPDATE {tabela} SET moderacao='pendente' WHERE usuario_id=?", (self.uid,))
        publico = visita.get(url).get_json()
        for tipo, imagem_url in anteriores.items():
            self.assertEqual(publico[f'{tipo}_url'], imagem_url)
            self.assertEqual(visita.get(imagem_url).status_code, 200)

    @patch.dict(app.config, {'MODERAR_IMAGENS_PERFIL': True})
    def test_foto_nova_pendente_de_moderacao(self):
        from PIL import Image
        img = Image.new('RGB', (128, 128), (80, 160, 210))
        data = io.BytesIO()
        img.save(data, 'JPEG')
        data.seek(0)
        r = self.client.put('/api/perfil/foto',
                            data={'foto': (data, 'foto.jpg')},
                            content_type='multipart/form-data')
        self.assertEqual(r.status_code, 204)
        with conectar() as c:
            estado = c.execute('SELECT moderacao FROM fotos_perfil WHERE usuario_id=?',
                               (self.uid,)).fetchone()[0]
        self.assertEqual(estado, 'pendente')
        self.assertEqual(self.client.get(f'/api/ranking/foto/{self.uid}').status_code, 404)
        self.assertEqual(self.client.get('/api/perfil/foto').status_code, 200)
        conta = self.client.get('/api/me').get_json()['usuario']
        self.assertEqual(conta['estado_foto'], 'pendente')
        url_privada = '/api/perfil/foto?v=' + conta['foto_versao']
        perfil_url = f'/api/alunos/{self.uid}/perfil-publico'
        meu_perfil = self.client.get(perfil_url).get_json()
        self.assertEqual(meu_perfil['foto_url'], url_privada)
        self.assertEqual(meu_perfil['foto_status'], 'pendente')
        self.assertEqual(self.client.get('/api/ranking').get_json()['minha_posicao']['foto_url'], url_privada)
        visitante = app.test_client()
        visitante.post('/api/cadastro', json={
            'nome': 'Visitante Teste', 'email': f'visitante-{self.email}', 'senha': 'senha1234', 'serie': 3,
        })
        self.assertIsNone(visitante.get(perfil_url).get_json()['foto_url'])
        self.assertEqual(visitante.get('/api/perfil/foto').status_code, 404)
        with conectar() as c:
            c.execute("UPDATE usuarios SET tipo='ADMIN' WHERE id=?", (self.uid,))
        self.assertEqual(self.client.get('/api/moderacao/fotos').status_code, 200)
        self.assertEqual(self.client.get(f'/api/moderacao/fotos/{self.uid}/imagem').status_code, 200)
        r = self.client.post(f'/api/moderacao/fotos/{self.uid}', json={'decisao': 'aprovar'})
        self.assertEqual(r.status_code, 200)


if __name__ == '__main__':
    unittest.main(verbosity=2)
