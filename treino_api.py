"""Seleção aleatória e correção de questões no Flask.

Fisher–Yates é a técnica estudada no projeto C#; as questões vêm do
acervo JS do voaAM e dos quatro JSONs do protótipo .NET.
O gabarito permanece no servidor e não é incluído no JSON dos enunciados.
"""
import json
from random import SystemRandom
from collections import Counter
from functools import lru_cache
from pathlib import Path
from flask import Blueprint, jsonify, request, session
from banco import conectar
from humanas import acervo_autoral, acervo_humanas, questoes_autorais

bp_treino = Blueprint('treino', __name__)
CAMINHO = Path(__file__).resolve().parent / 'database' / 'questoes_treino.json'


@lru_cache(maxsize=1)
def questoes_importadas():
    return json.loads(CAMINHO.read_text(encoding='utf-8'))


def catalogo():
    return questoes_importadas() + list(questoes_autorais())


def apresentar(q, ordem):
    dados = {k: q.get(k) for k in ('id', 'vestibular', 'ano', 'etapa', 'disciplina',
                                   'assunto', 'enunciado', 'imagem', 'fonte')}
    dados['alternativas'] = [q['alternativas'][i] for i in ordem]
    return dados


def autenticar():
    return session.get('usuario_id')


@bp_treino.get('/api/praticar/humanas/assuntos')
@bp_treino.get('/api/praticar/exercicios/assuntos')
def assuntos_autorais():
    acervo = acervo_humanas() if request.path.endswith('/humanas/assuntos') else acervo_autoral()
    return jsonify({'assuntos': [
        {'id': chave, 'total': len(grupo['questoes']),
         'niveis': Counter(q['nivel'] for q in grupo['questoes']),
         **{campo: grupo[campo] for campo in ('titulo', 'disciplina', 'vestibular', 'etapa',
                                             'descricao', 'dificuldade_sugerida')}}
        for chave, grupo in acervo.items()
    ]})


@bp_treino.get('/api/praticar/humanas/<chave>/questoes')
@bp_treino.get('/api/praticar/exercicios/<chave>/questoes')
def exercicios_autorais(chave):
    if not autenticar():
        return jsonify({'message': 'Faça login para praticar.'}), 401
    grupo = acervo_autoral().get(chave)
    if grupo is None:
        return jsonify({'message': 'Assunto não encontrado.'}), 404
    nivel = request.args.get('nivel', type=int)
    if nivel not in (1, 2, 3):
        return jsonify({'message': 'Escolha um nível de 1 a 3.'}), 400
    questoes = [q for q in grupo['questoes'] if q['nivel'] == nivel]
    sorteadas = SystemRandom().sample(questoes, min(10, len(questoes)))
    resposta = jsonify({'questoes': [
        apresentar(q, range(len(q['alternativas']))) for q in sorteadas
    ]})
    resposta.headers['Cache-Control'] = 'private, no-store'
    return resposta


@bp_treino.get('/api/treino/catalogo')
def resumo_catalogo():
    """Metadados públicos. Filtros opcionais aplicados antes da contagem."""
    todos = catalogo()
    campos=('vestibular','ano','disciplina','assunto','fonte','etapa')
    filtros={campo:request.args.get(campo,'').strip() for campo in campos}
    def valido(q, ignora=None):
        return all(not v or str(q.get(k) or '') == v for k,v in filtros.items() if k!=ignora)
    def itens(nome):
        pool=(q for q in todos if valido(q,nome))
        cont=Counter(str(q.get(nome)) for q in pool if q.get(nome) not in (None,''))
        return [{'valor':k,'total':v} for k,v in sorted(cont.items())]
    total=sum(valido(q) for q in todos)
    return jsonify({'total':len(todos),'disponiveis':total,
                    **{{'vestibular':'vestibulares','ano':'anos','disciplina':'disciplinas','assunto':'assuntos','fonte':'fontes','etapa':'etapas'}[campo]:itens(campo) for campo in campos}})


@bp_treino.post('/api/treino/iniciar')
def iniciar_treino():
    uid = autenticar()
    if not uid:
        return jsonify({'message': 'Faça login para iniciar um treino.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie os filtros do treino em JSON.'}), 400
    try:
        quantidade = int(dados.get('quantidade', 10))
    except (ValueError, TypeError):
        return jsonify({'message': 'Quantidade inválida.'}), 400
    if not 1 <= quantidade <= 60:
        return jsonify({'message': 'Escolha entre 1 e 60 questões.'}), 400
    qs = catalogo()
    filtros = {}
    for campo in ('vestibular', 'ano', 'disciplina', 'assunto', 'fonte', 'etapa'):
        valor = str(dados.get(campo, '') or '').strip()
        if valor and valor.lower() not in ('todos', 'todas', 'aleatorio', 'aleatória'):
            if len(valor) > 100:
                return jsonify({'message': 'Filtro muito longo.'}), 400
            filtros[campo] = valor
            qs = [q for q in qs if str(q.get(campo)) == valor]
    if not qs:
        return jsonify({'message': 'Não existem questões para essa combinação de filtros.'}), 422
    rng = SystemRandom()
    sorteadas = rng.sample(qs, min(quantidade, len(qs)))
    ordens = {
        q['id']: rng.sample(range(len(q['alternativas'])), len(q['alternativas']))
        for q in sorteadas
    }
    c = conectar()
    try:
        cur = c.execute('''INSERT INTO treinos_personalizados(usuario_id, filtros_json, questoes_json)
                           VALUES (?, ?, ?)''',
                        (uid, json.dumps(filtros, ensure_ascii=False), json.dumps(ordens)))
        c.commit()
        treino_id = cur.lastrowid
    finally:
        c.close()
    return jsonify({'treino_id': treino_id, 'quantidade': len(sorteadas),
                    'questoes': [apresentar(q, ordens[q['id']]) for q in sorteadas]}), 201


@bp_treino.post('/api/treino/<int:treino_id>/responder')
def responder_treino(treino_id):
    uid = autenticar()
    if not uid:
        return jsonify({'message': 'Faça login para responder.'}), 401
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return jsonify({'message': 'Envie a resposta em JSON.'}), 400
    qid = dados.get('questao_id')
    indice = dados.get('alternativa')
    if not isinstance(qid, str) or not isinstance(indice, int) or isinstance(indice, bool):
        return jsonify({'message': 'Questão ou alternativa inválida.'}), 400
    c = conectar()
    try:
        c.execute('BEGIN IMMEDIATE')
        treino = c.execute('SELECT * FROM treinos_personalizados WHERE id=? AND usuario_id=?', (treino_id, uid)).fetchone()
        if treino is None:
            return jsonify({'message': 'Treino não encontrado.'}), 404
        if treino['encerrado_em']:
            return jsonify({'message': 'Este treino já foi encerrado.'}), 409
        questoes = json.loads(treino['questoes_json'])
        respostas = json.loads(treino['respostas_json'])
        if qid not in questoes:
            return jsonify({'message': 'Questão não pertence a este treino.'}), 400
        if qid in respostas:
            return jsonify({'message': 'Esta questão já foi respondida.'}), 409
        q = next((x for x in catalogo() if x['id'] == qid), None)
        if not q or not 0 <= indice < len(q['alternativas']):
            return jsonify({'message': 'Alternativa fora do intervalo.'}), 400
        # Tentativas antigas guardam uma lista de IDs com a ordem original.
        ordem = questoes[qid] if isinstance(questoes, dict) else list(range(len(q['alternativas'])))
        alternativa_original = ordem[indice]
        correta_exibida = ordem.index(q['correta'])
        acertou = alternativa_original == q['correta']
        respostas[qid] = {'alternativa': alternativa_original, 'acertou': acertou}
        c.execute('UPDATE treinos_personalizados SET respostas_json=? WHERE id=?',
                  (json.dumps(respostas), treino_id))
        from progresso_api import pontuar
        ganho, _ = pontuar(c, uid, qid, alternativa_original, q['correta'], q['vestibular'])
        c.commit()
        return jsonify({'ok': True, 'acertou': acertou, 'correta': correta_exibida,
                        'xp_ganho': ganho, 'explicacao': q.get('explicacao', ''),
                        'respondidas': len(respostas), 'total': len(questoes)})
    finally:
        c.close()


@bp_treino.post('/api/treino/<int:treino_id>/encerrar')
def encerrar_treino(treino_id):
    uid = autenticar()
    if not uid:
        return jsonify({'message': 'Faça login.'}), 401
    c = conectar()
    try:
        c.execute('BEGIN IMMEDIATE')
        treino = c.execute('SELECT * FROM treinos_personalizados WHERE id=? AND usuario_id=?', (treino_id, uid)).fetchone()
        if treino is None:
            return jsonify({'message': 'Treino não encontrado.'}), 404
        respostas = json.loads(treino['respostas_json'])
        questoes = json.loads(treino['questoes_json'])
        c.execute('UPDATE treinos_personalizados SET encerrado_em=CURRENT_TIMESTAMP WHERE id=? AND encerrado_em IS NULL', (treino_id,))
        c.commit()
        return jsonify({'ok': True, 'respondidas': len(respostas),
                        'acertos': sum(bool(v['acertou']) for v in respostas.values()), 'total': len(questoes)})
    finally:
        c.close()


@bp_treino.post('/api/treino/registrar-respostas')
def registrar_respostas_legadas():
    """Endpoint depreciado: impedia validar a origem das tentativas.

    Use /api/avaliacao/lote. O endpoint antigo não pode continuar aceitando
    totais ou gerando histórico independente da correção autoritativa.
    """
    return jsonify({'message': 'Atualize o frontend: use /api/avaliacao/lote.'}), 410
