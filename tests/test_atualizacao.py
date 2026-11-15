"""Regressões de armazenamento, sorteio e ranking, com SQLite temporário."""
import json
import os
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from test_v6 import TEXTO, dados_ficticios, app
from banco import conectar
from treino_api import catalogo


class TestAtualizacao(unittest.TestCase):
    def cadastrar(self, nome):
        c = app.test_client()
        r = c.post('/api/cadastro', json={
            'nome': nome, 'email': f'teste-{os.urandom(5).hex()}@example.org',
            'senha': 'senha-teste-2026', 'serie': 3, 'vests': ['ENEM'],
        })
        self.assertEqual(r.status_code, 201)
        return c

    def test_nota_gravada_reutiliza_mesma_versao_e_isola_contas(self):
        aluno = self.cadastrar('Ana Ferreira')
        colega = self.cadastrar('Beatriz Ferreira')
        tema = aluno.get('/api/temas-redacao').get_json()['temas'][0]
        dados = {'tema_id': tema['id'], 'texto': TEXTO}
        inicial = aluno.post('/api/redacoes', json=dados).get_json()
        with patch.dict(os.environ, {'ATIVAR_GEMINI': 'true', 'GEMINI_API_KEY': 'ficticia'}):
            with patch('google.genai.Client') as cliente:
                avaliar = cliente.return_value.__enter__.return_value.models.generate_content
                avaliar.return_value = SimpleNamespace(text=json.dumps(dados_ficticios()))
                r = aluno.post('/api/corrigir-redacao', json=dados)
        self.assertEqual(r.status_code, 200, r.get_json())
        self.assertEqual(r.get_json()['redacao_id'], inicial['id'])
        aluno.post('/api/redacoes', json=dados)
        redacoes = aluno.get('/api/redacoes').get_json()['redacoes']
        self.assertEqual(len(redacoes), 1)
        self.assertEqual(redacoes[0]['nota'], 800)
        self.assertEqual(len(json.loads(redacoes[0]['resultado_ia'])['competencias']), 5)
        self.assertEqual(colega.get('/api/redacoes').get_json()['redacoes'], [])
        self.assertEqual(colega.delete('/api/redacoes/' + str(inicial['id'])).status_code, 404)
        aluno.post('/api/redacoes', json={**dados, 'texto': TEXTO + ' Versão revisada.'})
        redacoes = aluno.get('/api/redacoes').get_json()['redacoes']
        self.assertEqual(sorted(r['nota'] for r in redacoes if r['nota'] is not None), [800])
        self.assertEqual(len(redacoes), 2)

    def test_treino_corrige_letra_exibida_e_aceita_registro_anterior(self):
        aluno = self.cadastrar('Carlos Ferreira')
        original = catalogo()[0]
        with patch('treino_api.catalogo', return_value=[original]):
            with patch('treino_api.SystemRandom') as rng:
                rng.return_value.sample.side_effect = lambda pool, n: list(reversed(pool))[:n]
                inicio = aluno.post('/api/treino/iniciar', json={'quantidade': 1}).get_json()
            treino = inicio['treino_id']
            q = inicio['questoes'][0]
            self.assertEqual(q['alternativas'], original['alternativas'][::-1])
            self.assertNotIn('correta', q)
            indice = len(q['alternativas']) - 1 - original['correta']
            r = aluno.post(f'/api/treino/{treino}/responder', json={'questao_id': q['id'], 'alternativa': indice})
            self.assertEqual(r.status_code, 200, r.get_json())
            self.assertTrue(r.get_json()['acertou'])
            self.assertEqual(r.get_json()['correta'], indice)
            self.assertEqual(r.get_json()['xp_ganho'], 20)
            c = conectar()
            try:
                uid = c.execute('SELECT usuario_id FROM treinos_personalizados WHERE id=?', (treino,)).fetchone()[0]
                legado = c.execute(
                    'INSERT INTO treinos_personalizados(usuario_id,filtros_json,questoes_json) VALUES(?,?,?)',
                    (uid, '{}', json.dumps([q['id']])),
                ).lastrowid
                c.commit()
            finally:
                c.close()
            r = aluno.post(f'/api/treino/{legado}/responder', json={'questao_id': q['id'], 'alternativa': original['correta']})
            self.assertTrue(r.get_json()['acertou'])
            self.assertEqual(r.get_json()['xp_ganho'], 0)

    def test_ranking_empatado_inclui_zero_xp_e_oculta_contas_inativas(self):
        primeiro = self.cadastrar('Daniel Ferreira')
        segundo = self.cadastrar('Eduardo Ferreira')
        self.cadastrar('Felipe Ferreira')
        c = conectar()
        try:
            c.execute("UPDATE usuarios SET ativo=0 WHERE nome='Felipe Ferreira'")
            c.commit()
        finally:
            c.close()
        self.assertEqual(app.test_client().get('/api/ranking').status_code, 401)
        for aluno in (primeiro, segundo):
            r = aluno.post('/api/avaliacao/responder', json={'questao_id': 'quiz:conjuntos:0', 'alternativa': 0})
            self.assertTrue(r.get_json()['xp_ganho'] > 0)
        dados = primeiro.get('/api/ranking').get_json()
        self.assertEqual(dados['minha_posicao']['posicao'], 1)
        lideres = [a for a in dados['alunos'] if a['posicao'] == 1]
        self.assertEqual([a['nome'] for a in lideres], ['Daniel F.', 'Eduardo F.'])
        self.assertEqual(set(lideres[0]), {'nome', 'voce', 'posicao', 'xp'})
        self.assertTrue(any(a['xp'] == 0 for a in dados['alunos']))
        self.assertFalse(any(a['nome'] == 'Felipe F.' for a in dados['alunos']))
        self.assertNotIn('email', dados['minha_posicao'])


if __name__ == '__main__':
    unittest.main(verbosity=2)
