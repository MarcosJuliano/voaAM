"""Configurações privadas de acesso e foto de perfil."""
from contextlib import closing
from io import BytesIO

from flask import Blueprint, jsonify, request, send_file, session
from PIL import Image, ImageOps, UnidentifiedImageError
from werkzeug.security import generate_password_hash

from banco import conectar
from google_api import ErroGoogle, conta_para_alterar, identidade_google, iniciar_sessao, senha_confere

bp_perfil = Blueprint('config_perfil', __name__)


@bp_perfil.put('/api/perfil/senha')
def alterar_senha():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Entre na sua conta.'}), 401
    dados = request.get_json(silent=True)
    nova = dados.get('nova_senha') if isinstance(dados, dict) else None
    if not isinstance(nova, str) or not 8 <= len(nova) <= 256:
        return jsonify({'message': 'Use uma nova senha de 8 a 256 caracteres.'}), 400
    credencial = dados.get('credential')
    sub = None
    if credencial:
        try:
            sub, _, _ = identidade_google(credencial, 'confirmacao')
        except ErroGoogle as erro:
            return erro.resposta()

    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        conta = conta_para_alterar(c, uid)
        if not conta:
            return jsonify({'message': 'Entre novamente na sua conta.'}), 401
        if sub is not None:
            if sub != conta['google_sub']:
                return jsonify({'message': 'Confirme com a Conta Google conectada ao perfil.'}), 403
        elif not senha_confere(conta['senha_hash'], dados.get('senha')):
            return jsonify({'message': 'Senha atual incorreta.'}), 403
        versao = conta['sessao_versao'] + 1
        c.execute('UPDATE usuarios SET senha_hash=?, sessao_versao=? WHERE id=?',
                  (generate_password_hash(nova), versao, uid))
    iniciar_sessao(uid, versao)
    return '', 204


@bp_perfil.route('/api/perfil/foto', methods=['GET', 'PUT', 'DELETE'])
def foto_perfil():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Entre na sua conta.'}), 401
    if request.method == 'PUT':
        arquivo = request.files.get('foto')
        if not arquivo:
            return jsonify({'message': 'Escolha uma imagem JPEG, PNG ou WebP.'}), 400
        try:
            with Image.open(arquivo.stream, formats=('JPEG', 'PNG', 'WEBP')) as imagem:
                if imagem.width * imagem.height > 12_000_000:
                    return jsonify({'message': 'Use uma imagem com até 12 megapixels.'}), 400
                recortada = ImageOps.fit(ImageOps.exif_transpose(imagem).convert('RGB'), (320, 320))
                saida = BytesIO()
                recortada.save(saida, format='JPEG', quality=85)
        except (UnidentifiedImageError, Image.DecompressionBombError, OSError, ValueError):
            return jsonify({'message': 'Não foi possível ler a imagem. Use JPEG, PNG ou WebP.'}), 400
        with closing(conectar()) as c, c:
            c.execute('INSERT OR REPLACE INTO fotos_perfil (usuario_id, imagem) VALUES (?, ?)',
                      (uid, saida.getvalue()))
        return '', 204
    with closing(conectar()) as c, c:
        if request.method == 'DELETE':
            c.execute('DELETE FROM fotos_perfil WHERE usuario_id=?', (uid,))
            return '', 204
        foto = c.execute('SELECT imagem FROM fotos_perfil WHERE usuario_id=?', (uid,)).fetchone()
    if foto is None:
        return '', 404
    return responder_foto(foto['imagem'])


def responder_foto(imagem):
    resposta = send_file(BytesIO(imagem), mimetype='image/jpeg')
    resposta.headers['Cache-Control'] = 'private, no-store'
    resposta.headers['X-Content-Type-Options'] = 'nosniff'
    return resposta
