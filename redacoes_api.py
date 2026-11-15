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


def salvar_redacao(uid, tema, texto, avaliacao=None):
    # Concluir e avaliar a mesma versão atualizam a mesma redação.
    # Alterações no texto criam uma versão com avaliação própria.
    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        existente = c.execute(
            'SELECT id FROM redacoes WHERE usuario_id=? AND tema_id=? AND texto=? ORDER BY id DESC LIMIT 1',
            (uid, tema['id'], texto),
        ).fetchone()
        nova = existente is None
        if nova:
            cursor = c.execute(
                'INSERT INTO redacoes (usuario_id, tema_id, tema, texto) VALUES (?, ?, ?, ?)',
                (uid, tema['id'], tema['tema'], texto),
            )
            redacao_id = cursor.lastrowid
        else:
            redacao_id = existente['id']
        if avaliacao is not None:
            c.execute(
                """UPDATE redacoes SET nota=?, resultado_ia=?, atualizada_em=CURRENT_TIMESTAMP
                   WHERE id=? AND usuario_id=?""",
                (avaliacao['nota_estimada'], json.dumps(avaliacao, ensure_ascii=False), redacao_id, uid),
            )
        return redacao_id, nova


@bp_redacoes.get('/api/temas-redacao')
def listar_temas():
    return jsonify({'temas': temas()})


@bp_redacoes.get('/api/redacoes')
def listar_redacoes():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message':'Faça login.'}), 401
    with closing(conectar()) as c:
        docs = c.execute(
            """SELECT r.id, r.tema_id, r.tema, r.texto, r.resultado_ia, r.nota,
                      r.criada_em, r.atualizada_em
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
        resposta = jsonify({'redacoes': redacoes})
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
