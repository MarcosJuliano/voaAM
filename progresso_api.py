"""Gabaritos privados, correção e XP autoritativos no servidor.

Não aceita XP, acerto, gabarito, explicação nem totais do navegador.
Cada questão pode premiar no máximo uma vez por conta (mesmo após repetir).
"""
import json
import re
from hashlib import sha256
from pathlib import Path
from flask import Blueprint, jsonify, request, session, url_for
from contextlib import closing
from banco import conectar
from treino_api import catalogo
from perfil_api import TABELAS_IMAGENS, imagem_publicada, pode_moderar_imagens, responder_foto
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
    """Registra a resposta na transação e devolve o XP e o ID da resposta."""
    acertou = indice == correta
    # Errar não dá XP e não impede receber a recompensa quando acertar depois.
    xp_novo = 0
    if acertou:
        cursor = conexao.execute('''INSERT OR IGNORE INTO recompensas_questoes(usuario_id, questao_id, xp)
                                    VALUES (?, ?, 20)''', (usuario_id, qid))
        xp_novo = 20 if cursor.rowcount else 0
    conexao.execute('INSERT OR IGNORE INTO progresso(usuario_id) VALUES (?)', (usuario_id,))
    conexao.execute('''UPDATE progresso SET xp=xp+?, questoes_respondidas=questoes_respondidas+1,
                      acertos=acertos+?, atualizado_em=CURRENT_TIMESTAMP WHERE usuario_id=?''',
                    (xp_novo, int(acertou), usuario_id))
    resposta = conexao.execute('''INSERT INTO historico_questoes(usuario_id,questao_id,vestibular,resposta,acertou)
                                 VALUES(?,?,?,?,?)''', (usuario_id, qid, vest, str(indice), int(acertou)))
    return xp_novo, resposta.lastrowid


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
        ganho, resposta_id = pontuar(c, uid, qid, indice, info['correta'], info['vestibular'])
        c.commit()
        p=c.execute('SELECT xp, questoes_respondidas, acertos FROM progresso WHERE usuario_id=?',(uid,)).fetchone()
        return jsonify({'acertou':indice==info['correta'],'correta':info['correta'],
                        'explicacao':info['explicacao'],'xp_ganho':ganho,'progresso':dict(p),
                        'resposta_id': resposta_id})
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
            ganho, _ = pontuar(c,uid,qid,idx,info['correta'],info['vestibular'])
            retorno[qid]={'correta':info['correta'],'acertou':idx==info['correta'],'xp_ganho':ganho}
        c.commit()
        return jsonify({'resultados':retorno,'registradas':len(retorno)})
    except Exception:
        c.rollback();raise
    finally:c.close()


@bp_progresso.get('/api/praticar/exercicios/notas')
def notas_exercicios():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    questoes = request.args.getlist('id')
    if not 1 <= len(questoes) <= 10 or any(len(q) > 100 or not q.startswith('banco:') for q in questoes):
        return jsonify({'message': 'Selecione de 1 a 10 exercícios.'}), 400
    marcadores = ','.join('?' for _ in questoes)
    with closing(conectar()) as c:
        historico = c.execute(f'''WITH notas AS (
                SELECT questao_id, acertou, id,
                       ROW_NUMBER() OVER (PARTITION BY questao_id ORDER BY id DESC) AS ordem_questao,
                       ROW_NUMBER() OVER (ORDER BY id DESC) AS ordem
                FROM historico_questoes WHERE usuario_id=? AND questao_id IN ({marcadores})
            )
            SELECT * FROM notas WHERE ordem_questao=1 OR ordem<=5 ORDER BY id DESC''',
            (uid, *questoes)).fetchall()
    resposta = jsonify({
        'ultimas': [{'questao_id': r['questao_id'], 'nota': 100 * r['acertou']} for r in historico if r['ordem'] <= 5],
        'por_questao': {r['questao_id']: 100 * r['acertou'] for r in historico if r['ordem_questao'] == 1},
    })
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta


def simulado_valido(modo, chave):
    return modo in ('simples', 'completo') and isinstance(chave, str) and re.fullmatch(r'[\w-]{1,80}', chave)


@bp_progresso.get('/api/praticar/simulados/notas')
def notas_simulado():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    modo, chave = request.args.get('modo'), request.args.get('chave')
    if not simulado_valido(modo, chave):
        return jsonify({'message': 'Simulado inválido.'}), 400
    with closing(conectar()) as c:
        notas = c.execute('''WITH notas AS (
                SELECT id, CAST(ROUND(100.0 * acertos / total) AS INTEGER) AS nota
                FROM notas_simulados WHERE usuario_id=? AND modo=? AND chave=?
            )
            SELECT nota AS ultima, MAX(nota) OVER () AS maxima, MIN(nota) OVER () AS minima
            FROM notas ORDER BY id DESC LIMIT 1''', (uid, modo, chave)).fetchone()
    resposta = jsonify({'notas': dict(notas) if notas else None})
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta


@bp_progresso.post('/api/praticar/simulados/notas')
def salvar_nota_simulado():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Simulado inválido.'}), 400
    modo, chave, tentativa = dados.get('modo'), dados.get('chave'), dados.get('tentativa')
    respostas = dados.get('respostas')
    if (not simulado_valido(modo, chave) or not isinstance(tentativa, str)
            or not re.fullmatch(r'[0-9a-f]{32}', tentativa) or not isinstance(respostas, list)
            or len(respostas) > 100):
        return jsonify({'message': 'Simulado inválido.'}), 400

    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        anterior = c.execute('SELECT modo, chave, acertos, total, resultados_json FROM notas_simulados '
                             'WHERE usuario_id=? AND tentativa=?', (uid, tentativa)).fetchone()
        if anterior:
            if (anterior['modo'], anterior['chave']) != (modo, chave):
                return jsonify({'message': 'A tentativa já foi salva para outro simulado.'}), 409
            return jsonify({'acertos': anterior['acertos'], 'total': anterior['total'],
                            'resultados': json.loads(anterior['resultados_json'])})

        mapa = gabaritos()
        resultados = {}
        if modo == 'completo':
            prova = {qid: info for qid, info in mapa.items() if qid.startswith(f'oficial:{chave}:')}
            if not prova:
                return jsonify({'message': 'Prova indisponível para correção.'}), 404
            alternativas = {}
            for resposta in respostas:
                if not isinstance(resposta, dict):
                    return jsonify({'message': 'Resposta inválida.'}), 400
                qid, indice = resposta.get('id'), resposta.get('alternativa')
                info = prova.get(qid) if isinstance(qid, str) else None
                if not info or qid in alternativas or type(indice) is not int or not 0 <= indice < info['total']:
                    return jsonify({'message': 'Questão ou alternativa inválida para esta prova.'}), 400
                alternativas[qid] = indice

            for qid, indice in alternativas.items():
                info = prova[qid]
                certa = info['correta']
                pontuar(c, uid, qid, indice, certa, info['vestibular'])
                resultados[qid] = {'correta': certa, 'acertou': indice == certa}
            acertos, total = sum(r['acertou'] for r in resultados.values()), len(prova)
        else:
            questoes = dados.get('questoes')
            if (not isinstance(questoes, list) or not 1 <= len(questoes) <= 100
                    or any(not isinstance(q, str) or not q.startswith(('banco:', 'simulado:'))
                           or q not in mapa for q in questoes)
                    or len(set(questoes)) != len(questoes)
                    or any(type(r) is not int or not 0 < r <= 2**63 - 1 for r in respostas)):
                return jsonify({'message': 'Questões ou respostas inválidas para o simulado.'}), 400
            registradas = []
            if respostas:
                marcadores = ','.join('?' for _ in respostas)
                registradas = c.execute(f'SELECT questao_id, acertou FROM historico_questoes '
                                       f'WHERE usuario_id=? AND id IN ({marcadores})', (uid, *respostas)).fetchall()
            ids = {r['questao_id'] for r in registradas}
            if len(ids) != len(respostas) or not ids.issubset(questoes):
                return jsonify({'message': 'Há respostas que não pertencem à tentativa.'}), 400
            acertos, total = sum(r['acertou'] for r in registradas), len(questoes)

        c.execute('''INSERT INTO notas_simulados(usuario_id, tentativa, modo, chave, acertos, total, resultados_json)
                     VALUES (?,?,?,?,?,?,?)''', (uid, tentativa, modo, chave, acertos, total, json.dumps(resultados)))
    return jsonify({'acertos': acertos, 'total': total, 'resultados': resultados})


@bp_progresso.get('/api/ranking')
def ranking():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login para ver o ranking.'}), 401
    pagina = request.args.get('pagina', 1, type=int)
    if not 1 <= pagina <= 1_000_000:
        return jsonify({'message': 'Página inválida.'}), 400

    por_pagina = 25  # 5 linhas visíveis; scroll interno e paginação mantida.
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
               SELECT classificados.*, f.moderacao AS estado_foto, f.versao AS foto_versao,
                      pf.banner_tema AS banner_tema
               FROM classificados
               LEFT JOIN fotos_perfil f ON f.usuario_id=classificados.id
               LEFT JOIN perfis pf ON pf.usuario_id=classificados.id
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
            aluno = {'id': linha['id'], 'nome': nome, 'xp': linha['xp'], 'posicao': linha['posicao'],
                     'banner': linha['banner_tema'] or 'oceano', 'voce': linha['id'] == uid}
            if imagem_publicada(linha['estado_foto']):
                aluno['foto_url'] = url_for('progresso.foto_ranking', tipo='foto', aluno_id=linha['id'],
                                           v=linha['foto_versao'])
            elif aluno['voce'] and linha['estado_foto'] == 'pendente':
                aluno['foto_url'] = url_for('config_perfil.foto_perfil', tipo='foto', v=linha['foto_versao'])
            if aluno['voce']:
                minha_posicao = aluno
                minha_posicao['pagina'] = ((linha['linha'] - 1) // por_pagina) + 1
            if (pagina - 1) * por_pagina < linha['linha'] <= pagina * por_pagina:
                alunos.append(aluno)
        resposta = jsonify({'alunos': alunos, 'minha_posicao': minha_posicao, 'total': total,
                            'pagina': pagina, 'por_pagina': por_pagina})
        resposta.headers['Cache-Control'] = 'private, no-store'
        return resposta
    finally:
        c.close()


@bp_progresso.get('/api/ranking/foto/<int:aluno_id>', defaults={'tipo': 'foto'})
@bp_progresso.get('/api/ranking/banner/<int:aluno_id>', defaults={'tipo': 'banner'})
def foto_ranking(aluno_id, tipo):
    if not session.get('usuario_id'):
        return '', 401
    tabela = TABELAS_IMAGENS[tipo]
    with closing(conectar()) as c:
        foto = c.execute(
            f"""SELECT f.imagem, f.moderacao FROM {tabela} f JOIN usuarios u ON u.id=f.usuario_id
                LEFT JOIN perfis p ON p.usuario_id=u.id
                WHERE u.id=? AND u.ativo=1 AND u.tipo='ALUNO'
                  AND (?='foto' OR p.banner_modo='personalizado')""", (aluno_id, tipo),
        ).fetchone()
    return responder_foto(foto['imagem']) if foto and imagem_publicada(foto['moderacao']) else ('', 404)


def resumo_disciplinas(c, uid):
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

    respostas = c.execute(
        """SELECT h.questao_id, h.acertou FROM historico_questoes h
           JOIN (SELECT MAX(id) AS id FROM historico_questoes
                 WHERE usuario_id=? GROUP BY questao_id) ultimas ON ultimas.id=h.id""", (uid,),
    ).fetchall()

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
    return [{'nome': nome, **valores} for nome, valores in sorted(disciplinas.items())], dificuldades


@bp_progresso.get('/api/progresso/disciplinas')
def desempenho_disciplinas():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    with closing(conectar()) as c:
        disciplinas, dificuldades = resumo_disciplinas(c, uid)
        atividade = c.execute('SELECT ultima_atividade FROM progresso WHERE usuario_id=?', (uid,)).fetchone()
        redacoes = resumo_redacoes(c, uid)
    assunto_erros = sorted(dificuldades.items(), key=lambda item: (-item[1], item[0]))[:5]
    resposta = jsonify({
        'disciplinas': disciplinas,
        'revisao': [{'nome': nome, 'erros': erros} for nome, erros in assunto_erros],
        'ultima_atividade': atividade['ultima_atividade'] if atividade else None,
        'redacoes': redacoes,
    })
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta


def imagem_no_perfil(linha, tipo, aluno_id, visitante_id):
    estado = linha[f'estado_{tipo}']
    token = linha[f'{tipo}_versao']
    if imagem_publicada(estado):
        return url_for('progresso.foto_ranking', tipo=tipo, aluno_id=aluno_id, v=token), None, None
    if estado == 'pendente':
        imagem = linha[f'{tipo}_revisao']
        if imagem is not None:
            versao = sha256(imagem).hexdigest()
            url = url_for('config_perfil.imagem_pendente_administrador',
                          aluno_id=aluno_id, tipo=tipo, versao=versao)
            return url, estado, versao
        if aluno_id == visitante_id:
            return url_for('config_perfil.foto_perfil', tipo=tipo, v=token), estado, None
    return None, None, None


@bp_progresso.get('/api/alunos/<int:aluno_id>/perfil-publico')
def perfil_publico_aluno(aluno_id):
    """Resumo de estudo e desempenho para alunos no ranking."""
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    with closing(conectar()) as c:
        moderador = pode_moderar_imagens(c, uid)
        a = c.execute("""SELECT u.nome, p.banner_tema, p.serie, p.vestibulares_json, COALESCE(g.xp,0) AS xp,
                         COALESCE(g.questoes_respondidas,0) AS questoes,
                         COALESCE(g.acertos,0) AS acertos,
                         f.moderacao AS estado_foto, b.moderacao AS estado_banner,
                         f.versao AS foto_versao, b.versao AS banner_versao,
                         CASE WHEN ? AND f.moderacao='pendente' THEN f.imagem END AS foto_revisao,
                         CASE WHEN ? AND b.moderacao='pendente' THEN b.imagem END AS banner_revisao
                         FROM usuarios u
                         LEFT JOIN perfis p ON p.usuario_id=u.id
                         LEFT JOIN progresso g ON g.usuario_id=u.id
                         LEFT JOIN fotos_perfil f ON f.usuario_id=u.id
                         LEFT JOIN banners_perfil b ON b.usuario_id=u.id AND p.banner_modo='personalizado'
                         WHERE u.id=? AND u.ativo=1 AND u.tipo='ALUNO'""", (moderador, moderador, aluno_id)).fetchone()
        if not a:
            return jsonify({'message': 'Perfil não encontrado.'}), 404
        disciplinas, _ = resumo_disciplinas(c, aluno_id)
    partes = a['nome'].split()
    nome = (partes[0] + (' ' + partes[-1][0] + '.' if len(partes) > 1 else '')) if partes else 'Estudante'
    try:
        vests = json.loads(a['vestibulares_json'] or '[]')
    except ValueError:
        vests = []
    if not isinstance(vests, list):
        vests = []
    praticadas = [d for d in disciplinas if d['respondidas']]
    destaque = max(
        (d for d in praticadas if d['respondidas'] >= 3 and d['acertos']),
        key=lambda d: (d['acertos'] / d['respondidas'], d['acertos']), default=None,
    )
    mais_praticada = max(praticadas, key=lambda d: (d['respondidas'], d['acertos']), default=None)
    banner_url, banner_status, banner_revisao = imagem_no_perfil(a, 'banner', aluno_id, uid)
    foto_url, foto_status, foto_revisao = imagem_no_perfil(a, 'foto', aluno_id, uid)
    resposta = {'nome': nome, 'banner': a['banner_tema'] or 'oceano',
                'serie': a['serie'], 'vests': [v for v in vests if v in ('ENEM', 'PSC', 'SIS', 'MACRO')],
                'xp': a['xp'], 'questoes': a['questoes'], 'acertos': a['acertos'],
                'foto_url': foto_url, 'foto_status': foto_status, 'foto_revisao': foto_revisao,
                'banner_url': banner_url, 'banner_status': banner_status, 'banner_revisao': banner_revisao,
                'destaque': destaque, 'mais_praticada': mais_praticada,
                'questoes_distintas': sum(d['respondidas'] for d in praticadas)}
    r = jsonify(resposta)
    r.headers['Cache-Control'] = 'private, no-store'
    return r
