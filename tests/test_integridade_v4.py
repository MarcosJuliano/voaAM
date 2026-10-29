"""Verificação sem bibliotecas externas: catálogo, arquivos, SQL e estrutura."""
import json
import sqlite3
import tempfile
from pathlib import Path
root = Path(__file__).resolve().parents[1]
catalogo = json.loads((root/'database/questoes_treino.json').read_text(encoding='utf-8'))
assert len(catalogo) >= 1000
ids = [q['id'] for q in catalogo]
assert len(ids) == len(set(ids)), 'IDs repetidos'
for q in catalogo:
    assert q.get('enunciado')
    assert 0 <= q['correta'] < len(q['alternativas'])
    assert all(str(v).strip() for v in q['alternativas'])
    if q.get('imagem'):
        relative = q['imagem'].lstrip('/')
        assert (root/'public'/relative).is_file(), (q['id'],relative)
    assert q['id'].startswith(('banco:','oficial:','dotnet:'))
with tempfile.TemporaryDirectory() as td:
    db = sqlite3.connect(str(Path(td)/'teste.db'))
    db.executescript((root/'database/schema.sql').read_text())
    tables = {name for (name,) in db.execute("SELECT name FROM sqlite_master WHERE type='table'")}
    assert {'treinos_personalizados','redacoes','historico_questoes','topicos_concluidos'} <= tables
    db.close()
for filename in ('temas_redacao.json','topicos_catalogo.json','provas_oficiais.json'):
    assert json.loads((root/'database'/filename).read_text(encoding='utf-8'))
assert not list((root/'public').rglob('*.pdf'))
assert (root/'public/pages/praticar.html').is_file()
assert (root/'public/js/modules/treino-personalizado.js').is_file()
print(f'OK: {len(catalogo)} questões distintas, figuras presentes, JSONs, SQL e arquivos públicos.')
