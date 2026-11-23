"""Servidor Flask do voaAM: frontend estático, autenticação e APIs."""
from __future__ import annotations

import json
from hashlib import sha256
from contextlib import closing
import os
import re
import sqlite3
import time
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, make_response, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from suporte_email import notificar_chamado

from banco import conectar, inicializar_banco

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"


def versao_frontend():
    arquivos = [PUBLIC_DIR / 'index.html']
    for pasta in ('css', 'js', 'components', 'pages'):
        arquivos.extend(p for p in (PUBLIC_DIR / pasta).rglob('*') if p.is_file())
    digest = sha256()
    for arquivo in sorted(arquivos):
        digest.update(arquivo.relative_to(PUBLIC_DIR).as_posix().encode())
        digest.update(arquivo.read_bytes())
    return digest.hexdigest()[:16]


VERSAO_FRONTEND = versao_frontend()


# Fora do Docker, o mesmo .env da raiz pode ser lido pela aplicação.
# No Docker Compose, variáveis explícitas prevalecem (override=False).
try:
    from dotenv import load_dotenv
    load_dotenv(BASE_DIR / '.env', override=False)
except ImportError:
    pass

app = Flask(__name__, static_folder=str(PUBLIC_DIR), static_url_path="")
if os.environ.get('APP_ENV', '').lower() == 'production':
    chave_producao = os.environ.get('FLASK_SECRET_KEY', '')
    if len(chave_producao) < 32 or chave_producao == 'dev-only-change-this-key':
        raise RuntimeError('Produção exige FLASK_SECRET_KEY aleatória com pelo menos 32 caracteres.')

app.config.update(
    SECRET_KEY=os.environ.get("FLASK_SECRET_KEY", "dev-only-change-this-key"),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("SESSION_COOKIE_SECURE", "false").lower() == "true",
    PERMANENT_SESSION_LIFETIME=60 * 60 * 24 * 7,
    MAX_CONTENT_LENGTH=1_000_000,
    MAX_COOKIE_SIZE=3800,
    MODERAR_IMAGENS_PERFIL=os.environ.get("MODERAR_IMAGENS_PERFIL", "false").lower() == "true",
)

@app.after_request
def cabecalhos_de_seguranca(resposta):
    resposta.headers.setdefault('X-Content-Type-Options', 'nosniff')
    resposta.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
    resposta.headers.setdefault('X-Frame-Options', 'DENY')
    resposta.headers.setdefault('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    return resposta

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
from google_api import bp_google, iniciar_sessao
app.register_blueprint(bp_google)
from perfil_api import TABELAS_IMAGENS, bp_perfil, gravar_imagem_perfil, imagem_publicada, preparar_imagem_perfil
app.register_blueprint(bp_perfil)
from redacao_gratis_api import bp_redacao_gratis
app.register_blueprint(bp_redacao_gratis)
from redacao_ia_api import bp_redacao_ia
app.register_blueprint(bp_redacao_ia)
from fila_redacao import bp_fila_redacao
app.register_blueprint(bp_fila_redacao)

@app.before_request
def validar_sessao():
    uid = session.get('usuario_id')
    if not uid or not request.path.startswith('/api/'):
        return
    c = conectar()
    try:
        conta = c.execute('SELECT ativo,sessao_versao FROM usuarios WHERE id=?', (uid,)).fetchone()
    finally:
        c.close()
    if conta and conta['ativo'] and conta['sessao_versao'] == session.get('sessao_versao', 0):
        return
    session.clear()
    if request.endpoint not in ('sessao_atual', 'realizar_cadastro', 'realizar_login',
                                 'google.entrar_google', 'google.desafio_google', 'google.config_publica'):
        return jsonify({'message': 'Sessão encerrada. Entre novamente.'}), 401


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
        "banner": linha["banner_tema"] or "oceano",
        "banner_modo": linha["banner_modo"] if linha["estado_banner"] else "padrao",
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
                   p.serie, p.vestibulares_json, p.dificuldade, p.banner_tema, p.banner_modo, g.google_sub, g.email_google,
                   f.moderacao AS estado_foto, f.versao AS foto_versao,
                   b.moderacao AS estado_banner, b.versao AS banner_versao
              FROM usuarios AS u
              LEFT JOIN perfis AS p ON p.usuario_id = u.id
              LEFT JOIN google_identidades AS g ON g.usuario_id = u.id
              LEFT JOIN fotos_perfil AS f ON f.usuario_id = u.id
              LEFT JOIN banners_perfil AS b ON b.usuario_id = u.id
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
                "tem_foto": bool(linha["estado_foto"]),
                "estado_foto": "aprovada" if imagem_publicada(linha["estado_foto"]) else linha["estado_foto"],
                "foto_versao": linha["foto_versao"],
                "tem_banner": bool(linha["estado_banner"]),
                "estado_banner": "aprovada" if imagem_publicada(linha["estado_banner"]) else linha["estado_banner"],
                "banner_versao": linha["banner_versao"],
                "google": {"conectado": bool(linha["google_sub"]), "email": linha["email_google"]},
            },
            "perfil": _perfil_publico(linha),
        }
    finally:
        conexao.close()


@app.get("/")
@app.get("/index.html")
def inicio():
    """O HTML inicial aponta para uma única versão de fragmentos, scripts e estilos."""
    html = (PUBLIC_DIR / 'index.html').read_text(encoding='utf-8')
    resposta = make_response(html.replace('__VOAAM_FRONTEND__', VERSAO_FRONTEND))
    resposta.headers['Cache-Control'] = 'no-store'
    return resposta


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
    # Compatível com clientes antigos, valida confirmação quando enviada.
    if 'confirmar_senha' in dados and dados['confirmar_senha'] != senha:
        return jsonify({'message': 'As senhas não conferem.'}), 400

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

    iniciar_sessao(usuario_id, 0)
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
            "SELECT id, senha_hash, ativo, sessao_versao FROM usuarios WHERE email = ?", (email,)
        ).fetchone()
    finally:
        conexao.close()

    if usuario is None or not check_password_hash(usuario["senha_hash"], senha):
        return jsonify({"message": "E-mail ou senha incorretos."}), 401
    if usuario["ativo"] != 1:
        return jsonify({"message": "Esta conta está desativada."}), 403

    iniciar_sessao(usuario["id"], usuario["sessao_versao"])
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

    aviso_google = session.pop('boas_vindas_google', None)
    resposta = jsonify({"autenticado": True, **conta,
                       "boas_vindas_google": aviso_google})
    resposta.headers["Cache-Control"] = "private, no-store"
    return resposta, 200


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
    multipart = request.mimetype == 'multipart/form-data'
    if multipart:
        request.max_content_length = 2_000_000
        try:
            dados = json.loads(request.form.get('dados', ''))
        except ValueError:
            dados = None
    else:
        dados = _ler_json()
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie dados de perfil válidos.'}), 400
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
    banner = str(dados.get('banner', 'oceano'))
    if banner not in ('oceano', 'aurora', 'floresta', 'noite'):
        return jsonify({'message': 'Banner inválido.'}), 400
    modo = dados.get('banner_modo')
    if 'banner_modo' in dados and modo not in ('padrao', 'personalizado'):
        return jsonify({'message': 'Escolha um tipo de banner válido.'}), 400
    imagens = {}
    if multipart:
        for tipo in TABELAS_IMAGENS:
            arquivo = request.files.get(tipo)
            if arquivo:
                try:
                    imagens[tipo] = preparar_imagem_perfil(arquivo, tipo)
                except ValueError as erro:
                    return jsonify({'message': f'{tipo.capitalize()}: {erro}'}), 400
            elif request.form.get(f'remover_{tipo}') == '1':
                imagens[tipo] = None
    c = conectar()
    try:
        c.execute('BEGIN IMMEDIATE')
        if 'banner' in imagens and imagens['banner'] is None:
            modo = 'padrao'
        elif modo is None and 'banner' in imagens:
            modo = 'personalizado'
        if modo == 'personalizado' and 'banner' not in imagens and not c.execute(
            'SELECT 1 FROM banners_perfil WHERE usuario_id=?', (uid,),
        ).fetchone():
            return jsonify({'message': 'Escolha uma imagem para o banner personalizado.'}), 400
        c.execute('UPDATE usuarios SET nome = ? WHERE id = ?', (nome, uid))
        c.execute("""INSERT INTO perfis(usuario_id, serie, vestibulares_json, dificuldade, banner_tema)
                     VALUES (?, ?, ?, 'ambos', ?)
                     ON CONFLICT(usuario_id) DO UPDATE SET
                       serie=excluded.serie, vestibulares_json=excluded.vestibulares_json,
                       banner_tema=excluded.banner_tema, atualizado_em=CURRENT_TIMESTAMP""",
                  (uid, serie, json.dumps(vests, ensure_ascii=False), banner))
        if modo is not None:
            c.execute('UPDATE perfis SET banner_modo=? WHERE usuario_id=?', (modo, uid))
        imagens_salvas = {
            tipo: gravar_imagem_perfil(c, uid, tipo, imagem)
            for tipo, imagem in imagens.items()
        }
        c.commit()
    finally:
        c.close()
    return jsonify({'ok': True, 'imagens_salvas': imagens_salvas, **_carregar_conta(int(uid))})


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




@app.route('/api/preferencias', methods=['GET', 'POST'])
def preferencias_estudo():
    """Primeiro acesso: escolha de disciplina com dados reais do catálogo."""
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    from treino_api import catalogo
    from collections import Counter
    materias = Counter(q.get('disciplina') or 'Outras' for q in catalogo())
    valores = ['Todas'] + sorted(materias, key=lambda s: s.casefold())
    with closing(conectar()) as c, c:
        if request.method == 'POST':
            dados = _ler_json()
            materia = dados.get('disciplina') if dados else None
            if not isinstance(materia, str) or materia not in valores:
                return jsonify({'message': 'Selecione uma disciplina disponível.'}), 400
            c.execute("""INSERT INTO preferencias_inicio(usuario_id,disciplina) VALUES(?,?)
                         ON CONFLICT(usuario_id) DO UPDATE SET disciplina=excluded.disciplina,
                         configurada_em=CURRENT_TIMESTAMP""", (uid, materia))
        preferencia = c.execute('SELECT disciplina FROM preferencias_inicio WHERE usuario_id=?', (uid,)).fetchone()
    recomendacoes = [{'disciplina': nome, 'questoes': total}
                    for nome, total in sorted(materias.items(), key=lambda item: (-item[1], item[0]))]
    return jsonify({'configurado': bool(preferencia),
                    'disciplina': preferencia['disciplina'] if preferencia else 'Todas',
                    'opcoes': valores, 'recomendacoes': recomendacoes})


@app.post('/api/suporte')
def abrir_chamado_suporte():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    dados = _ler_json() or {}
    assunto = str(dados.get('assunto') or '').strip()
    mensagem = str(dados.get('mensagem') or '').strip()
    if not 5 <= len(assunto) <= 100 or not 15 <= len(mensagem) <= 2000:
        return jsonify({'message': 'Assunto de 5–100 caracteres e descrição de 15–2.000.'}), 400
    # Evita spam por contas autenticadas sem impedir o uso normal do suporte.
    with closing(conectar()) as c, c:
        recentes = c.execute('''SELECT COUNT(*) AS quantidade FROM pedidos_suporte
                                 WHERE usuario_id=? AND criado_em >= datetime('now','-1 hour')''', (uid,)).fetchone()
        if recentes['quantidade'] >= 5:
            return jsonify({'message': 'Limite de cinco chamados por hora. Tente novamente depois.'}), 429
        usuario = c.execute('SELECT nome,email FROM usuarios WHERE id=?', (uid,)).fetchone()
        cursor = c.execute('INSERT INTO pedidos_suporte(usuario_id, assunto, mensagem) VALUES(?,?,?)',
                           (uid, assunto, mensagem))
        protocolo = cursor.lastrowid

    notificacao = 'pendente'
    if usuario:
        try:
            if notificar_chamado(protocolo, usuario['nome'], usuario['email'], assunto, mensagem):
                with closing(conectar()) as c, c:
                    c.execute('UPDATE pedidos_suporte SET notificado_em=CURRENT_TIMESTAMP WHERE id=?', (protocolo,))
                notificacao = 'enviada'
        except Exception:
            # A falha de e-mail nunca apaga um chamado salvo. Sem incluir credenciais nos logs.
            app.logger.warning('E-mail do chamado %s não enviado; permanece pendente.', protocolo)
    return jsonify({'ok': True, 'protocolo': protocolo, 'notificacao': notificacao,
                    'message': 'Solicitação registrada. Guarde o número do protocolo.'}), 201



@app.get('/api/admin/suporte')
def listar_chamados_admin():
    uid = session.get('usuario_id')
    with closing(conectar()) as c:
        admin = c.execute("SELECT 1 FROM usuarios WHERE id=? AND ativo=1 AND tipo='ADMIN'", (uid,)).fetchone()
        if not admin:
            return jsonify({'message': 'Acesso restrito.'}), 403
        tickets = c.execute("""SELECT s.id, s.assunto, s.mensagem, s.criado_em, s.notificado_em, u.nome, u.email
                              FROM pedidos_suporte s JOIN usuarios u ON u.id=s.usuario_id
                              ORDER BY s.id DESC LIMIT 100""").fetchall()
    resposta = jsonify({'chamados': [dict(t) for t in tickets]})
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta

@app.cli.group('suporte')
def suporte_cli():
    """Manutenção administrativa de chamados do suporte."""


@suporte_cli.command('reenviar')
def reenviar_notificacoes_suporte():
    """Reenvia, sob demanda, até 50 chamados sem e-mail confirmado."""
    with closing(conectar()) as c:
        pendentes = c.execute("""SELECT s.id, s.assunto, s.mensagem, u.nome, u.email
            FROM pedidos_suporte s JOIN usuarios u ON u.id=s.usuario_id
            WHERE s.notificado_em IS NULL ORDER BY s.id ASC LIMIT 50""").fetchall()
    enviados = 0
    for chamado in pendentes:
        try:
            if not notificar_chamado(chamado['id'], chamado['nome'], chamado['email'],
                                    chamado['assunto'], chamado['mensagem']):
                break  # Sem integração configurada; não adianta tentar os demais.
            with closing(conectar()) as c, c:
                c.execute('UPDATE pedidos_suporte SET notificado_em=CURRENT_TIMESTAMP WHERE id=?', (chamado['id'],))
            enviados += 1
        except Exception:
            app.logger.warning('Notificação pendente para o chamado %s', chamado['id'])
    print(f'{enviados} notificação(ões) confirmada(s); {len(pendentes) - enviados} pendente(s) nesta execução.')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=os.environ.get("FLASK_DEBUG", "false").lower() == "true")
