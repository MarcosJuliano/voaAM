import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
BANCO = BASE_DIR / "vestibular.db"
ARQUIVO_SQL = BASE_DIR / "database" / "banco.sql"


def conectar():

    conexao = sqlite3.connect(BANCO)

    conexao.row_factory = sqlite3.Row

    conexao.execute("PRAGMA foreign_keys = ON")

    return conexao


def inicializar_banco():

    conexao = conectar()

    with open(ARQUIVO_SQL, "r", encoding="utf-8") as arquivo:
        script_sql = arquivo.read()

    conexao.executescript(script_sql)

    conexao.commit()
    conexao.close()