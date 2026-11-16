"""Gabaritos privados, correção e XP autoritativos no servidor.

Não aceita XP, acerto, gabarito, explicação nem totais do navegador.
Cada questão pode premiar no máximo uma vez por conta (mesmo após repetir).
"""
import json
from pathlib import Path
from flask import Blueprint, jsonify, request, session, url_for
from contextlib import closing
from banco import conectar
from treino_api import catalogo
from perfil_api import responder_foto
from redacoes_api import resumo_redacoes

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


@bp_progresso.get('/api/ranking')
def ranking():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login para ver o ranking.'}), 401
    pagina = request.args.get('pagina', 1, type=int)
    if not 1 <= pagina <= 1_000_000:
        return jsonify({'message': 'Página inválida.'}), 400

    por_pagina = 25
    c = conectar()
    try:
        # Uma consulta mantém a posição individual e as linhas da página no mesmo retrato do banco.
        linhas = c.execute(
            """WITH alunos AS (
                   SELECT u.id, u.nome, COALESCE(p.xp,0) AS xp
                   FROM usuarios u LEFT JOIN progresso p ON p.usuario_id=u.id
                   WHERE u.ativo=1 AND u.tipo='ALUNO'
               ), classificados AS (
                   SELECT id, nome, xp, RANK() OVER (ORDER BY xp DESC) AS posicao,
                          ROW_NUMBER() OVER (ORDER BY xp DESC, id) AS linha,
                          COUNT(*) OVER () AS total
                   FROM alunos
               )
               SELECT classificados.*, f.usuario_id IS NOT NULL AS tem_foto
               FROM classificados LEFT JOIN fotos_perfil f ON f.usuario_id=classificados.id
               WHERE classificados.id=? OR linha BETWEEN ? AND ?
               ORDER BY linha""",
            (uid, (pagina - 1) * por_pagina + 1, pagina * por_pagina),
        ).fetchall()
        if not linhas:
            total = c.execute("SELECT COUNT(*) FROM usuarios WHERE ativo=1 AND tipo='ALUNO'").fetchone()[0]
        else:
            total = linhas[0]['total']
        alunos = []
        minha_posicao = None
        for linha in linhas:
            partes = linha['nome'].split()
            nome = partes[0] if partes else 'Estudante'
            if len(partes) > 1:
                nome += ' ' + partes[-1][0] + '.'
            aluno = {'nome': nome, 'xp': linha['xp'], 'posicao': linha['posicao'], 'voce': linha['id'] == uid}
            if linha['tem_foto']:
                aluno['foto_url'] = url_for('progresso.foto_ranking', aluno_id=linha['id'])
            if aluno['voce']:
                minha_posicao = aluno
            if (pagina - 1) * por_pagina < linha['linha'] <= pagina * por_pagina:
                alunos.append(aluno)
        resposta = jsonify({'alunos': alunos, 'minha_posicao': minha_posicao, 'total': total,
                            'pagina': pagina, 'por_pagina': por_pagina})
        resposta.headers['Cache-Control'] = 'private, no-store'
        return resposta
    finally:
        c.close()


@bp_progresso.get('/api/ranking/foto/<int:aluno_id>')
def foto_ranking(aluno_id):
    if not session.get('usuario_id'):
        return '', 401
    with closing(conectar()) as c:
        foto = c.execute(
            """SELECT f.imagem FROM fotos_perfil f JOIN usuarios u ON u.id=f.usuario_id
               WHERE u.id=? AND u.ativo=1 AND u.tipo='ALUNO'""", (aluno_id,),
        ).fetchone()
    return responder_foto(foto['imagem']) if foto else ('', 404)


@bp_progresso.get('/api/progresso/disciplinas')
def desempenho_disciplinas():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401

    disciplinas = {}
    questoes = {}

    def incluir(qid, disciplina, assunto):
        questoes[qid] = (disciplina, assunto)
        metricas = disciplinas.setdefault(disciplina, {'total': 0, 'respondidas': 0, 'acertos': 0})
        metricas['total'] += 1

    for questao in catalogo():
        materia = questao.get('disciplina') or 'Outras'
        incluir(questao['id'], materia, questao.get('assunto') or materia)

    topicos = {
        item.split(':')[2]: 'Redação' if item.startswith('red:') else 'Matemática'
        for item in _ler('topicos_catalogo.json')
    }
    for qid in _ler('gabaritos_legados.json'):
        tipo, origem, _ = qid.split(':')
        materia = topicos.get(origem) if tipo == 'quiz' else ('Redação' if origem == 'red' else 'Matemática')
        if materia and qid not in questoes:
            incluir(qid, materia, materia)

    c = conectar()
    try:
        respostas = c.execute(
            """SELECT h.questao_id, h.acertou FROM historico_questoes h
               JOIN (SELECT MAX(id) AS id FROM historico_questoes
                     WHERE usuario_id=? GROUP BY questao_id) ultimas ON ultimas.id=h.id""", (uid,),
        ).fetchall()
        atividade = c.execute('SELECT ultima_atividade FROM progresso WHERE usuario_id=?', (uid,)).fetchone()
        redacoes = resumo_redacoes(c, uid)
    finally:
        c.close()

    dificuldades = {}
    for resposta in respostas:
        contexto = questoes.get(resposta['questao_id'])
        if not contexto:
            continue
        materia, assunto = contexto
        disciplinas[materia]['respondidas'] += 1
        disciplinas[materia]['acertos'] += resposta['acertou']
        if not resposta['acertou']:
            dificuldades[assunto] = dificuldades.get(assunto, 0) + 1
    assunto_erros = sorted(dificuldades.items(), key=lambda item: (-item[1], item[0]))[:5]
    resposta = jsonify({
        'disciplinas': [{'nome': nome, **valores} for nome, valores in sorted(disciplinas.items())],
        'revisao': [{'nome': nome, 'erros': erros} for nome, erros in assunto_erros],
        'ultima_atividade': atividade['ultima_atividade'] if atividade else None,
        'redacoes': redacoes,
    })
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta
