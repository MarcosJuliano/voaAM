"""Catálogo de temas e armazenamento de redações por conta."""
import json
from pathlib import Path
from contextlib import closing
from flask import Blueprint, jsonify, request, session
from banco import conectar

bp_redacoes = Blueprint('redacoes', __name__)
TEMAS_PATH = Path(__file__).resolve().parent / 'database' / 'temas_redacao.json'


def temas():
    return json.loads(TEMAS_PATH.read_text(encoding='utf-8'))


def buscar_tema(tema_id):
    return next((t for t in temas() if t['id'] == tema_id), None)


def obter_redacao(c, uid, tema, texto):
    existente = c.execute(
        'SELECT id FROM redacoes WHERE usuario_id=? AND tema_id=? AND texto=? ORDER BY id DESC LIMIT 1',
        (uid, tema['id'], texto),
    ).fetchone()
    if existente:
        return existente['id'], False
    cursor = c.execute(
        'INSERT INTO redacoes (usuario_id, tema_id, tema, texto) VALUES (?, ?, ?, ?)',
        (uid, tema['id'], tema['tema'], texto),
    )
    return cursor.lastrowid, True


def salvar_redacao(uid, tema, texto, avaliacao=None):
    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        redacao_id, nova = obter_redacao(c, uid, tema, texto)
        if avaliacao is not None:
            bruto = json.dumps(avaliacao, ensure_ascii=False)
            modo = avaliacao.get('modo', 'gemini')
            c.execute(
                """INSERT INTO avaliacoes_redacao (redacao_id, provedor, detalhe, estado, nota, resultado_ia)
                   VALUES (?, ?, ?, 'concluida', ?, ?)""",
                (redacao_id, modo, 'resumido' if modo == 'ollama' else 'detalhado', avaliacao['nota_estimada'], bruto),
            )
            c.execute(
                """UPDATE redacoes SET nota=?, resultado_ia=?, atualizada_em=CURRENT_TIMESTAMP
                   WHERE id=?""",
                (avaliacao['nota_estimada'], bruto, redacao_id),
            )
        return redacao_id, nova


def resumo_redacoes(c, uid):
    """Resume todas as correções concluídas e mantém notas legadas sem avaliação."""
    linha = c.execute(
        """WITH minhas AS (SELECT id, nota FROM redacoes WHERE usuario_id=?),
           notas AS (
             SELECT a.nota FROM avaliacoes_redacao a JOIN minhas r ON r.id=a.redacao_id
             WHERE a.estado='concluida' AND a.nota IS NOT NULL
             UNION ALL
             SELECT r.nota FROM minhas r WHERE r.nota IS NOT NULL AND NOT EXISTS (
               SELECT 1 FROM avaliacoes_redacao a
               WHERE a.redacao_id=r.id AND a.estado='concluida' AND a.nota IS NOT NULL
             )
           )
           SELECT (SELECT COUNT(*) FROM minhas) AS salvas, COUNT(nota) AS correcoes,
                  ROUND(AVG(nota), 1) AS media, MAX(nota) AS maior, MIN(nota) AS menor
           FROM notas""", (uid,),
    ).fetchone()
    return dict(linha)


@bp_redacoes.get('/api/temas-redacao')
def listar_temas():
    return jsonify({'temas': temas()})


@bp_redacoes.get('/api/redacoes')
def listar_redacoes():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message':'Faça login.'}), 401
    with closing(conectar()) as c:
        c.execute('BEGIN')
        docs = c.execute(
            """SELECT r.id, r.tema_id, r.tema, r.texto, r.resultado_ia, r.nota,
                      r.criada_em, r.atualizada_em,
                      COALESCE((SELECT MIN(a.nota) FROM avaliacoes_redacao a WHERE a.redacao_id=r.id
                                AND a.estado='concluida'), r.nota) AS menor_nota,
                      COALESCE((SELECT MAX(a.nota) FROM avaliacoes_redacao a WHERE a.redacao_id=r.id
                                AND a.estado='concluida'), r.nota) AS maior_nota
               FROM redacoes AS r
               WHERE r.usuario_id=?
               ORDER BY r.atualizada_em DESC, r.id DESC LIMIT 100""",
            (uid,),
        ).fetchall()
        catalogo = {t['id']: t for t in temas()}
        redacoes = []
        for linha in docs:
            doc = dict(linha)
            tema = catalogo.get(doc['tema_id'], {})
            doc['badge'] = ' '.join(str(tema[c]) for c in ('vestibular', 'ano') if tema.get(c))
            redacoes.append(doc)
        # Mantém a melhor e a pior correção acessíveis mesmo fora dos dez envios mais recentes.
        envios = c.execute(
            """WITH envios AS (
                   SELECT a.id, a.redacao_id, r.tema_id, r.tema, a.provedor, a.detalhe, a.estado,
                          a.nota, a.erro, a.enviada_em, a.resultado_ia IS NOT NULL AS tem_relatorio,
                          CASE WHEN json_valid(a.resultado_ia)
                               THEN json_extract(a.resultado_ia, '$.detalhe') END AS detalhe_entregue,
                          ROW_NUMBER() OVER (
                              PARTITION BY a.redacao_id, a.estado IN ('fila', 'processando')
                              ORDER BY a.enviada_em DESC, a.id DESC
                          ) AS ordem,
                          ROW_NUMBER() OVER (
                              PARTITION BY a.redacao_id, a.estado
                              ORDER BY a.nota DESC NULLS LAST, a.id DESC
                          ) AS maior_ordem,
                          ROW_NUMBER() OVER (
                              PARTITION BY a.redacao_id, a.estado
                              ORDER BY a.nota ASC NULLS LAST, a.id DESC
                          ) AS menor_ordem
                   FROM avaliacoes_redacao a JOIN redacoes r ON r.id=a.redacao_id
                   WHERE r.usuario_id=?
               )
               SELECT id, redacao_id, tema_id, tema, provedor, detalhe, estado, nota, erro, enviada_em, tem_relatorio, detalhe_entregue
               FROM envios WHERE ordem <= 10 OR estado IN ('fila', 'processando')
                 OR (estado='concluida' AND nota IS NOT NULL AND (maior_ordem=1 OR menor_ordem=1))
               ORDER BY enviada_em DESC, id DESC""",
            (uid,),
        )
        resposta = jsonify({'redacoes': redacoes, 'avaliacoes': [dict(item) for item in envios]})
        resposta.headers['Cache-Control'] = 'private, no-store'
        return resposta


@bp_redacoes.post('/api/redacoes')
def registrar_redacao():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login para salvar.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie JSON válido.'}), 400
    tema = buscar_tema(dados.get('tema_id'))
    if not tema:
        return jsonify({'message': 'Selecione um tema do catálogo confirmado.'}), 400
    texto = dados.get('texto', '')
    if not isinstance(texto, str) or not 100 <= len(texto.strip()) <= 10000:
        return jsonify({'message': 'Redação: entre 100 e 10.000 caracteres.'}), 400
    redacao_id, nova = salvar_redacao(uid, tema, texto.strip())
    return jsonify({'ok': True, 'id': redacao_id}), 201 if nova else 200


@bp_redacoes.delete('/api/redacoes')
@bp_redacoes.delete('/api/redacoes/<int:redacao_id>')
def excluir_redacao(redacao_id=None):
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    with closing(conectar()) as c, c:
        if redacao_id is None:
            c.execute('DELETE FROM redacoes WHERE usuario_id=?', (uid,))
        else:
            cursor = c.execute('DELETE FROM redacoes WHERE usuario_id=? AND id=?', (uid, redacao_id))
            if not cursor.rowcount:
                return jsonify({'message': 'Redação não encontrada.'}), 404
    return '', 204
