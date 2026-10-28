import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BANCO = BASE_DIR / "vestibular.db"
ARQUIVO_SQL = BASE_DIR / "database" / "banco.sql"


def conectar():
    # Garante que o diretório onde o arquivo do banco reside exista
    BANCO.parent.mkdir(parents=True, exist_ok=True)

    conexao = sqlite3.connect(BANCO)
    conexao.row_factory = sqlite3.Row
    conexao.execute("PRAGMA foreign_keys = ON")

    return conexao


def inicializar_banco():
    if not ARQUIVO_SQL.exists():
        raise FileNotFoundError(f"O arquivo do esquema SQL não foi encontrado em: {ARQUIVO_SQL}")

    conexao = conectar()

    with open(ARQUIVO_SQL, "r", encoding="utf-8") as arquivo:
        script_sql = arquivo.read()

    conexao.executescript(script_sql)
    conexao.commit()
    conexao.close()
