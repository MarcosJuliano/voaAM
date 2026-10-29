"""Feedback pedagógico 100% local, sem LLM, sem nota oficial e sem tarifa de API."""
import re
from flask import Blueprint, jsonify, request, session

bp_redacao_gratis=Blueprint('redacao_gratis',__name__)

@bp_redacao_gratis.post('/api/redacao/avaliar-gratis')
def avaliar_gratis():
    if not session.get('usuario_id'):
        return jsonify({'message':'Faça login para analisar a redação.'}),401
    d=request.get_json(silent=True)
    if not isinstance(d,dict) or not isinstance(d.get('texto'),str) or not isinstance(d.get('tema'),str):
        return jsonify({'message':'Envie tema e texto.'}),400
    texto=d['texto'].strip();tema=d['tema'].strip()
    if len(texto)<100 or len(texto)>10000 or not tema or len(tema)>400:
        return jsonify({'message':'Texto precisa ter 100–10.000 caracteres e tema válido.'}),400
    palavras=re.findall(r'\b[\wÀ-ÿ-]+\b',texto,flags=re.UNICODE)
    paragrafos=[p.strip() for p in re.split(r'\n\s*\n|\n',texto) if p.strip()]
    tema_termos={w.lower() for w in re.findall(r'[A-Za-zÀ-ÿ]{5,}',tema)}
    stop={'sobre','entre','brasil','brasileira','brasileiro','desafios','para','sociedade','acerca'}
    relevantes=tema_termos-stop
    ligados=sorted(w for w in relevantes if re.search(r'\b'+re.escape(w)+r'\b',texto,re.IGNORECASE))
    conectivos=['portanto','entretanto','além disso','porém','contudo','assim','dessa forma','em primeiro lugar','por conseguinte']
    presentes=[s for s in conectivos if re.search(r'\b'+re.escape(s)+r'\b',texto,re.IGNORECASE)]
    alertas=[]
    if len(palavras)<180:alertas.append('Texto curto para uma dissertação: desenvolva e exemplifique melhor seus argumentos.')
    if len(paragrafos)<3:alertas.append('Separe claramente introdução, desenvolvimento e conclusão em parágrafos.')
    if len(presentes)<2:alertas.append('Experimente mais conectivos adequados para explicitar relações entre as ideias.')
    if relevantes and not ligados:alertas.append('O tema não foi claramente reconhecido pelo vocabulário. Verifique se sua tese o aborda diretamente.')
    if texto.count('.')<3:alertas.append('Revise a pontuação e a divisão das ideias em períodos.')
    if not alertas:alertas.append('Sua estrutura inicial parece organizada. Revise repertório, precisão dos argumentos e gramática com um leitor humano.')
    linhas=[
        'ANÁLISE AUTOMÁTICA GRATUITA — NÃO É UMA CORREÇÃO POR IA NEM NOTA OFICIAL',
        f'Palavras: {len(palavras)} | Parágrafos detectados: {len(paragrafos)}',
        f'Expressões de conexão identificadas: {", ".join(presentes) if presentes else "nenhuma da lista básica"}.',
        f'Termos do tema reconhecidos: {", ".join(ligados) if ligados else "nenhum dos termos selecionados"}.',
        '', 'PONTOS PARA REVISÃO:'] + ['• '+x for x in alertas]+[
        '', 'Esta ferramenta usa regras simples; não verifica com confiabilidade adequação temática, gramática, argumentação, originalidade ou competências do ENEM. Não atribui pontuação.']
    return jsonify({'resultado':'\n'.join(linhas),'modo':'regras_locais','nota':None})
