"""Regressões de vínculo, remoção da conta e concorrência do avaliador."""
import json
import os
import unittest
from concurrent.futures import ThreadPoolExecutor
from threading import Barrier, Event
from unittest.mock import Mock, patch

from test_atualizacao import TestAtualizacao
from test_v6 import TEXTO, app, dados_ficticios


class TestContaEIA(unittest.TestCase):
    cadastrar = TestAtualizacao.cadastrar
    token = 'credencial-ficticia-' * 8
    senha = 'senha-teste-2026'

    def inicio(self, cliente, finalidade='acesso', sub='sub-teste', email='google@example.org'):
        r = cliente.post('/api/auth/google/desafio', json={'finalidade': finalidade})
        self.assertEqual(r.status_code, 200)
        return {'sub': sub, 'email': email, 'email_verified': True, 'nonce': r.json['nonce']}

    @patch.dict(os.environ, {'GOOGLE_CLIENT_ID': '123-abcd.apps.googleusercontent.com'})
    @patch('google.oauth2.id_token.verify_oauth2_token')
    def test_vinculo_aceita_email_diferente_e_revoga_sessoes(self, verificar):
        aluno = self.cadastrar('Carlos Teste')
        colega = self.cadastrar('Beatriz Teste')
        confirmar = {'credential': self.token, 'senha': self.senha}
        verificar.return_value = self.inicio(aluno, 'vinculo')
        original = verificar.return_value
        verificar.return_value = {**original, 'nonce': 'desafio-diferente'}
        self.assertEqual(aluno.post('/api/auth/google/vincular', json=confirmar).status_code, 401)
        verificar.return_value = original
        r = aluno.post('/api/auth/google/vincular', json=confirmar)
        self.assertEqual(r.status_code, 200, r.json)
        self.assertEqual(aluno.get('/api/me').json['usuario']['google']['email'], 'google@example.org')
        verificar.return_value = self.inicio(colega, 'vinculo')
        self.assertEqual(colega.post('/api/auth/google/vincular', json=confirmar).status_code, 409)
        verificar.return_value = self.inicio(aluno, 'vinculo', sub='outro')
        self.assertEqual(aluno.post('/api/auth/google/vincular', json=confirmar).status_code, 409)

        outro_navegador = app.test_client()
        verificar.return_value = self.inicio(outro_navegador)
        self.assertEqual(outro_navegador.post('/api/auth/google', json=confirmar).status_code, 200)
        verificar.return_value = self.inicio(aluno, 'confirmacao', sub='outro')
        self.assertEqual(aluno.delete('/api/auth/google/vincular', json={
            'credential': self.token, 'nova_senha': 'senha-nova-2026',
        }).status_code, 403)
        self.assertEqual(aluno.delete('/api/auth/google/vincular', json={'senha': self.senha}).status_code, 204)
        self.assertFalse(outro_navegador.get('/api/me').json['autenticado'])
        self.assertFalse(aluno.get('/api/me').json['usuario']['google']['conectado'])
        verificar.return_value = self.inicio(outro_navegador)
        self.assertEqual(outro_navegador.post('/api/auth/google', json=confirmar).status_code, 404)

    @patch.dict(os.environ, {'GOOGLE_CLIENT_ID': '123-abcd.apps.googleusercontent.com'})
    @patch('google.oauth2.id_token.verify_oauth2_token')
    def test_conta_criada_no_google_pode_definir_senha_e_excluir(self, verificar):
        aluno = app.test_client()
        email = 'somentegoogle@example.org'
        verificar.return_value = self.inicio(aluno, email=email, sub='somente-google')
        self.assertEqual(aluno.post('/api/auth/google', json={
            'credential': self.token, 'cadastrar': True,
        }).status_code, 200)
        verificar.return_value = self.inicio(aluno, 'confirmacao', email=email, sub='somente-google')
        self.assertEqual(aluno.delete('/api/auth/google/vincular', json={
            'credential': self.token,
        }).status_code, 400)
        senha = 'nova-senha-2026'
        self.assertEqual(aluno.delete('/api/auth/google/vincular', json={
            'credential': self.token, 'nova_senha': senha,
        }).status_code, 204)
        self.assertEqual(aluno.post('/api/login', json={'email': email, 'senha': senha}).status_code, 200)

        tema = aluno.get('/api/temas-redacao').json['temas'][0]['id']
        self.assertEqual(aluno.post('/api/redacoes', json={'tema_id': tema, 'texto': TEXTO}).status_code, 201)
        outra_sessao = app.test_client()
        self.assertEqual(outra_sessao.post('/api/login', json={'email': email, 'senha': senha}).status_code, 200)
        self.assertEqual(aluno.delete('/api/perfil', json={'senha': 'incorreta'}).status_code, 403)
        self.assertEqual(aluno.delete('/api/perfil', json={'senha': senha}).status_code, 204)
        self.assertEqual(outra_sessao.get('/api/redacoes').status_code, 401)
        self.assertEqual(aluno.post('/api/login', json={'email': email, 'senha': senha}).status_code, 401)
        self.assertEqual(aluno.post('/api/cadastro', json={
            'nome': 'Novo perfil', 'email': email, 'senha': senha, 'serie': 3,
        }).status_code, 201)
        self.assertEqual(aluno.get('/api/redacoes').json['redacoes'], [])

    def test_ollama_processa_duas_contas_em_paralelo_e_limita_a_terceira(self):
        alunos = [self.cadastrar('Aluno Paralelo') for _ in range(3)]
        tema = alunos[0].get('/api/temas-redacao').json['temas'][0]['id']
        dados = {'provedor': 'ollama', 'tema_id': tema, 'texto': TEXTO}
        dois_processando = Barrier(3, timeout=5)
        liberar = Event()

        def gerar(*_, **__):
            dois_processando.wait()
            assert liberar.wait(5)
            resposta = Mock()
            resposta.json.return_value = {'response': json.dumps(dados_ficticios())}
            return resposta

        env = {'ATIVAR_OLLAMA': 'true', 'OLLAMA_URL': 'http://ollama:11434',
               'OLLAMA_MODEL': 'modelo-teste', 'REDACAO_IA_CONCORRENCIA': '2'}
        with patch.dict(os.environ, env), patch('requests.post', side_effect=gerar) as provedor:
            with ThreadPoolExecutor(max_workers=2) as pool:
                futures = [pool.submit(a.post, '/api/corrigir-redacao', json=dados) for a in alunos[:2]]
                try:
                    dois_processando.wait()
                    self.assertEqual(alunos[2].post('/api/corrigir-redacao', json=dados).status_code, 503)
                finally:
                    liberar.set()
                for futuro in futures:
                    r = futuro.result()
                    self.assertEqual(r.status_code, 200, r.json)
                    self.assertEqual(r.json['avaliacao']['modo'], 'ollama')
                self.assertEqual(provedor.call_count, 2)
        for aluno in alunos[:2]:
            self.assertEqual(aluno.get('/api/redacoes').json['redacoes'][0]['nota'], 800)


del TestAtualizacao


if __name__ == '__main__':
    unittest.main(verbosity=2)
