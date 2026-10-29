"""Servidor Flask do voaAM: frontend estático, autenticação e APIs."""
from __future__ import annotations

import json
import os
import re
import sqlite3
import time
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from banco import conectar, inicializar_banco

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"

# Fora do Docker, o mesmo .env da raiz pode ser lido pela aplicação.
# No Docker Compose, variáveis explícitas prevalecem (override=False).
try:
    from dotenv import load_dotenv
    load_dotenv(BASE_DIR / '.env', override=False)
except ImportError:
    pass

app = Flask(__name__, static_folder=str(PUBLIC_DIR), static_url_path="")
app.config.update(
    SECRET_KEY=os.environ.get("FLASK_SECRET_KEY", "dev-only-change-this-key"),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("SESSION_COOKIE_SECURE", "false").lower() == "true",
    PERMANENT_SESSION_LIFETIME=60 * 60 * 24 * 7,
    MAX_CONTENT_LENGTH=1_000_000,
)

# Cria tabelas caso ainda não existam. Não apaga usuários/dados já salvos.
inicializar_banco()

from treino_api import bp_treino
app.register_blueprint(bp_treino)
from nivel_api import bp_nivel
app.register_blueprint(bp_nivel)
from redacoes_api import bp_redacoes
app.register_blueprint(bp_redacoes)
from progresso_api import bp_progresso
app.register_blueprint(bp_progresso)
from google_api import bp_google
app.register_blueprint(bp_google)
from redacao_gratis_api import bp_redacao_gratis
app.register_blueprint(bp_redacao_gratis)
from redacao_ia_api import bp_redacao_ia
app.register_blueprint(bp_redacao_ia)

VESTIBULARES_VALIDOS = {"SIS", "PSC", "ENEM", "MACRO"}
DIFICULDADES_VALIDAS = {"ambos", "facil", "medio", "dificil", "basica", "intermediaria", "avancada"}


def _ler_json() -> dict[str, Any] | None:
    dados = request.get_json(silent=True)
    return dados if isinstance(dados, dict) else None


def _perfil_publico(linha: sqlite3.Row) -> dict[str, Any]:
    try:
        vestibulares = json.loads(linha["vestibulares_json"] or '["SIS"]')
    except (json.JSONDecodeError, TypeError):
        vestibulares = ["SIS"]

    if not isinstance(vestibulares, list):
        vestibulares = ["SIS"]

    return {
        "nome": linha["nome"],
        "serie": linha["serie"] if linha["serie"] is not None else 3,
        "vests": vestibulares,
        "dific": linha["dificuldade"] or "ambos",
    }


def _carregar_conta(usuario_id: int) -> dict[str, Any] | None:
    conexao = conectar()
    try:
        linha = conexao.execute(
            """
            SELECT u.id, u.nome, u.email, u.tipo, u.ativo,
                   p.serie, p.vestibulares_json, p.dificuldade
              FROM usuarios AS u
              LEFT JOIN perfis AS p ON p.usuario_id = u.id
             WHERE u.id = ?
            """,
            (usuario_id,),
        ).fetchone()
        if linha is None:
            return None
        return {
            "usuario": {
                "id": linha["id"],
                "nome": linha["nome"],
                "email": linha["email"],
                "tipo": linha["tipo"],
            },
            "perfil": _perfil_publico(linha),
        }
    finally:
        conexao.close()


@app.get("/")
def inicio():
    """Entrega a aplicação de página única existente em public/index.html."""
    return app.send_static_file("index.html")


@app.get("/api/provas-oficiais")
def provas_oficiais():
    """Referências a páginas oficiais, sem arquivos PDF locais ou URLs inventadas."""
    vest = request.args.get('vestibular', '').upper().strip()
    if vest and vest not in VESTIBULARES_VALIDOS:
        return jsonify({"message": "Vestibular inválido."}), 400
    docs = []
    conexao = None
    try:
        conexao = conectar()
        if vest:
            linhas = conexao.execute(
                """SELECT vestibular, ano, titulo, instituicao, url_oficial, observacao
                   FROM documentos_provas WHERE vestibular = ? ORDER BY ano DESC""", (vest,),
            ).fetchall()
        else:
            linhas = conexao.execute(
                """SELECT vestibular, ano, titulo, instituicao, url_oficial, observacao
                   FROM documentos_provas ORDER BY vestibular, ano DESC"""
            ).fetchall()
        docs = [dict(linha) for linha in linhas]
    except sqlite3.Error:
        app.logger.exception('Falha no índice SQLite de provas; usando catálogo local')
    finally:
        if conexao is not None:
            conexao.close()
    if not docs:
        catalogo = BASE_DIR / 'database' / 'provas_oficiais.json'
        if catalogo.is_file():
            try:
                docs = json.loads(catalogo.read_text(encoding='utf-8'))
                if vest:
                    docs = [d for d in docs if d.get('vestibular') == vest]
            except (ValueError, OSError):
                app.logger.exception('Catálogo de provas não pôde ser lido')
    return jsonify({'documentos': docs}), 200


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "servico": "voaAM-api"})


@app.post("/api/cadastro")
def realizar_cadastro():
    dados = _ler_json()
    if dados is None:
        return jsonify({"message": "Envie os dados de cadastro em formato JSON."}), 400

    nome = str(dados.get("nome", "")).strip()
    email = str(dados.get("email", "")).strip().lower()
    senha = dados.get("senha", "")

    if not nome or len(nome) > 120:
        return jsonify({"message": "Informe seu nome (até 120 caracteres)."}), 400
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return jsonify({"message": "Informe um e-mail válido."}), 400
    if not isinstance(senha, str) or len(senha) < 6:
        return jsonify({"message": "A senha deve ter pelo menos 6 caracteres."}), 400
    if len(senha) > 256:
        return jsonify({"message": "A senha é muito longa."}), 400

    try:
        serie = int(dados.get("serie", 0))
    except (TypeError, ValueError):
        serie = 0
    if serie not in {1, 2, 3, 4}:
        return jsonify({"message": "Selecione uma série válida."}), 400

    selecionados = dados.get("vests", ["SIS"])
    if not isinstance(selecionados, list):
        selecionados = ["SIS"]
    vestibulares = []
    for item in selecionados:
        codigo = str(item).strip().upper()
        if codigo in VESTIBULARES_VALIDOS and codigo not in vestibulares:
            vestibulares.append(codigo)
    if not vestibulares:
        vestibulares = ["SIS"]

    dificuldade = str(dados.get("dific", "ambos")).strip().lower()
    if dificuldade not in DIFICULDADES_VALIDAS:
        dificuldade = "ambos"

    conexao = conectar()
    try:
        cursor = conexao.execute(
            "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
            (nome, email, generate_password_hash(senha)),
        )
        usuario_id = cursor.lastrowid
        conexao.execute(
            """INSERT INTO perfis (usuario_id, serie, vestibulares_json, dificuldade)
               VALUES (?, ?, ?, ?)""",
            (usuario_id, serie, json.dumps(vestibulares, ensure_ascii=False), dificuldade),
        )
        conexao.execute("INSERT INTO progresso (usuario_id) VALUES (?)", (usuario_id,))
        conexao.commit()
    except sqlite3.IntegrityError:
        conexao.rollback()
        return jsonify({"message": "Este e-mail já está cadastrado."}), 409
    except sqlite3.Error:
        conexao.rollback()
        app.logger.exception("Falha ao cadastrar usuário")
        return jsonify({"message": "Não foi possível realizar o cadastro agora."}), 500
    finally:
        conexao.close()

    session.clear()
    session["usuario_id"] = usuario_id
    session.permanent = True
    conta = _carregar_conta(usuario_id)
    return jsonify({"message": "Cadastro realizado com sucesso!", "autenticado": True, **conta}), 201


@app.post("/api/login")
def realizar_login():
    dados = _ler_json()
    if dados is None:
        return jsonify({"message": "Envie os dados de login em formato JSON."}), 400

    email = str(dados.get("email", dados.get("emailOrInscricao", ""))).strip().lower()
    senha = dados.get("senha", "")
    if not email or not isinstance(senha, str) or not senha:
        return jsonify({"message": "Preencha o e-mail e a senha."}), 400

    conexao = conectar()
    try:
        usuario = conexao.execute(
            "SELECT id, senha_hash, ativo FROM usuarios WHERE email = ?", (email,)
        ).fetchone()
    finally:
        conexao.close()

    if usuario is None or not check_password_hash(usuario["senha_hash"], senha):
        return jsonify({"message": "E-mail ou senha incorretos."}), 401
    if usuario["ativo"] != 1:
        return jsonify({"message": "Esta conta está desativada."}), 403

    session.clear()
    session["usuario_id"] = usuario["id"]
    session.permanent = True
    conta = _carregar_conta(usuario["id"])
    return jsonify({"message": "Login realizado com sucesso!", "autenticado": True, **conta}), 200


@app.get("/api/me")
def sessao_atual():
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"autenticado": False}), 200

    conta = _carregar_conta(int(usuario_id))
    if conta is None:
        session.clear()
        return jsonify({"autenticado": False}), 200

    return jsonify({"autenticado": True, **conta}), 200


@app.post("/api/logout")
def logout():
    session.clear()
    return jsonify({"message": "Logout realizado com sucesso.", "autenticado": False}), 200


@app.get("/api/topicos-concluidos")
def listar_topicos_concluidos():
    """Lista os tópicos concluídos pelo usuário autenticado."""
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"message": "Faça login para consultar seu progresso."}), 401

    conexao = conectar()
    try:
        linhas = conexao.execute(
            """SELECT topico_id, disciplina, serie, quiz_id, questoes_total,
                      acertos, percentual, concluido_em, atualizado_em
                 FROM topicos_concluidos
                WHERE usuario_id = ?
                ORDER BY concluido_em DESC""",
            (usuario_id,),
        ).fetchall()
        return jsonify({"topicos": [dict(linha) for linha in linhas]}), 200
    except sqlite3.Error:
        app.logger.exception("Falha ao consultar tópicos concluídos")
        return jsonify({"message": "Não foi possível carregar o progresso."}), 500
    finally:
        conexao.close()


@app.post("/api/topicos-concluidos")
def registrar_topico_concluido():
    """Registra a conclusão de um quiz; o mesmo tópico conta uma vez nas aulas."""
    usuario_id = session.get("usuario_id")
    if not usuario_id:
        return jsonify({"message": "Faça login para salvar seu progresso."}), 401

    dados = _ler_json()
    if dados is None:
        return jsonify({"message": "Envie os dados do tópico em formato JSON."}), 400

    topico_id = str(dados.get("topico_id", "")).strip()
    disciplina = str(dados.get("disciplina", "")).strip().lower()
    quiz_id = str(dados.get("quiz_id", "")).strip()
    try:
        serie = int(dados.get("serie"))
        total = int(dados.get("questoes_total"))
        acertos = int(dados.get("acertos"))
    except (TypeError, ValueError):
        return jsonify({"message": "Série, total de questões e acertos devem ser números."}), 400

    if disciplina not in {"mat", "red"} or serie not in {1, 2, 3}:
        return jsonify({"message": "Disciplina ou série inválida."}), 400
    if not re.fullmatch(r"[A-Za-z0-9_-]{1,80}", quiz_id):
        return jsonify({"message": "Identificador do quiz inválido."}), 400
    if topico_id != f"{disciplina}:{serie}:{quiz_id}":
        return jsonify({"message": "Identificador do tópico inconsistente."}), 400
    if total < 1 or total > 200 or acertos < 0 or acertos > total:
        return jsonify({"message": "Quantidade de questões ou acertos inválida."}), 400

    # Não aceitar conclusão, pontuação ou XP enviados pelo navegador como prova
    # de que respondeu ao quiz. Conferir cada questão no histórico do servidor.
    from progresso_api import gabaritos as obter_gabaritos
    ids = [k for k in obter_gabaritos() if k.startswith(f"quiz:{quiz_id}:")]
    if not ids:
        return jsonify({'message':'Este quiz não possui gabarito registrado no servidor.'}),422
    percentual = round(acertos / total * 100)
    conexao = conectar()
    try:
        respostas = conexao.execute(
            "SELECT questao_id, acertou FROM historico_questoes WHERE usuario_id=? AND questao_id LIKE ? ORDER BY id DESC",
            (usuario_id, f"quiz:{quiz_id}:%"),
        ).fetchall()
        ultimo = {}
        for r in respostas:
            if r['questao_id'] not in ultimo: ultimo[r['questao_id']] = r['acertou']
        if total != len(ids) or any(id_ not in ultimo for id_ in ids):
            return jsonify({'message':'Responda todas as questões do quiz antes de concluir o tópico.'}),422
        total = len(ids)
        acertos = sum(int(ultimo[id_]) for id_ in ids)
        percentual = round(acertos/total*100)
        existente = conexao.execute(
            "SELECT 1 FROM topicos_concluidos WHERE usuario_id = ? AND topico_id = ?",
            (usuario_id, topico_id),
        ).fetchone()
        ja_concluido = existente is not None

        conexao.execute(
            """INSERT INTO topicos_concluidos
                   (usuario_id, topico_id, disciplina, serie, quiz_id,
                    questoes_total, acertos, percentual)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT(usuario_id, topico_id) DO UPDATE SET
                   disciplina = excluded.disciplina,
                   serie = excluded.serie,
                   quiz_id = excluded.quiz_id,
                   questoes_total = excluded.questoes_total,
                   acertos = excluded.acertos,
                   percentual = excluded.percentual,
                   atualizado_em = CURRENT_TIMESTAMP""",
            (usuario_id, topico_id, disciplina, serie, quiz_id, total, acertos, percentual),
        )

        # Usuários antigos podem não ter linha em progresso; cria uma antes de incrementar.
        conexao.execute(
            "INSERT OR IGNORE INTO progresso (usuario_id) VALUES (?)", (usuario_id,)
        )
        if not ja_concluido:
            conexao.execute(
                "UPDATE progresso SET aulas_concluidas = aulas_concluidas + 1, atualizado_em = CURRENT_TIMESTAMP WHERE usuario_id = ?",
                (usuario_id,),
            )
        conexao.commit()
        return jsonify({
            "ok": True,
            "topico_id": topico_id,
            "ja_concluido": ja_concluido,
            "acertos": acertos,
            "questoes_total": total,
            "percentual": percentual,
        }), 200
    except sqlite3.Error:
        conexao.rollback()
        app.logger.exception("Falha ao registrar conclusão do tópico")
        return jsonify({"message": "Não foi possível salvar a conclusão."}), 500
    finally:
        conexao.close()


# A correção Gemini reside no módulo redacao_ia_api.py, que valida citações textuais.


# --- APIs v3: perfil, presença diária e vidas ---
@app.put('/api/perfil')
def atualizar_perfil():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Entre na sua conta para editar o perfil.'}), 401
    dados = _ler_json()
    if dados is None:
        return jsonify({'message': 'Envie JSON válido.'}), 400
    nome = str(dados.get('nome', '')).strip()
    try:
        serie = int(dados.get('serie', 0))
    except (TypeError, ValueError):
        serie = 0
    vestibulares = dados.get('vests')
    if not nome or len(nome) > 120 or serie not in (1, 2, 3, 4):
        return jsonify({'message': 'Nome ou série inválidos.'}), 400
    if not isinstance(vestibulares, list) or not vestibulares:
        return jsonify({'message': 'Selecione pelo menos um vestibular.'}), 400
    vests = []
    for v in vestibulares:
        v = str(v).upper()
        if v not in VESTIBULARES_VALIDOS:
            return jsonify({'message': 'Vestibular inválido.'}), 400
        if v not in vests:
            vests.append(v)
    c = conectar()
    try:
        c.execute('UPDATE usuarios SET nome = ? WHERE id = ?', (nome, uid))
        c.execute("""INSERT INTO perfis(usuario_id, serie, vestibulares_json, dificuldade)
                     VALUES (?, ?, ?, 'ambos')
                     ON CONFLICT(usuario_id) DO UPDATE SET
                       serie=excluded.serie, vestibulares_json=excluded.vestibulares_json,
                       atualizado_em=CURRENT_TIMESTAMP""",
                  (uid, serie, json.dumps(vests, ensure_ascii=False)))
        c.commit()
    finally:
        c.close()
    return jsonify({'ok': True, **_carregar_conta(int(uid))})


@app.post('/api/atividade')
def registrar_atividade():
    """Conta um acesso por dia civil em Manaus; chamadas repetidas são idempotentes."""
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'É necessário entrar na conta.'}), 401
    hoje = datetime.now(ZoneInfo('America/Manaus')).date()
    c = conectar()
    try:
        c.execute('INSERT OR IGNORE INTO progresso (usuario_id) VALUES (?)', (uid,))
        r = c.execute('SELECT sequencia_dias, ultima_atividade FROM progresso WHERE usuario_id = ?', (uid,)).fetchone()
        ultimo = None
        if r['ultima_atividade']:
            try:
                ultimo = datetime.strptime(r['ultima_atividade'][:10], '%Y-%m-%d').date()
            except ValueError:
                pass
        sequencia = int(r['sequencia_dias'] or 0)
        if ultimo != hoje:
            sequencia = sequencia + 1 if ultimo == hoje - timedelta(days=1) else 1
            c.execute('UPDATE progresso SET sequencia_dias=?, ultima_atividade=?, atualizado_em=CURRENT_TIMESTAMP WHERE usuario_id=?',
                      (sequencia, hoje.isoformat(), uid))
        elif sequencia == 0:
            sequencia = 1
            c.execute('UPDATE progresso SET sequencia_dias=1 WHERE usuario_id=?', (uid,))
        c.commit()
        return jsonify({'sequencia': sequencia, 'ultima_atividade': hoje.isoformat()})
    finally:
        c.close()


MAX_VIDAS = 3
RECARGA_SEGUNDOS = 4 * 60 * 60

def _atualizar_vidas(c, uid):
    agora = int(time.time())
    c.execute('INSERT OR IGNORE INTO vidas (usuario_id) VALUES (?)', (uid,))
    r = c.execute('SELECT quantidade, proxima_recarga FROM vidas WHERE usuario_id=?', (uid,)).fetchone()
    qtd, prox = int(r['quantidade']), r['proxima_recarga']
    if qtd < MAX_VIDAS and prox is not None and prox <= agora:
        recuperadas = 1 + (agora - prox) // RECARGA_SEGUNDOS
        qtd = min(MAX_VIDAS, qtd + recuperadas)
        prox = None if qtd == MAX_VIDAS else prox + recuperadas * RECARGA_SEGUNDOS
        c.execute('UPDATE vidas SET quantidade=?, proxima_recarga=? WHERE usuario_id=?', (qtd, prox, uid))
    if qtd == MAX_VIDAS and prox is not None:
        prox = None
        c.execute('UPDATE vidas SET proxima_recarga=NULL WHERE usuario_id=?', (uid,))
    return qtd, prox


@app.route('/api/vidas', methods=['GET','POST'])
def vidas_api():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'É necessário entrar na conta.'}), 401
    c = conectar()
    try:
        qtd, prox = _atualizar_vidas(c, uid)
        if request.method == 'POST':
            dados = _ler_json()
            acao = (dados or {}).get('acao')
            if acao == 'perder':
                if qtd == 0:
                    c.commit()
                    return jsonify({'message': 'Você está sem vidas.', 'quantidade': qtd, 'proxima_recarga': prox}), 409
                qtd -= 1
                if prox is None:
                    prox = int(time.time()) + RECARGA_SEGUNDOS
            elif acao == 'ganhar':
                qtd = min(MAX_VIDAS, qtd + 1)
                if qtd == MAX_VIDAS:
                    prox = None
            else:
                return jsonify({'message': 'Ação inválida.'}), 400
            c.execute('UPDATE vidas SET quantidade=?, proxima_recarga=? WHERE usuario_id=?', (qtd, prox, uid))
        c.commit()
        return jsonify({'quantidade': qtd, 'maximo': MAX_VIDAS, 'proxima_recarga': prox,
                        'intervalo_recarga_segundos': RECARGA_SEGUNDOS})
    finally:
        c.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=os.environ.get("FLASK_DEBUG", "true").lower() == "true")
