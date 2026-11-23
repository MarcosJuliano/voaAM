"""Exercícios autorais com gabaritos e comentários no servidor."""
import json
from functools import lru_cache
from hashlib import sha256
from pathlib import Path

CAMINHO = Path(__file__).resolve().parent / 'database' / 'humanas.json'
FONTE_HUMANAS = 'Exercícios autorais de Humanas'
CAMINHO_NOVOS_ASSUNTOS = CAMINHO.with_name('assuntos_autorais.json')


def alternativas_em_pares(conceitos, i, campo):
    """Compara noções próximas, mantendo uma única sequência correta."""
    ordenados = conceitos[i:] + conceitos[:i]
    return [
        f'I. {a[campo]}\nII. {b[campo]}'
        for a, b in zip(ordenados, ordenados[1:] + ordenados[:1])
    ]


def criar_questao(grupo, id_local, nivel, enunciado, alternativas, correta, explicacao):
    # Ordem estável entre reinícios, inclusive para sessões de treino em curso.
    chave = f'{grupo["semente"]}:{id_local}'.encode()
    rotacao = sha256(chave).digest()[0] % len(alternativas)
    return {
        'id': f'banco:{grupo["prefixo"]}-{grupo["id"]}-{id_local}',
        'fonte': grupo['fonte'],
        'vestibular': grupo['vestibular'],
        'ano': None,
        'etapa': grupo['etapa'],
        'disciplina': grupo['disciplina'],
        'assunto': grupo['assunto'],
        'nivel': nivel,
        'enunciado': enunciado,
        'alternativas': alternativas[rotacao:] + alternativas[:rotacao],
        'correta': (correta - rotacao) % len(alternativas),
        'imagem': None,
        'explicacao': explicacao,
    }


def questoes_do_grupo(grupo):
    conceitos = grupo['conceitos']
    nomes = [c['nome'] for c in conceitos]
    descricoes = [c['descricao'] for c in conceitos]
    situacoes = [c['situacao'] for c in conceitos]
    for i, conceito in enumerate(conceitos):
        id_conceito, nome = conceito['id'], conceito['nome']
        proximo = conceitos[(i + 1) % len(conceitos)]
        explicacao = f'{nome}. {conceito["descricao"]}'
        yield criar_questao(grupo, f'def-{id_conceito}', 1,
                             f'Qual descrição caracteriza o seguinte tema?\n\n{nome}',
                             descricoes, i, explicacao)
        yield criar_questao(grupo, f'id-{id_conceito}', 2,
                             f'{conceito["situacao"]}\n\nQual conceito ou processo é mais diretamente ilustrado?',
                             nomes, i, explicacao)
        yield criar_questao(grupo, f'caso-{id_conceito}', 2,
                             f'Qual situação exemplifica mais diretamente o seguinte tema?\n\n{nome}',
                             situacoes, i, explicacao)
        comparacao = f'{explicacao}\n{proximo["nome"]}. {proximo["descricao"]}'
        yield criar_questao(grupo, f'comparar-{id_conceito}', 3,
                             f'I. {nome}\nII. {proximo["nome"]}\n\nQual alternativa descreve corretamente I e II?',
                             alternativas_em_pares(conceitos, i, 'descricao'), 0, comparacao)
        yield criar_questao(grupo, f'relacionar-{id_conceito}', 3,
                             f'I. {conceito["situacao"]}\nII. {proximo["situacao"]}\n\nA quais conceitos ou processos correspondem I e II?',
                             alternativas_em_pares(conceitos, i, 'nome'), 0, comparacao)


@lru_cache(maxsize=1)
def acervo_autoral():
    acervo = {}
    for arquivo, prefixo in ((CAMINHO, 'humanas'), (CAMINHO_NOVOS_ASSUNTOS, 'autoral')):
        for grupo in json.loads(arquivo.read_text(encoding='utf-8')):
            fonte = FONTE_HUMANAS if grupo['disciplina'] in ('História', 'Geografia', 'Filosofia', 'Sociologia') else 'Exercícios autorais'
            questoes = tuple(questoes_do_grupo({**grupo, 'prefixo': prefixo, 'fonte': fonte}))
            acervo[grupo['id']] = {
                'titulo': grupo['assunto'], 'vestibular': grupo['vestibular'],
                'etapa': grupo['etapa'], 'disciplina': grupo['disciplina'],
                'dificuldade_sugerida': grupo['dificuldade_sugerida'],
                'descricao': ', '.join(c['nome'] for c in grupo['conceitos'][:3]),
                'questoes': questoes,
            }
    return acervo


def acervo_humanas():
    return {chave: grupo for chave, grupo in acervo_autoral().items()
            if grupo['questoes'][0]['fonte'] == FONTE_HUMANAS}


def questoes_autorais():
    for grupo in acervo_autoral().values():
        yield from grupo['questoes']
