"""Google Identity Services: OAuth2/OIDC sem serviço de autenticação de terceiros pago.

Evita sequestro de conta: emails já cadastrados não são vinculados automaticamente.
"""
import os, secrets, sqlite3
from flask import Blueprint, jsonify, request, session
from werkzeug.security import generate_password_hash
from banco import conectar

bp_google = Blueprint('google', __name__)

@bp_google.get('/api/config-publica')
def config_publica():
    return jsonify({'google_client_id':os.getenv('GOOGLE_CLIENT_ID','').strip(),
                    'ia_configurada':bool(os.getenv('GEMINI_API_KEY','').strip()) and os.getenv('ATIVAR_GEMINI','false').lower()=='true'})

@bp_google.post('/api/auth/google')
def entrar_google():
    client_id=os.getenv('GOOGLE_CLIENT_ID','').strip()
    if not client_id:return jsonify({'message':'Google Login não configurado no servidor.'}),503
    dados=request.get_json(silent=True)
    token=dados.get('credential') if isinstance(dados,dict) else None
    if not isinstance(token,str) or not (100<=len(token)<=10000):return jsonify({'message':'Credencial inválida.'}),400
    try:
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests
        claims=id_token.verify_oauth2_token(token,google_requests.Request(),client_id)
        sub=claims['sub'];email=claims.get('email','').strip().lower()
        if claims.get('email_verified') is not True or not email:
            return jsonify({'message':'A Conta Google precisa ter e-mail verificado.'}),403
    except (ValueError,KeyError,ImportError):
        return jsonify({'message':'Não foi possível validar o login Google.'}),401
    # Nunca aceitar associação só pelo email; exige vinculação autenticada.
    c=conectar()
    try:
        row=c.execute('''SELECT u.id,u.ativo FROM google_identidades AS g
                         JOIN usuarios AS u ON u.id=g.usuario_id WHERE g.google_sub=?''',(sub,)).fetchone()
        if row:
            if row['ativo']!=1:return jsonify({'message':'Conta desativada.'}),403
            uid=row['id']
        else:
            if c.execute('SELECT id FROM usuarios WHERE email=?',(email,)).fetchone():
                return jsonify({'message':'Já existe uma conta com esse e-mail. Entre com sua senha para vinculá-la futuramente.'}),409
            nome=str(claims.get('name') or email.split('@')[0]).strip()[:120]
            cursor=c.execute('INSERT INTO usuarios(nome,email,senha_hash) VALUES(?,?,?)',
                             (nome,email,generate_password_hash(secrets.token_urlsafe(48))))
            uid=cursor.lastrowid
            c.execute("INSERT INTO perfis(usuario_id,serie,vestibulares_json,dificuldade) VALUES(?,3, '[\"ENEM\"]','ambos')",(uid,))
            c.execute('INSERT INTO progresso(usuario_id) VALUES(?)',(uid,))
            c.execute('INSERT INTO google_identidades(google_sub,usuario_id) VALUES(?,?)',(sub,uid))
        c.commit()
    except sqlite3.Error:
        c.rollback();return jsonify({'message':'Não foi possível criar ou acessar a conta.'}),500
    finally:c.close()
    session.clear();session['usuario_id']=uid;session.permanent=True
    return jsonify({'autenticado':True,'message':'Login Google realizado.'})

@bp_google.post('/api/auth/google/vincular')
def vincular_google():
    uid=session.get('usuario_id')
    if not uid:return jsonify({'message':'Entre com e-mail e senha antes de vincular o Google.'}),401
    client_id=os.getenv('GOOGLE_CLIENT_ID','').strip()
    d=request.get_json(silent=True)
    token=d.get('credential') if isinstance(d,dict) else None
    if not client_id or not isinstance(token,str) or not 100<=len(token)<=10000:
        return jsonify({'message':'Integração Google não configurada ou credencial inválida.'}),400
    try:
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests
        claims=id_token.verify_oauth2_token(token,google_requests.Request(),client_id)
        if claims.get('email_verified') is not True:
            return jsonify({'message':'O e-mail do Google não está verificado.'}),403
        sub=claims['sub'];email=str(claims['email']).lower()
    except (ValueError,KeyError,ImportError):
        return jsonify({'message':'Token Google inválido.'}),401
    c=conectar()
    try:
        usuario=c.execute('SELECT email FROM usuarios WHERE id=?',(uid,)).fetchone()
        if not usuario or usuario['email'].lower()!=email:
            return jsonify({'message':'O e-mail Google deve ser igual ao e-mail da sua conta voaAM.'}),409
        conta=c.execute('SELECT usuario_id FROM google_identidades WHERE google_sub=?',(sub,)).fetchone()
        if conta and conta['usuario_id']!=uid:
            return jsonify({'message':'Essa Conta Google pertence a outro usuário.'}),409
        outro=c.execute('SELECT google_sub FROM google_identidades WHERE usuario_id=?',(uid,)).fetchone()
        if outro and outro['google_sub']!=sub:
            return jsonify({'message':'Esta conta voaAM já possui outra Conta Google vinculada.'}),409
        c.execute('INSERT OR IGNORE INTO google_identidades(google_sub,usuario_id) VALUES(?,?)',(sub,uid));c.commit()
        return jsonify({'ok':True,'message':'Conta Google vinculada com sucesso.'})
    finally:c.close()
