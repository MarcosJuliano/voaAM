"""Ferramenta ADMINISTRATIVA, somente no terminal local.

Use após backup, quando uma conta anterior tinha XP exclusivamente no navegador.
Não cria endpoint que permita ao navegador definir XP.

Exemplo (dentro do container):
 python scripts/migrar_xp_legado.py --email usuario@example.com --xp 1140
"""
import argparse
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from banco import conectar

p=argparse.ArgumentParser(description='Importação explícita de XP antigo, administrada no terminal')
p.add_argument('--email',required=True)
p.add_argument('--xp',type=int,required=True)
p.add_argument('--confirmar',action='store_true',help='Efetivar após conferir no banco')
a=p.parse_args()
if not 0<=a.xp<=100000: p.error('XP fora do intervalo 0 a 100.000')
c=conectar()
try:
 row=c.execute('SELECT id,nome FROM usuarios WHERE email=?',(a.email.strip().lower(),)).fetchone()
 if row is None:p.error('E-mail não encontrado')
 c.execute('INSERT OR IGNORE INTO progresso(usuario_id) VALUES(?)',(row['id'],))
 atual=c.execute('SELECT xp FROM progresso WHERE usuario_id=?',(row['id'],)).fetchone()[0]
 print(f"Conta: {row['nome']} | XP SQLite atual: {atual} | XP antigo informado: {a.xp}")
 if a.confirmar:
  # Max evita sobrescrever pontos legitimamente ganhos depois da migração.
  c.execute('UPDATE progresso SET xp=MAX(xp,?), atualizado_em=CURRENT_TIMESTAMP WHERE usuario_id=?',(a.xp,row['id']))
  c.commit();print('Migração aplicada. Não repita sem verificar a conta.')
 else:print('Simulação. Para aplicar, acrescente --confirmar.')
finally:c.close()
