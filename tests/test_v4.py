"""Teste de integração isolado: python tests/test_v4.py dentro do container Flask.
Não toca em instance/voaam.db nem em dados dos usuários.
"""
import json, os, sys, tempfile
from pathlib import Path

with tempfile.TemporaryDirectory(prefix='voaam-teste-') as pasta:
    os.environ['DATABASE_PATH'] = str(Path(pasta)/'teste.db')
    os.environ['FLASK_SECRET_KEY'] = 'chave-apenas-para-teste-local'
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from app import app
    with app.test_client() as client:
        def req(metodo, rota, data=None, status=200):
            res = getattr(client, metodo)(rota, json=data) if data is not None else getattr(client, metodo)(rota)
            assert res.status_code == status, (rota, res.status_code, res.get_json())
            return res.get_json()
        assert req('get','/api/health')['ok']
        catalogo=req('get','/api/treino/catalogo')
        assert catalogo['total'] >= 12, catalogo
        temas=req('get','/api/temas-redacao')['temas']
        assert len(temas) >= 5
        req('post','/api/cadastro', {'nome':'Conta Teste','email':'teste@example.com','senha':'senha-segura','serie':3,'vests':['ENEM']},201)
        nivel=req('get','/api/nivel')
        assert nivel['completo'] is False and nivel['total'] >= catalogo['total']
        treino=req('post','/api/treino/iniciar',{'vestibular':'GERAL','disciplina':'Biologia','quantidade':2},201)
        assert treino['quantidade']==2
        q=treino['questoes'][0]
        assert 'correta' not in q and len(q['alternativas'])>=2
        r=req('post',f"/api/treino/{treino['treino_id']}/responder",{'questao_id':q['id'],'alternativa':0})
        assert r['respondidas']==1
        req('post',f"/api/treino/{treino['treino_id']}/responder",{'questao_id':q['id'],'alternativa':0},409)
        fim=req('post',f"/api/treino/{treino['treino_id']}/encerrar")
        assert fim['respondidas']==1
        tema=temas[0]
        gravado=req('post','/api/redacoes',{'tema_id':tema['id'],'texto':'Este é um texto de teste para uma redação com argumentos, coesão e conclusão. A sociedade deve debater os desafios de maneira respeitosa e fundamentada para alcançar soluções concretas.'},201)
        assert gravado['ok']
        docs=req('get','/api/redacoes')['redacoes']
        assert docs and docs[0]['tema_id']==tema['id']
        nivel=req('get','/api/nivel')
        assert nivel['questoes']['feitas']==1 and nivel['redacoes']['feitas']==1
        req('post','/api/logout')
        req('post','/api/treino/iniciar',{'quantidade':1},401)
        req('get','/api/redacoes',status=401)
    print('OK: saúde, catálogo, temas, cadastro, treino, respostas, histórico, nível e logout')
