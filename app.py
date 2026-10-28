"""Servidor Flask do voaAM: frontend estático, autenticação e APIs."""
from __future__ import annotations

import json
import os
import re
import sqlite3
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from banco import conectar, inicializar_banco

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"

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


@app.post("/api/corrigir-redacao")
def corrigir_redacao():
    """Migração da API Gemini antiga para Flask; requer sessão e chave no servidor."""
    if not session.get("usuario_id"):
        return jsonify({"resultado": "Faça login para corrigir a redação."}), 401

    dados = _ler_json()
    if dados is None:
        return jsonify({"resultado": "Envie tema e texto em formato JSON."}), 400

    tema = dados.get("tema")
    texto = dados.get("texto")
    if not isinstance(tema, str) or not tema.strip():
        return jsonify({"resultado": "Erro: tema inválido ou ausente."}), 400
    if not isinstance(texto, str) or len(texto.strip()) < 50:
        return jsonify({"resultado": "Erro: texto muito curto. Mínimo de 50 caracteres."}), 400
    if len(texto) > 10_000:
        return jsonify({"resultado": "Erro: texto muito longo. Máximo de 10.000 caracteres."}), 400

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        return jsonify({"resultado": "A correção por IA ainda não está configurada. Defina GEMINI_API_KEY no arquivo .env do servidor."}), 503

    prompt = f"""Você é um corretor profissional de redações ENEM.

Tema:
{tema.strip()}

Redação:
{texto.strip()}

Faça uma correção estruturada com:
- Nota geral (0 a 1000)
- Avaliação por competência (1 a 5):
  - Competência 1: Domínio da língua escrita
  - Competência 2: Compreensão da proposta
  - Competência 3: Argumentação
  - Competência 4: Coesão textual
  - Competência 5: Proposta de intervenção
- Principais erros gramaticais
- Análise de coerência e coesão
- Sugestões de melhoria
- Avaliação da proposta de intervenção"""

    try:
        from google import genai

        with genai.Client(api_key=api_key) as cliente:
            resposta = cliente.models.generate_content(
                model=os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
                contents=prompt,
            )
        resultado = getattr(resposta, "text", None)
        if not resultado:
            return jsonify({"resultado": "A IA não retornou um texto de correção. Tente novamente."}), 502
        return jsonify({"resultado": resultado}), 200
    except Exception:
        app.logger.exception("Erro ao corrigir redação com Gemini")
        return jsonify({"resultado": "Erro ao corrigir a redação. Verifique a configuração da API e tente novamente."}), 502


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=os.environ.get("FLASK_DEBUG", "true").lower() == "true")
