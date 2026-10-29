"""Teste no Docker: docker compose exec web python tests/test_v6.py

Usa SQLite temporário e NÃO modifica o banco do estudante. Gemini é simulado:
nenhuma chamada externa, nenhum token gasto, nenhum OAuth real.
"""
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

RAIZ = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RAIZ))
_temp = tempfile.TemporaryDirectory()
os.environ['DATABASE_PATH'] = str(Path(_temp.name) / 'teste-v6.db')
os.environ['FLASK_SECRET_KEY'] = 'teste-v6-nao-usar-em-producao'
os.environ['GOOGLE_CLIENT_ID'] = ''
os.environ['ATIVAR_GEMINI'] = 'false'
from app import app  # noqa: E402
from redacao_ia_api import _normalizar, _paragrafos  # noqa: E402

TEXTO = ('A educação pública enfrenta desafios. A infraestrutura das escolas é limitada.\n\n'
         'Por outro lado, a formação dos professores também exige investimento. '
         'Algumas escolas não recebem livros suficientes.\n\n'
         'Portanto, o Ministério da Educação deve financiar bibliotecas por meio de '
         'um programa nacional para ampliar o acesso à leitura.')


def dados_ficticios():
    return {
        'resumo': 'Há tese e conclusão, mas faltam exemplos.',
        'adequacao_tema': 'O texto aborda a educação pública.',
        'competencias': [
            {'numero': i, 'nota_estimada': 160,
             'justificativa': f'Competência {i}: revisão necessária.',
             'pontos_fortes': ['Linguagem clara'],
             'ajustes': [
                 {'paragrafo': 1,
                  'trecho': 'A infraestrutura das escolas é limitada.',
                  'diagnostico': 'Generalização sem dado ou exemplo.',
                  'sugestao': 'Explicar a causa ou oferecer um exemplo verificável.',
                  'exemplo': 'A falta de recursos pode afetar a estrutura das escolas.'},
                 {'paragrafo': 2, 'trecho': 'Uma frase que não existe no texto.',
                  'diagnostico': 'Alucinação', 'sugestao': 'Ignorar', 'exemplo': 'Ignorar'},
             ]} for i in range(1, 6)
        ],
        'prioridades': ['Reforçar a tese', 'Dar exemplos', 'Detalhar proposta'],
    }


class TestV6(unittest.TestCase):
    def setUp(self):
        self.cliente = app.test_client()
        resp = self.cliente.post('/api/cadastro', json={
            'nome': 'Aluno Teste', 'email': f'teste-{os.urandom(4).hex()}@example.org',
            'senha': 'senha-grande-123', 'serie': 3, 'vests': ['ENEM']})
        self.assertEqual(resp.status_code, 201, resp.get_json())

    def test_citacoes_validas_e_citacoes_inventadas(self):
        a = _normalizar(dados_ficticios(), TEXTO, 'ENEM')
        self.assertEqual(len(a['competencias']), 5)
        self.assertEqual(a['nota_estimada'], 800)
        for c in a['competencias']:
            self.assertEqual(len(c['ajustes']), 1)
            aj = c['ajustes'][0]
            self.assertIn(aj['trecho'], _paragrafos(TEXTO)[aj['paragrafo'] - 1])

    def test_google_placeholder_nao_e_valido(self):
        with patch.dict(os.environ, {'GOOGLE_CLIENT_ID': 'SEU_CLIENT_ID.apps.googleusercontent.com'}):
            config = self.cliente.get('/api/config-publica').get_json()
            self.assertFalse(config['google_configurado'])
            self.assertEqual(config['google_client_id'], '')
            self.assertIn('inválido', config['google_mensagem'])
        with patch.dict(os.environ, {'GOOGLE_CLIENT_ID': '123456789-abc123.apps.googleusercontent.com'}):
            config = self.cliente.get('/api/config-publica').get_json()
            self.assertTrue(config['google_configurado'])
        # Nenhuma credencial inventada pode ser aceita como token.
        self.assertEqual(self.cliente.post('/api/auth/google', json={'credential': 'invalido'}).status_code, 503)

    def test_gemini_bloqueado_por_padrao(self):
        with patch.dict(os.environ, {'ATIVAR_GEMINI': 'false', 'GEMINI_API_KEY': 'teste'}):
            r = self.cliente.post('/api/corrigir-redacao', json={
                'tema': 'Desafios da educação pública', 'texto': TEXTO, 'vestibular': 'ENEM'})
            self.assertEqual(r.status_code, 503)
            self.assertIn('desativado', r.get_json()['message'])

    def test_api_gemini_estruturada_com_mock(self):
        class Resposta:
            text = json.dumps(dados_ficticios())

        class ClienteFalso:
            def __init__(self, **kwargs):
                self.models = self
            def generate_content(self, **kwargs):
                self.assert_falso = kwargs
                assert kwargs['model'] == 'gemini-2.5-flash'
                assert kwargs['config']['response_mime_type'] == 'application/json'
                return Resposta()
            def __enter__(self): return self
            def __exit__(self, *args): return False

        with patch.dict(os.environ, {'ATIVAR_GEMINI': 'true', 'GEMINI_API_KEY': 'chave-teste',
                                     'GEMINI_MODEL': 'gemini-2.5-flash'}):
            with patch('google.genai.Client', ClienteFalso):
                r = self.cliente.post('/api/corrigir-redacao', json={
                    'tema': 'Desafios da educação pública', 'texto': TEXTO, 'vestibular': 'ENEM'})
        self.assertEqual(r.status_code, 200, r.get_json())
        a = r.get_json()['avaliacao']
        self.assertEqual(len(a['competencias']), 5)
        self.assertEqual(len(a['competencias'][0]['ajustes']), 1)
        self.assertFalse(a['nota_oficial'])


if __name__ == '__main__':
    unittest.main(verbosity=2)
