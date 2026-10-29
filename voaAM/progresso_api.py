"""Gabaritos privados, correção e XP autoritativos no servidor.

Não aceita XP, acerto, gabarito, explicação nem totais do navegador.
Cada questão pode premiar no máximo uma vez por conta (mesmo após repetir).
"""
import json
from pathlib import Path
from flask import Blueprint, jsonify, request, session
from banco import conectar
from treino_api import catalogo

bp_progresso = Blueprint('progresso', __name__)
BASE = Path(__file__).resolve().parent / 'database'


def _ler(nome):
    return json.loads((BASE / nome).read_text(encoding='utf-8'))


def gabaritos():
    base = {q['id']: {'correta': q['correta'], 'total': len(q['alternativas']),
                      'explicacao': q.get('explicacao') or '',
                      'vestibular': q.get('vestibular') or ''} for q in catalogo()}
    for origem, arquivo in [('quiz', 'gabaritos_legados.json'), ('banco', 'gabaritos_banco.json')]:
        for codigo, info in _ler(arquivo).items():
            base[codigo] = {'correta': info['correta'], 'total': info['total'],
                            'explicacao': info.get('explicacao', ''), 'vestibular': 'AULA' if codigo.startswith('quiz:') else ''}
    return base


def pontuar(conexao, usuario_id, qid, indice, correta, vest):
    """Deve executar dentro de uma transação SQLite e devolver XP concedido."""
    acertou = indice == correta
    recompensa = 20 if acertou else 5
    cursor = conexao.execute('''INSERT OR IGNORE INTO recompensas_questoes(usuario_id, questao_id, xp)
                                VALUES (?, ?, ?)''', (usuario_id, qid, recompensa))
    xp_novo = recompensa if cursor.rowcount else 0
    conexao.execute('INSERT OR IGNORE INTO progresso(usuario_id) VALUES (?)', (usuario_id,))
    conexao.execute('''UPDATE progresso SET xp=xp+?, questoes_respondidas=questoes_respondidas+1,
                      acertos=acertos+?, atualizado_em=CURRENT_TIMESTAMP WHERE usuario_id=?''',
                    (xp_novo, int(acertou), usuario_id))
    conexao.execute('''INSERT INTO historico_questoes(usuario_id,questao_id,vestibular,resposta,acertou)
                      VALUES(?,?,?,?,?)''',(usuario_id,qid,vest,str(indice),int(acertou)))
    return xp_novo


@bp_progresso.get('/api/progresso')
def progresso():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message':'Faça login.'}),401
    c = conectar()
    try:
        c.execute('INSERT OR IGNORE INTO progresso(usuario_id) VALUES (?)',(uid,))
        p=c.execute('''SELECT xp, sequencia_dias, aulas_concluidas, questoes_respondidas, acertos
                       FROM progresso WHERE usuario_id=?''',(uid,)).fetchone()
        c.commit()
        return jsonify(dict(p))
    finally:c.close()


@bp_progresso.post('/api/avaliacao/responder')
def avaliar_questao():
    uid = session.get('usuario_id')
    if not uid:return jsonify({'message':'Faça login.'}),401
    d=request.get_json(silent=True)
    if not isinstance(d,dict):return jsonify({'message':'Envie JSON válido.'}),400
    qid=d.get('questao_id'); indice=d.get('alternativa')
    if not isinstance(qid,str) or not isinstance(indice,int) or isinstance(indice,bool):
        return jsonify({'message':'Questão ou alternativa inválida.'}),400
    info=gabaritos().get(qid)
    if not info or not (0<=indice<info['total']):return jsonify({'message':'Questão inválida.'}),404
    c=conectar()
    try:
        ganho=pontuar(c,uid,qid,indice,info['correta'],info['vestibular']);c.commit()
        p=c.execute('SELECT xp, questoes_respondidas, acertos FROM progresso WHERE usuario_id=?',(uid,)).fetchone()
        return jsonify({'acertou':indice==info['correta'],'correta':info['correta'],
                        'explicacao':info['explicacao'],'xp_ganho':ganho,'progresso':dict(p)})
    except Exception:
        c.rollback(); raise
    finally:c.close()


@bp_progresso.post('/api/avaliacao/lote')
def avaliar_lote():
    """Usado na finalização de simulados oficiais, nunca antes dela."""
    uid=session.get('usuario_id')
    if not uid:return jsonify({'message':'Faça login.'}),401
    d=request.get_json(silent=True)
    if not isinstance(d,dict) or not isinstance(d.get('respostas'),list):return jsonify({'message':'Formato inválido.'}),400
    if len(d['respostas'])>100:return jsonify({'message':'Limite de 100 questões.'}),400
    mapa=gabaritos();retorno={};vistos=set();c=conectar()
    try:
        for resposta in d['respostas']:
            if not isinstance(resposta,dict):continue
            qid=resposta.get('id');idx=resposta.get('alternativa')
            info=mapa.get(qid) if isinstance(qid,str) else None
            if not info or qid in vistos or not isinstance(idx,int) or isinstance(idx,bool) or not (0<=idx<info['total']):continue
            vistos.add(qid)
            ganho=pontuar(c,uid,qid,idx,info['correta'],info['vestibular'])
            retorno[qid]={'correta':info['correta'],'acertou':idx==info['correta'],'xp_ganho':ganho}
        c.commit()
        return jsonify({'resultados':retorno,'registradas':len(retorno)})
    except Exception:
        c.rollback();raise
    finally:c.close()
