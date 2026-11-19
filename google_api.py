"""Login e gerenciamento de identidades do Google por conta voaAM."""
import os
import re
import secrets
import time
from contextlib import closing

from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from banco import conectar

bp_google = Blueprint('google', __name__)
_CLIENT_RE = re.compile(r'^\d+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$')


def google_client_id_configurado():
    client_id = os.getenv('GOOGLE_CLIENT_ID', '').strip()
    return client_id if _CLIENT_RE.fullmatch(client_id) else ''


@bp_google.get('/api/config-publica')
def config_publica():
    from redacao_ia_api import gemini_motivo_indisponivel, provedores_disponiveis

    valor = os.getenv('GOOGLE_CLIENT_ID', '').strip()
    valido = google_client_id_configurado()
    provedores = provedores_disponiveis()
    return jsonify({
        'google_client_id': valido,
        'google_configurado': bool(valido),
        'google_mensagem': (
            '' if valido else
            ('GOOGLE_CLIENT_ID inválido ou é um exemplo. Crie um OAuth Client ID do tipo Web application.'
             if valor else 'GOOGLE_CLIENT_ID não configurado no ambiente do Flask.')
        ),
        'ia_configurada': 'gemini' in provedores,
        'gemini_redacao_mensagem': gemini_motivo_indisponivel(),
        'provedores_redacao': provedores,
    })


class ErroGoogle(Exception):
    def __init__(self, mensagem, status):
        super().__init__(mensagem)
        self.status = status

    def resposta(self):
        return jsonify({'message': str(self)}), self.status


@bp_google.post('/api/auth/google/desafio')
def desafio_google():
    if not google_client_id_configurado():
        return jsonify({'message': 'Login Google indisponível no servidor.'}), 503
    dados = request.get_json(silent=True)
    finalidade = dados.get('finalidade') if isinstance(dados, dict) else None
    if finalidade not in ('acesso', 'vinculo', 'confirmacao'):
        return jsonify({'message': 'Finalidade inválida.'}), 400
    if finalidade != 'acesso' and not session.get('usuario_id'):
        return jsonify({'message': 'Entre na sua conta voaAM.'}), 401
    nonce = secrets.token_urlsafe(32)
    session['google_desafio'] = [finalidade, nonce, int(time.time()) + 900]
    resposta = jsonify({'nonce': nonce})
    resposta.headers['Cache-Control'] = 'no-store'
    return resposta


def identidade_google(token, finalidade):
    client_id = google_client_id_configurado()
    if not client_id:
        raise ErroGoogle('Login Google indisponível no servidor.', 503)
    if not isinstance(token, str) or not 100 <= len(token) <= 10000:
        raise ErroGoogle('Credencial Google inválida.', 400)
    desafio = session.get('google_desafio')
    if not desafio or desafio[0] != finalidade or desafio[2] < time.time():
        raise ErroGoogle('A confirmação expirou. Abra o seletor do Google novamente.', 401)
    try:
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests
        claims = id_token.verify_oauth2_token(token, google_requests.Request(), client_id)
        sub = claims['sub']
        email = claims['email'].strip().lower()
        nonce = claims.get('nonce')
        if not isinstance(nonce, str) or not secrets.compare_digest(nonce.encode(), desafio[1].encode()):
            raise ValueError('Nonce incompatível.')
        if not isinstance(sub, str) or not sub:
            raise ValueError('Identificador inválido.')
    except (ValueError, KeyError, TypeError, AttributeError):
        raise ErroGoogle('Credencial Google inválida ou expirada. Tente novamente.', 401) from None
    except Exception:
        raise ErroGoogle('Google indisponível para verificação. Tente novamente.', 503) from None
    if claims.get('email_verified') is not True or not email:
        raise ErroGoogle('A Conta Google precisa ter e-mail verificado.', 403)
    session.pop('google_desafio', None)
    return sub, email, claims.get('name')


def iniciar_sessao(uid, versao):
    session.clear()
    session['usuario_id'] = uid
    session['sessao_versao'] = versao
    session.permanent = True


@bp_google.post('/api/auth/google')
def entrar_google():
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie a credencial em JSON.'}), 400
    try:
        sub, email, nome_google = identidade_google(dados.get('credential'), 'acesso')
    except ErroGoogle as erro:
        return erro.resposta()

    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        row = c.execute(
            """SELECT u.id, u.ativo, u.sessao_versao FROM google_identidades g
               JOIN usuarios u ON u.id=g.usuario_id WHERE g.google_sub=?""", (sub,),
        ).fetchone()
        if row:
            if not row['ativo']:
                return jsonify({'message': 'Conta voaAM desativada.'}), 403
            uid, versao = row['id'], row['sessao_versao']
        else:
            if c.execute('SELECT 1 FROM usuarios WHERE email=?', (email,)).fetchone():
                return jsonify({'message': 'Já existe um perfil com esse e-mail. Entre com sua senha e conecte o Google no Perfil.'}), 409
            if dados.get('cadastrar') is not True:
                return jsonify({'message': 'Essa Conta Google não está vinculada. Use Criar conta para se cadastrar ou conecte-a no Perfil.'}), 404
            nome = str(nome_google or '').strip()[:120] or email.split('@')[0][:120]
            cursor = c.execute(
                'INSERT INTO usuarios(nome,email,senha_hash) VALUES(?,?,?)',
                (nome, email, generate_password_hash(secrets.token_urlsafe(48))),
            )
            uid, versao = cursor.lastrowid, 0
            c.execute("INSERT INTO perfis(usuario_id,vestibulares_json) VALUES(?,?)", (uid, '["ENEM"]'))
            c.execute('INSERT INTO progresso(usuario_id) VALUES(?)', (uid,))
            c.execute(
                'INSERT INTO google_identidades(google_sub,usuario_id,email_google) VALUES(?,?,?)',
                (sub, uid, email),
            )
        # Atualiza o endereço exibido também para vínculos anteriores à migração.
        c.execute('UPDATE google_identidades SET email_google=? WHERE google_sub=?', (email, sub))
    iniciar_sessao(uid, versao)
    session['boas_vindas_google'] = 'Bem-vindo ao voaAM!' if dados.get('cadastrar') else 'Bem-vindo de volta ao voaAM!'
    return jsonify({'autenticado': True})


@bp_google.post('/api/auth/google/vincular')
def vincular_google():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Entre na sua conta voaAM.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie os dados em JSON.'}), 400
    senha = dados.get('senha')
    with closing(conectar()) as c:
        usuario = c.execute('SELECT senha_hash FROM usuarios WHERE id=? AND ativo=1', (uid,)).fetchone()
    if not usuario or not senha_confere(usuario['senha_hash'], senha):
        return jsonify({'message': 'Confirme a senha do seu perfil voaAM para conectar o Google.'}), 403
    try:
        sub, email, _ = identidade_google(dados.get('credential'), 'vinculo')
    except ErroGoogle as erro:
        return erro.resposta()

    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        atual = conta_para_alterar(c, uid)
        if not atual or atual['senha_hash'] != usuario['senha_hash']:
            return jsonify({'message': 'Entre novamente na sua conta.'}), 401
        if atual['google_sub']:
            return jsonify({'message': 'Seu perfil já tem uma Conta Google conectada.'}), 409
        if c.execute('SELECT 1 FROM google_identidades WHERE google_sub=?', (sub,)).fetchone():
            return jsonify({'message': 'Essa Conta Google já está vinculada a outro perfil voaAM.'}), 409
        outro_email = c.execute('SELECT 1 FROM usuarios WHERE email=? AND id<>?', (email, uid)).fetchone()
        if outro_email:
            return jsonify({'message': 'O e-mail dessa Conta Google já pertence a outro perfil voaAM.'}), 409
        c.execute(
            'INSERT INTO google_identidades(google_sub,usuario_id,email_google) VALUES(?,?,?)',
            (sub, uid, email),
        )
    return jsonify({'ok': True, 'google': {'conectado': True, 'email': email}})


def senha_confere(senha_hash, senha):
    return isinstance(senha, str) and 1 <= len(senha) <= 256 and check_password_hash(senha_hash, senha)


def conta_para_alterar(c, uid):
    return c.execute(
        """SELECT u.senha_hash, u.sessao_versao, g.google_sub FROM usuarios u
           LEFT JOIN google_identidades g ON g.usuario_id=u.id
           WHERE u.id=? AND u.ativo=1 AND u.sessao_versao=?""",
        (uid, session.get('sessao_versao', 0)),
    ).fetchone()


@bp_google.delete('/api/auth/google/vincular')
@bp_google.delete('/api/perfil')
def remover_acesso():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Entre na sua conta voaAM.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Confirme sua identidade para continuar.'}), 400
    excluir = request.path == '/api/perfil'
    credencial = dados.get('credential')
    novo_hash = None
    sub = None
    if credencial:
        senha_nova = dados.get('nova_senha')
        if not excluir and (not isinstance(senha_nova, str) or not 8 <= len(senha_nova) <= 256):
            return jsonify({'message': 'Defina uma senha de pelo menos 8 caracteres para continuar acessando o voaAM.'}), 400
        try:
            sub, _, _ = identidade_google(credencial, 'confirmacao')
        except ErroGoogle as erro:
            return erro.resposta()
        if not excluir:
            novo_hash = generate_password_hash(senha_nova)

    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        conta = conta_para_alterar(c, uid)
        if not conta:
            return jsonify({'message': 'Entre novamente na sua conta.'}), 401
        if sub is not None:
            if sub != conta['google_sub']:
                return jsonify({'message': 'Confirme usando a Conta Google conectada ao seu perfil.'}), 403
        elif not senha_confere(conta['senha_hash'], dados.get('senha')):
            return jsonify({'message': 'Senha incorreta. Confira a senha do voaAM.'}), 403

        if excluir:
            c.execute('DELETE FROM usuarios WHERE id=?', (uid,))
        else:
            if not conta['google_sub']:
                return jsonify({'message': 'O perfil já está desconectado do Google.'}), 409
            c.execute('DELETE FROM google_identidades WHERE usuario_id=?', (uid,))
            versao = conta['sessao_versao'] + 1
            c.execute(
                'UPDATE usuarios SET sessao_versao=?, senha_hash=COALESCE(?,senha_hash) WHERE id=?',
                (versao, novo_hash, uid),
            )
    if excluir:
        session.clear()
    else:
        iniciar_sessao(uid, versao)
    return '', 204
