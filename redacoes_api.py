"""Temas verificados e redações por usuário. Correção por IA em app.py é opcional.
Não inventamos temas/trechos motivadores e não prometemos uma nota oficial.
"""
import json
from pathlib import Path
from flask import Blueprint, jsonify, request, session
from banco import conectar

bp_redacoes = Blueprint('redacoes', __name__)
TEMAS_PATH = Path(__file__).resolve().parent / 'database' / 'temas_redacao.json'


def temas():
    return json.loads(TEMAS_PATH.read_text(encoding='utf-8'))


@bp_redacoes.get('/api/temas-redacao')
def listar_temas():
    return jsonify({'temas': temas()})


@bp_redacoes.get('/api/redacoes')
def listar_redacoes():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message':'Faça login.'}), 401
    c = conectar()
    try:
        docs = c.execute('''SELECT id, tema_id, tema, texto, resultado_ia, nota,
                              criada_em, atualizada_em
                              FROM redacoes WHERE usuario_id=? ORDER BY id DESC LIMIT 100''', (uid,)).fetchall()
        return jsonify({'redacoes':[dict(d) for d in docs]})
    finally:
        c.close()


@bp_redacoes.post('/api/redacoes')
def registrar_redacao():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message':'Faça login para salvar.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados,dict):
        return jsonify({'message':'Envie JSON válido.'}), 400
    tema_id = str(dados.get('tema_id','')).strip()
    tema = next((t for t in temas() if t['id'] == tema_id), None)
    if not tema:
        return jsonify({'message':'Selecione um tema do catálogo confirmado.'}), 400
    texto = dados.get('texto','')
    if not isinstance(texto,str) or not (100 <= len(texto.strip()) <= 10000):
        return jsonify({'message':'Redação: entre 100 e 10.000 caracteres.'}), 400
    c = conectar()
    try:
        cur = c.execute('''INSERT INTO redacoes (usuario_id,tema_id,tema,texto)
                           VALUES (?,?,?,?)''', (uid,tema_id,tema['tema'],texto.strip()))
        c.commit()
        return jsonify({'ok':True,'id':cur.lastrowid}),201
    finally:
        c.close()
