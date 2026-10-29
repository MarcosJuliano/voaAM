"""Execute no Docker: python tests/test_v5.py (banco isolado e temporário)."""
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

BASE=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(BASE))
_tmp=tempfile.TemporaryDirectory()
os.environ['DATABASE_PATH']=str(Path(_tmp.name)/'isolado.db')
os.environ['FLASK_SECRET_KEY']='unit-tests-only'
os.environ.pop('GOOGLE_CLIENT_ID',None)
os.environ['ATIVAR_GEMINI']='false'
from app import app
from treino_api import catalogo
from banco import conectar


class TestV5(unittest.TestCase):
    def setUp(self):
        self.client=app.test_client()
        self.email=f'v5-{id(self)}-{os.urandom(3).hex()}@example.test'
        r=self.client.post('/api/cadastro',json={
            'nome':'Teste V5','email':self.email,'senha':'senha-forte-123','serie':3,'vests':['ENEM']})
        self.assertEqual(r.status_code,201,r.get_json())

    def test_catalogo_cascata(self):
        q=catalogo()[0]
        f={'vestibular':q['vestibular'],'ano':str(q.get('ano') or ''),'disciplina':q['disciplina']}
        from urllib.parse import urlencode
        r=self.client.get('/api/treino/catalogo?'+urlencode(f))
        self.assertEqual(r.status_code,200)
        dados=r.get_json()
        self.assertGreater(dados['disponiveis'],0)
        self.assertIn(f['vestibular'], [x['valor'] for x in dados['vestibulares']])

    def test_treino_sigiloso_e_xp_idempotente(self):
        q=catalogo()[0]
        r=self.client.post('/api/treino/iniciar',json={'quantidade':1,'vestibular':q['vestibular'],'ano':str(q.get('ano') or '')})
        self.assertEqual(r.status_code,201,r.get_json())
        d=r.get_json();questao=d['questoes'][0]
        self.assertNotIn('correta',questao)
        self.assertNotIn('explicacao',questao)
        payload={'questao_id':questao['id'],'alternativa':0}
        r=self.client.post(f"/api/treino/{d['treino_id']}/responder",json=payload)
        self.assertEqual(r.status_code,200,r.get_json())
        self.assertIn('xp_ganho',r.get_json())
        self.assertEqual(self.client.post(f"/api/treino/{d['treino_id']}/responder",json=payload).status_code,409)
        novo=self.client.post('/api/treino/iniciar',json={'quantidade':1,'vestibular':questao['vestibular'],'ano':str(questao['ano'] or ''),'assunto':questao['assunto'],'disciplina':questao['disciplina'],'fonte':questao['fonte']})
        self.assertEqual(novo.status_code,201,novo.get_json())
        # Primeira questão do novo sorteio não precisa ser a mesma; testamos idempotência via API direta.
        r=self.client.post('/api/avaliacao/responder',json=payload)
        self.assertEqual(r.status_code,200)
        self.assertEqual(r.get_json()['xp_ganho'],0)

    def test_quiz_sem_gabarito_publico_e_progresso(self):
        r=self.client.post('/api/avaliacao/responder',json={'questao_id':'quiz:conjuntos:0','alternativa':0})
        self.assertEqual(r.status_code,200,r.get_json())
        self.assertIn('correta',r.get_json())
        p=self.client.get('/api/progresso').get_json()
        self.assertEqual(p['questoes_respondidas'],1)
        self.assertIn(p['xp'],(5,20))

    def test_sem_nota_falsa_e_google_desativado(self):
        texto=('Introdução sobre o problema social.\n\nEntretanto, precisamos analisar as causas e consequências. '
               '\n\nPortanto, a escola e a sociedade devem participar da solução.')
        r=self.client.post('/api/redacao/avaliar-gratis',json={'tema':'Desafios educacionais no Brasil','texto':texto})
        self.assertEqual(r.status_code,200,r.get_json())
        self.assertIsNone(r.get_json()['nota'])
        self.assertEqual(self.client.get('/api/config-publica').get_json()['google_client_id'],'')
        self.assertEqual(self.client.post('/api/auth/google',json={'credential':'abc'}).status_code,503)
        self.assertEqual(self.client.post('/api/corrigir-redacao',json={'tema':'Educação','texto':texto}).status_code,503)

    def test_sem_acesso_http_a_gabaritos_privados(self):
        for caminho in ('/database/gabaritos_banco.json',
                        '/database/questoes_treino.json',
                        '/js/script.js', '/pages/views.html'):
            r=self.client.get(caminho)
            self.assertEqual(r.status_code,404,(caminho,r.status_code))

    def test_questao_aleatoria_filtros_incompativeis(self):
        r=self.client.post('/api/treino/iniciar',json={
            'vestibular':'ENEM','ano':'2015','disciplina':'Biologia',
            'assunto':'Inexistente para esse ano','fonte':'Projeto C# (exercícios)','quantidade':10})
        self.assertEqual(r.status_code,422)


if __name__=='__main__':unittest.main(verbosity=2)
