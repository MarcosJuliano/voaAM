"""Configurações privadas de acesso e foto de perfil."""
from contextlib import closing
from io import BytesIO
from hashlib import sha256

import click
from flask import Blueprint, current_app, jsonify, request, send_file, session
from PIL import Image, ImageOps, UnidentifiedImageError
from werkzeug.security import generate_password_hash

from banco import conectar
from google_api import ErroGoogle, conta_para_alterar, identidade_google, iniciar_sessao, senha_confere

bp_perfil = Blueprint('config_perfil', __name__, cli_group='imagens')


def pode_moderar_imagens(c, uid):
    return c.execute(
        "SELECT 1 FROM usuarios WHERE id=? AND ativo=1 AND (tipo='ADMIN' OR modera_imagens=1)",
        (uid,),
    ).fetchone() is not None


@bp_perfil.cli.command('moderador')
@click.argument('email')
@click.option('--revogar', is_flag=True, help='Revoga a permissão de moderação concedida pelo comando.')
def configurar_moderador_imagens(email, revogar):
    """Configura a revisão de imagens para uma conta ativa existente."""
    with closing(conectar()) as c, c:
        resultado = c.execute(
            'UPDATE usuarios SET modera_imagens=? WHERE email=? AND ativo=1',
            (int(not revogar), email.strip()),
        )
        if not resultado.rowcount:
            raise click.ClickException('Não foi encontrada uma conta ativa com esse e-mail.')
    click.echo('Permissão de moderação revogada.' if revogar else 'Permissão concedida. Abra o perfil no Ranking para revisar.')


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


# O tipo usado nas consultas vem das rotas e dos campos aceitos pelo formulário.
TABELAS_IMAGENS = {'foto': 'fotos_perfil', 'banner': 'banners_perfil'}
LIMITE_IMAGEM = 950_000


def imagem_publicada(estado):
    return estado == 'aprovada' or (estado == 'pendente' and not current_app.config['MODERAR_IMAGENS_PERFIL'])


def preparar_imagem_perfil(arquivo, tipo):
    conteudo = arquivo.stream.read(LIMITE_IMAGEM + 1)
    if len(conteudo) > LIMITE_IMAGEM:
        raise ValueError('Escolha uma imagem de até 950 KB.')
    try:
        with Image.open(BytesIO(conteudo), formats=('JPEG', 'PNG', 'WEBP')) as imagem:
            if imagem.width * imagem.height > 12_000_000:
                raise ValueError('Use uma imagem com até 12 megapixels.')
            imagem = ImageOps.exif_transpose(imagem).convert('RGB')
            if tipo == 'foto':
                imagem = ImageOps.fit(imagem, (320, 320))
            else:
                imagem.thumbnail((1280, 720))
            saida = BytesIO()
            imagem.save(saida, format='JPEG', quality=85)
    except (UnidentifiedImageError, Image.DecompressionBombError, OSError, SyntaxError) as erro:
        raise ValueError('Não foi possível ler a imagem. Use JPEG, PNG ou WebP.') from erro
    return saida.getvalue()


def gravar_imagem_perfil(c, uid, tipo, imagem):
    tabela = TABELAS_IMAGENS[tipo]
    if imagem is None:
        c.execute(f'DELETE FROM {tabela} WHERE usuario_id=?', (uid,))
        return None
    versao = sha256(imagem).hexdigest()
    estado = 'pendente' if current_app.config['MODERAR_IMAGENS_PERFIL'] else 'aprovada'
    c.execute(f'''INSERT INTO {tabela} (usuario_id, imagem, moderacao, versao)
                 VALUES (?, ?, ?, ?)
                 ON CONFLICT(usuario_id) DO UPDATE SET imagem=excluded.imagem,
                 moderacao=excluded.moderacao, versao=excluded.versao''', (uid, imagem, estado, versao))
    return versao


@bp_perfil.route('/api/perfil/foto', methods=['GET', 'PUT', 'DELETE'], defaults={'tipo': 'foto'})
@bp_perfil.get('/api/perfil/banner', defaults={'tipo': 'banner'})
def foto_perfil(tipo):
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Entre na sua conta.'}), 401
    if request.method == 'PUT':
        arquivo = request.files.get('foto')
        if not arquivo:
            return jsonify({'message': 'Escolha uma imagem JPEG, PNG ou WebP.'}), 400
        try:
            imagem = preparar_imagem_perfil(arquivo, tipo)
        except ValueError as erro:
            return jsonify({'message': str(erro)}), 400
    else:
        imagem = None
    with closing(conectar()) as c, c:
        if request.method in ('PUT', 'DELETE'):
            gravar_imagem_perfil(c, uid, tipo, imagem)
            return '', 204
        tabela = TABELAS_IMAGENS[tipo]
        foto = c.execute(f'SELECT imagem FROM {tabela} WHERE usuario_id=?', (uid,)).fetchone()
    return responder_foto(foto['imagem']) if foto else ('', 404)


def responder_foto(imagem):
    resposta = send_file(BytesIO(imagem), mimetype='image/jpeg')
    resposta.headers['Cache-Control'] = 'private, no-store'
    resposta.headers['X-Content-Type-Options'] = 'nosniff'
    return resposta


@bp_perfil.get('/api/moderacao/fotos', defaults={'tipo': 'foto'})
@bp_perfil.get('/api/moderacao/banners', defaults={'tipo': 'banner'})
def moderacao_fotos_pendentes(tipo):
    """Lista imagens pendentes para uma conta autorizada a moderar."""
    uid = session.get('usuario_id')
    with closing(conectar()) as c:
        if not pode_moderar_imagens(c, uid):
            return jsonify({'message': 'Acesso restrito.'}), 403
        tabela = TABELAS_IMAGENS[tipo]
        fotos = c.execute(f"""SELECT f.usuario_id, u.nome FROM {tabela} f
                              JOIN usuarios u ON u.id=f.usuario_id
                              WHERE f.moderacao='pendente'""").fetchall()
    return jsonify({'pendentes': [dict(r) for r in fotos]})


@bp_perfil.get('/api/moderacao/fotos/<int:aluno_id>/imagem', defaults={'tipo': 'foto'})
@bp_perfil.get('/api/moderacao/banners/<int:aluno_id>/imagem', defaults={'tipo': 'banner'})
def imagem_pendente_administrador(aluno_id, tipo):
    """Visualização para revisão humana, sem publicar a foto pendente no ranking."""
    uid = session.get('usuario_id')
    with closing(conectar()) as c:
        if not pode_moderar_imagens(c, uid):
            return jsonify({'message': 'Acesso restrito.'}), 403
        tabela = TABELAS_IMAGENS[tipo]
        foto = c.execute(f"SELECT imagem FROM {tabela} WHERE usuario_id=? AND moderacao='pendente'", (aluno_id,)).fetchone()
    versao = request.args.get('versao')
    if foto and versao is not None and sha256(foto['imagem']).hexdigest() != versao:
        return '', 409
    return responder_foto(foto['imagem']) if foto else ('', 404)


@bp_perfil.post('/api/moderacao/fotos/<int:aluno_id>', defaults={'tipo': 'foto'})
@bp_perfil.post('/api/moderacao/banners/<int:aluno_id>', defaults={'tipo': 'banner'})
def moderar_foto(aluno_id, tipo):
    uid = session.get('usuario_id')
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict) or dados.get('decisao') not in ('aprovar', 'rejeitar'):
        return jsonify({'message': 'Decisão inválida.'}), 400
    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        if not pode_moderar_imagens(c, uid):
            return jsonify({'message': 'Acesso restrito.'}), 403
        tabela = TABELAS_IMAGENS[tipo]
        versao = dados.get('versao')
        if versao is not None:
            pendente = c.execute(
                f"SELECT imagem FROM {tabela} WHERE usuario_id=? AND moderacao='pendente'", (aluno_id,),
            ).fetchone()
            if not pendente or sha256(pendente['imagem']).hexdigest() != versao:
                return jsonify({'message': 'A imagem mudou. Abra o perfil novamente para revisar.'}), 409
        if dados['decisao'] == 'rejeitar':
            cursor = c.execute(f"DELETE FROM {tabela} WHERE usuario_id=? AND moderacao='pendente'", (aluno_id,))
        else:
            cursor = c.execute(f"UPDATE {tabela} SET moderacao='aprovada' WHERE usuario_id=? AND moderacao='pendente'", (aluno_id,))
        if not cursor.rowcount:
            return jsonify({'message': 'Imagem pendente não encontrada.'}), 404
    return jsonify({'ok': True})
