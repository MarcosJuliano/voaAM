"""Conexão e inicialização do banco SQLite do voaAM."""
import os
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
INSTANCE_DIR = BASE_DIR / "instance"
DATABASE_CONFIG = os.environ.get("DATABASE_PATH", str(INSTANCE_DIR / "voaam.db"))
BANCO = Path(DATABASE_CONFIG).expanduser()
if not BANCO.is_absolute():
    BANCO = BASE_DIR / BANCO
ARQUIVO_SQL = BASE_DIR / "database" / "schema.sql"


def conectar() -> sqlite3.Connection:
    """Abre uma conexão; quem chama deve fechá-la com close()."""
    BANCO.parent.mkdir(parents=True, exist_ok=True)
    conexao = sqlite3.connect(BANCO, timeout=10)
    conexao.row_factory = sqlite3.Row
    conexao.execute("PRAGMA foreign_keys = ON")
    conexao.execute("PRAGMA journal_mode = WAL")
    return conexao


def inicializar_banco() -> None:
    """Executa o esquema sem remover dados de tabelas já existentes."""
    if not ARQUIVO_SQL.is_file():
        raise FileNotFoundError(f"Esquema SQL não encontrado: {ARQUIVO_SQL}")

    script = ARQUIVO_SQL.read_text(encoding="utf-8")
    conexao = conectar()
    try:
        conexao.executescript(script)
        conexao.commit()
    finally:
        conexao.close()
