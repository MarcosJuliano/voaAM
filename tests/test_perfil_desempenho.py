"""Regressões das novas configurações privadas e métricas do Ranking."""
from io import BytesIO
import unittest
from uuid import uuid4
from unittest.mock import patch

from PIL import Image

from test_v6 import app
from treino_api import catalogo


class PerfilDesempenhoTest(unittest.TestCase):
    def setUp(self):
        self.cliente = app.test_client()
        self.email = f'{uuid4().hex}@example.com'
        self.senha = 'senha-original-123'
        cadastro = self.cliente.post('/api/cadastro', json={
            'nome': 'Estudante', 'email': self.email, 'senha': self.senha,
            'serie': 3, 'vests': ['ENEM'],
        })
        self.assertEqual(cadastro.status_code, 201)

    def test_mudar_senha_exige_identidade_e_revoga_sessao_anterior(self):
        sessao_antiga = app.test_client()
        self.assertEqual(sessao_antiga.post('/api/login', json={'email': self.email, 'senha': self.senha}).status_code, 200)
        nova = 'nova-senha-123'
        erro = self.cliente.put('/api/perfil/senha', json={'senha': 'errada', 'nova_senha': nova})
        self.assertEqual(erro.status_code, 403)
        self.assertEqual(self.cliente.put('/api/perfil/senha', json={'senha': self.senha, 'nova_senha': nova}).status_code, 204)
        self.assertEqual(sessao_antiga.get('/api/progresso').status_code, 401)
        self.assertEqual(self.cliente.get('/api/progresso').status_code, 200)
        self.assertEqual(sessao_antiga.post('/api/login', json={'email': self.email, 'senha': self.senha}).status_code, 401)
        self.assertEqual(sessao_antiga.post('/api/login', json={'email': self.email, 'senha': nova}).status_code, 200)

    def test_google_conectado_pode_definir_senha_sem_desvincular(self):
        with patch('google_api.identidade_google', return_value=('sub_teste', 'google-' + self.email, 'Aluna')):
            conta = self.cliente.post('/api/auth/google', json={'credential': 'simulada', 'cadastrar': True})
        self.assertEqual(conta.status_code, 200)
        with patch('perfil_api.identidade_google', return_value=('outra', self.email, 'Outra')):
            self.assertEqual(self.cliente.put('/api/perfil/senha', json={'credential': 'simulada', 'nova_senha': 'nova-senha-google'}).status_code, 403)
        with patch('perfil_api.identidade_google', return_value=('sub_teste', 'google-' + self.email, 'Aluna')):
            self.assertEqual(self.cliente.put('/api/perfil/senha', json={'credential': 'simulada', 'nova_senha': 'nova-senha-google'}).status_code, 204)
        outra = app.test_client()
        login = outra.post('/api/login', json={'email': 'google-' + self.email, 'senha': 'nova-senha-google'})
        self.assertEqual(login.status_code, 200)
        self.assertTrue(login.json['usuario']['google']['conectado'])

    def test_foto_e_privada_e_convertida_para_jpeg(self):
        dados = BytesIO()
        Image.new('RGB', (450, 300), 'blue').save(dados, format='PNG')
        dados.seek(0)
        self.assertEqual(self.cliente.put('/api/perfil/foto', data={'foto': (BytesIO(b'<svg/>'), 'avatar.svg')}).status_code, 400)
        self.assertEqual(self.cliente.put('/api/perfil/foto', data={'foto': (dados, 'avatar.png')}).status_code, 204)
        foto = self.cliente.get('/api/perfil/foto')
        imagem = Image.open(BytesIO(foto.data))
        self.assertEqual((imagem.format, imagem.size), ('JPEG', (320, 320)))
        self.assertEqual(app.test_client().get('/api/perfil/foto').status_code, 401)
        outro = app.test_client()
        outro.post('/api/cadastro', json={'nome': 'Outro', 'email': 'outro-' + self.email, 'senha': self.senha, 'serie':3, 'vests':['ENEM']})
        self.assertEqual(outro.get('/api/perfil/foto').status_code, 404)
        fotos = outro.get('/api/ranking').json['alunos']
        url = next(aluno['foto_url'] for aluno in fotos if 'foto_url' in aluno)
        self.assertEqual(app.test_client().get(url).status_code, 401)
        with outro.get(url) as avatar:
            self.assertEqual(avatar.status_code, 200)
            self.assertEqual(avatar.mimetype, 'image/jpeg')
            self.assertIn('private', avatar.headers['Cache-Control'])
        self.assertEqual(self.cliente.delete('/api/perfil/foto').status_code, 204)
        self.assertEqual(self.cliente.get('/api/perfil/foto').status_code, 404)
        self.assertEqual(outro.get(url).status_code, 404)

    def test_graficos_usam_ultima_resposta_sem_duplicar_contagem(self):
        q = next(q for q in catalogo() if q['disciplina'] == 'Biologia')
        url = '/api/avaliacao/responder'
        for alternativa in (q['correta'], (q['correta'] + 1) % len(q['alternativas'])):
            self.assertEqual(self.cliente.post(url, json={'questao_id': q['id'], 'alternativa': alternativa}).status_code, 200)
        self.assertEqual(app.test_client().get('/api/progresso/disciplinas').status_code, 401)
        dados = self.cliente.get('/api/progresso/disciplinas').json
        bio = next(m for m in dados['disciplinas'] if m['nome'] == 'Biologia')
        self.assertEqual((bio['respondidas'], bio['acertos']), (1, 0))
        self.assertIn({'nome': q['assunto'], 'erros': 1}, dados['revisao'])


    def test_estatisticas_incluem_nota_zero_e_extremos_antigos(self):
        from redacoes_api import salvar_redacao
        from test_v6 import TEXTO

        with self.cliente.session_transaction() as sessao:
            uid = sessao['usuario_id']
        tema = self.cliente.get('/api/temas-redacao').json['temas'][0]
        for nota in [1000, 0, *([720] * 11)]:
            salvar_redacao(uid, tema, TEXTO, {'nota_estimada': nota})
        dados = self.cliente.get('/api/progresso/disciplinas').json['redacoes']
        self.assertEqual(dados, {'salvas': 1, 'correcoes': 13, 'media': 686.2, 'maior': 1000, 'menor': 0})
        historico = self.cliente.get('/api/redacoes').json
        self.assertEqual(historico['redacoes'][0]['maior_nota'], 1000)
        self.assertEqual(historico['redacoes'][0]['menor_nota'], 0)
        self.assertIn(0, [a['nota'] for a in historico['avaliacoes']])
        self.assertIn(1000, [a['nota'] for a in historico['avaliacoes']])


if __name__ == '__main__':
    unittest.main()
