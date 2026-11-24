"""Fila persistente compartilhada entre o Flask e os processos de correção."""
import json
import hashlib
import hmac
import os
import sqlite3
from postgres_backend import DatabaseError, DatabaseIntegrityError, DatabaseOperationalError
import time
from concurrent.futures import ThreadPoolExecutor
from contextlib import closing
from uuid import uuid4

from flask import Blueprint, current_app, jsonify, request, session

from banco import conectar, inicializar_banco
from redacoes_api import buscar_tema, obter_redacao
from redacao_ia_api import ErroAvaliacao, avaliar_texto, gemini_motivo_indisponivel, provedores_disponiveis

bp_fila_redacao = Blueprint('fila_redacao', __name__)


@bp_fila_redacao.post('/api/redacao/avaliacoes')
def enfileirar_redacao():
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login para avaliar sua redação.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie os dados em JSON.'}), 400
    texto = dados.get('texto')
    tema = buscar_tema(dados.get('tema_id'))
    provedor = dados.get('provedor')
    detalhe = dados.get('detalhe', 'resumido' if provedor == 'ollama' else 'detalhado')
    if not tema or not isinstance(texto, str) or not 100 <= len(texto.strip()) <= 10000:
        return jsonify({'message': 'Escolha um tema e escreva entre 100 e 10.000 caracteres.'}), 400
    if provedor not in ('ollama', 'gemini', 'openai', 'cloudflare') or detalhe not in ('resumido', 'detalhado'):
        return jsonify({'message': 'Escolha um provedor e um nível de detalhe válidos.'}), 400
    if provedor not in provedores_disponiveis():
        mensagem = (gemini_motivo_indisponivel() if provedor == 'gemini'
                    else 'O serviço de correção não está habilitado neste servidor.')
        return jsonify({'message': mensagem}), 503
    if provedor in ('gemini', 'openai', 'cloudflare'):
        detalhe = 'detalhado'

    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        if provedor in ('openai', 'cloudflare'):
            # Limite por usuário: impede abuso da franquia e bloqueia antes de salvar.
            variavel = 'CLOUDFLARE_LIMITE_DIA' if provedor == 'cloudflare' else 'OPENAI_LIMITE_DIA'
            try:
                limite = max(1, min(10, int(os.getenv(variavel, '2'))))
            except ValueError:
                limite = 2
            usado = c.execute("""SELECT COUNT(*) AS total FROM avaliacoes_redacao a
                                JOIN redacoes r ON r.id=a.redacao_id
                                WHERE r.usuario_id=? AND a.provedor=?
                                AND a.enviada_em > CURRENT_TIMESTAMP - INTERVAL '24 hours'""",
                             (uid, provedor)).fetchone()['total']
            if usado >= limite:
                return jsonify({'message': 'Limite diário de correções por IA atingido.'}), 429
        redacao_id, _ = obter_redacao(c, uid, tema, texto.strip())
        existente = c.execute(
            """SELECT id, estado FROM avaliacoes_redacao
               WHERE redacao_id=? AND provedor=? AND detalhe=? AND estado IN ('fila', 'processando')""",
            (redacao_id, provedor, detalhe),
        ).fetchone()
        if existente:
            return jsonify({**dict(existente), 'redacao_id': redacao_id, 'reutilizada': True}), 202
        cursor = c.execute(
            'INSERT INTO avaliacoes_redacao (redacao_id, provedor, detalhe) VALUES (?, ?, ?)',
            (redacao_id, provedor, detalhe),
        )
        return jsonify({'id': cursor.lastrowid, 'redacao_id': redacao_id, 'estado': 'fila'}), 202


@bp_fila_redacao.get('/api/redacao/avaliacoes/<int:avaliacao_id>')
def consultar_avaliacao(avaliacao_id):
    uid = session.get('usuario_id')
    if not uid:
        return jsonify({'message': 'Faça login para ver a avaliação.'}), 401
    with closing(conectar()) as c:
        resultado = c.execute(
            """SELECT a.id, a.estado, a.erro, a.resultado_ia FROM avaliacoes_redacao a
               JOIN redacoes r ON r.id=a.redacao_id WHERE a.id=? AND r.usuario_id=?""",
            (avaliacao_id, uid),
        ).fetchone()
    if not resultado:
        return jsonify({'message': 'Avaliação não encontrada.'}), 404
    resposta = jsonify(dict(resultado))
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta


def limites():
    resultado = {}
    for provedor, variavel, padrao in (
        ('ollama', 'REDACAO_IA_CONCORRENCIA', 1),
        ('gemini', 'REDACAO_GEMINI_CONCORRENCIA', 2),
        ('openai', 'REDACAO_OPENAI_CONCORRENCIA', 1),
        ('cloudflare', 'REDACAO_CLOUDFLARE_CONCORRENCIA', 1),
    ):
        try:
            resultado[provedor] = max(1, min(16, int(os.getenv(variavel, padrao))))
        except ValueError:
            resultado[provedor] = padrao
    return resultado


def reservar(vagas, agora=None):
    agora = int(time.time()) if agora is None else agora
    try:
        with closing(conectar()) as c, c:
            pendente = c.execute(
                "SELECT 1 FROM avaliacoes_redacao WHERE estado IN ('fila', 'processando') LIMIT 1",
            ).fetchone()
            if not pendente:
                return None
            c.execute('BEGIN IMMEDIATE')
            # Um worker interrompido pode perder a reserva. Apenas o dono atual grava o resultado.
            c.execute(
                """UPDATE avaliacoes_redacao
                   SET estado=CASE WHEN tentativas < 2 THEN 'fila' ELSE 'falhou' END,
                       erro=CASE WHEN tentativas < 2 THEN NULL ELSE 'O processamento foi interrompido. Envie novamente.' END,
                       reserva=NULL, reservada_ate=NULL
                   WHERE estado='processando' AND reservada_ate<=?""",
                (agora,),
            )
            ativos = {
                linha['provedor']: linha['total'] for linha in c.execute(
                    "SELECT provedor, COUNT(*) AS total FROM avaliacoes_redacao WHERE estado='processando' GROUP BY provedor"
                )
            }
            desativados = set(vagas) - set(provedores_disponiveis())
            disponiveis = [p for p, limite in vagas.items() if p not in desativados and ativos.get(p, 0) < limite]
            for provedor in desativados:
                c.execute(
                    "UPDATE avaliacoes_redacao SET estado='falhou', erro=? WHERE estado='fila' AND provedor=?",
                    ('O provedor foi desativado. Selecione outro e envie novamente.', provedor),
                )
            if not disponiveis:
                return None
            marcadores = ','.join('?' for _ in disponiveis)
            trabalho = c.execute(
                f"""SELECT a.id, a.redacao_id, a.provedor, a.detalhe, r.tema_id, r.tema, r.texto
                    FROM avaliacoes_redacao a JOIN redacoes r ON r.id=a.redacao_id
                    WHERE a.estado='fila' AND a.provedor IN ({marcadores}) ORDER BY a.id LIMIT 1""",
                disponiveis,
            ).fetchone()
            if not trabalho:
                return None
            token = uuid4().hex
            c.execute(
                """UPDATE avaliacoes_redacao
                   SET estado='processando', reserva=?, reservada_ate=?, tentativas=tentativas+1 WHERE id=?""",
                (token, agora + 600, trabalho['id']),
            )
            return {**dict(trabalho), 'reserva': token}
    except DatabaseOperationalError as erro:
        if 'locked' not in str(erro):
            raise
        return None


def finalizar(trabalho, avaliacao=None, erro=None):
    resposta = json.dumps(avaliacao, ensure_ascii=False) if avaliacao else None
    nota = avaliacao['nota_estimada'] if avaliacao else None
    with closing(conectar()) as c, c:
        c.execute('BEGIN IMMEDIATE')
        cursor = c.execute(
            """UPDATE avaliacoes_redacao SET estado=?, resultado_ia=?, nota=?, erro=?,
                     reserva=NULL, reservada_ate=NULL WHERE id=? AND reserva=? AND estado='processando'""",
            ('concluida' if avaliacao else 'falhou', resposta, nota, erro, trabalho['id'], trabalho['reserva']),
        )
        if cursor.rowcount and avaliacao:
            # XP concedido apenas na primeira avaliação válida desta versão.
            # Nota estimada de 0 a 1000 -> de 0 a 40 XP, sem duplicação por provedor.
            uid_linha = c.execute('SELECT usuario_id, tema_id, texto FROM redacoes WHERE id=?',
                                  (trabalho['redacao_id'],)).fetchone()
            if uid_linha is not None:
                recompensa = max(0, min(40, int(nota) // 25))
                assinatura = hashlib.sha256(
                    ((uid_linha['tema_id'] or '') + '\0' + uid_linha['texto'].strip()).encode('utf-8')
                ).hexdigest()
                novo = c.execute('''INSERT OR IGNORE INTO recompensas_redacoes_assinaturas(usuario_id,assinatura,xp)
                                    VALUES(?,?,?)''', (uid_linha['usuario_id'], assinatura, recompensa))
                if novo.rowcount:
                    c.execute('INSERT OR IGNORE INTO recompensas_redacoes(redacao_id,usuario_id,xp) VALUES(?,?,?)',
                              (trabalho['redacao_id'], uid_linha['usuario_id'], recompensa))
                    c.execute('INSERT OR IGNORE INTO progresso(usuario_id) VALUES(?)', (uid_linha['usuario_id'],))
                    c.execute('UPDATE progresso SET xp=xp+? WHERE usuario_id=?',
                              (recompensa, uid_linha['usuario_id']))
            c.execute(
                """UPDATE redacoes SET nota=?, resultado_ia=?, atualizada_em=CURRENT_TIMESTAMP WHERE id=?
                   AND NOT EXISTS (SELECT 1 FROM avaliacoes_redacao
                                   WHERE redacao_id=? AND estado='concluida' AND id>?)""",
                (nota, resposta, trabalho['redacao_id'], trabalho['redacao_id'], trabalho['id']),
            )


def processar(trabalho):
    tema = buscar_tema(trabalho['tema_id'])
    try:
        resultado = avaliar_texto(
            trabalho['provedor'], trabalho['tema'], trabalho['texto'],
            tema['vestibular'] if tema else 'ENEM', trabalho['detalhe'],
        )
    except ErroAvaliacao as erro:
        print(f"Avaliação {trabalho['id']} ({trabalho['provedor']}): {erro}", flush=True)
        finalizar(trabalho, erro=str(erro))
    else:
        finalizar(trabalho, resultado)


@bp_fila_redacao.post('/api/interno/processar-redacao')
def processar_redacao_nuvem():
    """Chamado apenas pelo Supabase Cron com token secreto; processa UMA tarefa."""
    segredo = os.getenv('WORKER_TOKEN', '')
    autenticacao = request.headers.get('Authorization', '')
    if len(segredo) < 32 or not hmac.compare_digest(autenticacao, 'Bearer ' + segredo):
        return jsonify({'message': 'Não autorizado.'}), 401
    # Worker gratuito separado: nunca chama a API OpenAI com créditos pagos.
    if 'cloudflare' not in provedores_disponiveis():
        return jsonify({'message': 'Worker Cloudflare desativado.'}), 503
    try:
        tarefa = reservar({'cloudflare': 1})
        if not tarefa:
            return jsonify({'ok': True, 'processado': False})
        try:
            processar(tarefa)
        except Exception:
            current_app.logger.exception('Erro no worker de correção %s', tarefa['id'])
            try:
                finalizar(tarefa, erro='Não foi possível concluir a correção. Tente novamente.')
            except Exception:
                current_app.logger.exception('Falha ao registrar erro na avaliação %s', tarefa['id'])
            return jsonify({'ok': False, 'processado': False}), 500
        return jsonify({'ok': True, 'processado': True, 'id': tarefa['id']})
    except Exception:
        current_app.logger.exception('Falha ao reservar avaliação na nuvem')
        return jsonify({'ok': False, 'processado': False}), 500


def executar():
    inicializar_banco()
    vagas = limites()
    print('Worker de redação pronto.', flush=True)
    with ThreadPoolExecutor(max_workers=sum(vagas.values())) as executor:
        ativos = set()
        while True:
            concluidos = {futuro for futuro in ativos if futuro.done()}
            for futuro in concluidos:
                try:
                    futuro.result()
                except Exception as erro:
                    print(f'Falha no worker de redação: {type(erro).__name__}', flush=True)
            ativos -= concluidos
            if len(ativos) < sum(vagas.values()):
                trabalho = reservar(vagas)
                if trabalho:
                    ativos.add(executor.submit(processar, trabalho))
                    continue
            time.sleep(1)


if __name__ == '__main__':
    executar()
