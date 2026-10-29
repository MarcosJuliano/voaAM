"""Progresso integral por conteúdo conhecido; nível 50 só após completar o acervo.

Aulas e temas são armazenados por usuário no SQLite. Questões precisam ser
respondidas ao menos uma vez nos treinos personalizados para contar para a meta.
"""
import json
from pathlib import Path
from flask import Blueprint, jsonify, session
from banco import conectar
from treino_api import catalogo

bp_nivel = Blueprint('nivel', __name__)
BASE = Path(__file__).resolve().parent / 'database'


def contar_progresso(uid):
    ids = {q['id'] for q in catalogo()}
    topicos = set(json.loads((BASE / 'topicos_catalogo.json').read_text(encoding='utf-8')))
    temas = {t['id'] for t in json.loads((BASE / 'temas_redacao.json').read_text(encoding='utf-8'))}
    c = conectar()
    try:
        feitos_q = {r[0] for r in c.execute('SELECT DISTINCT questao_id FROM historico_questoes WHERE usuario_id=?',(uid,))} & ids
        feitos_t = {r[0] for r in c.execute('SELECT topico_id FROM topicos_concluidos WHERE usuario_id=?',(uid,))} & topicos
        feitos_r = {r[0] for r in c.execute('SELECT DISTINCT tema_id FROM redacoes WHERE usuario_id=? AND LENGTH(TRIM(texto))>=100',(uid,))} & temas
    finally:
        c.close()
    total = len(ids)+len(topicos)+len(temas)
    feito = len(feitos_q)+len(feitos_t)+len(feitos_r)
    return {'total': total,'concluidos':feito,'percentual': round(feito/total*100,2) if total else 0,
            'completo': bool(total) and feito==total,
            'questoes':{'feitas':len(feitos_q),'total':len(ids)},
            'topicos':{'feitos':len(feitos_t),'total':len(topicos)},
            'redacoes':{'feitas':len(feitos_r),'total':len(temas)}}


@bp_nivel.get('/api/nivel')
def obter_nivel():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message':'Faça login.'}),401
    return jsonify(contar_progresso(uid))
