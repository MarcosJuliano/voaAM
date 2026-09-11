from flask import Flask, render_template, send_from_directory, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
import os

from banco import conectar, inicializar_banco


app = Flask(__name__, static_folder=None)

# Chave usada para controlar a sessão do usuário
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "chave-secreta-do-projeto")


# =========================================================
# INICIALIZAR BANCO DE DADOS
# =========================================================

inicializar_banco()


# =========================================================
# PÁGINAS
# =========================================================

@app.route("/")
def login():
    return render_template("login.html")


@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")


@app.route("/esqueci-senha")
def esqueci_senha():
    return render_template("esqueci-senha.html")


@app.route("/dashboard")
def dashboard():

    if "usuario_id" not in session:
        return render_template("login.html")

    return render_template("dashboard.html")


# =========================================================
# API - CADASTRO
# =========================================================

@app.route("/api/cadastro", methods=["POST"])
def realizar_cadastro():

    dados = request.get_json()

    if not dados:
        return jsonify({
            "message": "Dados de cadastro não foram enviados."
        }), 400

    nome = dados.get("nome", "").strip()
    email = dados.get("email", "").strip().lower()
    senha = dados.get("senha", "")

    # Verificar se todos os campos foram preenchidos
    if not nome or not email or not senha:
        return jsonify({
            "message": "Preencha todos os campos."
        }), 400

    # Criar hash seguro da senha
    senha_hash = generate_password_hash(senha)

    conexao = conectar()

    try:

        conexao.execute(
            """
            INSERT INTO usuarios (
                nome,
                email,
                senha_hash
            )
            VALUES (?, ?, ?)
            """,
            (
                nome,
                email,
                senha_hash
            )
        )

        conexao.commit()

    except Exception as erro:

        conexao.close()

        print("Erro no cadastro:", erro)

        # E-mail já cadastrado
        if "UNIQUE constraint failed" in str(erro):

            return jsonify({
                "message": "Este e-mail já está cadastrado."
            }), 409

        return jsonify({
            "message": "Não foi possível realizar o cadastro."
        }), 500

    conexao.close()

    return jsonify({
        "message": "Cadastro realizado com sucesso!"
    }), 201


# =========================================================
# API - LOGIN
# =========================================================

@app.route("/api/login", methods=["POST"])
def realizar_login():

    dados = request.get_json()

    if not dados:
        return jsonify({
            "message": "Dados de login não foram enviados."
        }), 400

    email = dados.get("emailOrInscricao", "").strip().lower()
    senha = dados.get("senha", "")

    if not email or not senha:
        return jsonify({
            "message": "Preencha o e-mail e a senha."
        }), 400

    conexao = conectar()

    usuario = conexao.execute(
        """
        SELECT
            id,
            nome,
            email,
            senha_hash,
            tipo,
            ativo
        FROM usuarios
        WHERE email = ?
        """,
        (email,)
    ).fetchone()

    conexao.close()

    # Usuário não encontrado
    if usuario is None:

        return jsonify({
            "message": "E-mail ou senha incorretos."
        }), 401

    # Usuário desativado
    if usuario["ativo"] != 1:

        return jsonify({
            "message": "Este usuário está desativado."
        }), 403

    # Verificar senha
    if not check_password_hash(
        usuario["senha_hash"],
        senha
    ):

        return jsonify({
            "message": "E-mail ou senha incorretos."
        }), 401

    # Criar sessão
    session["usuario_id"] = usuario["id"]
    session["usuario_nome"] = usuario["nome"]
    session["usuario_tipo"] = usuario["tipo"]

    return jsonify({
        "message": "Login realizado com sucesso!",
        "redirectUrl": "/dashboard"
    }), 200


# =========================================================
# LOGOUT
# =========================================================

@app.route("/api/logout", methods=["POST"])
def logout():

    session.clear()

    return jsonify({
        "message": "Logout realizado com sucesso.",
        "redirectUrl": "/"
    })


# =========================================================
# ARQUIVOS CSS
# =========================================================

@app.route("/css/<path:filename>")
def css_files(filename):

    return send_from_directory(
        os.path.join(app.root_path, "css"),
        filename
    )


# =========================================================
# ARQUIVOS JAVASCRIPT
# =========================================================

@app.route("/js/<path:filename>")
def js_files(filename):

    return send_from_directory(
        os.path.join(app.root_path, "js"),
        filename
    )


# =========================================================
# IMAGENS
# =========================================================

@app.route("/img/<path:filename>")
def img_files(filename):

    return send_from_directory(
        os.path.join(app.root_path, "img"),
        filename
    )


# =========================================================
# INICIAR SERVIDOR
# =========================================================

if __name__ == "__main__":

    app.run(debug=True)

    