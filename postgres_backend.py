"""Camada PostgreSQL opt-in para o voaAM.

Use apenas com DATABASE_URL no servidor. Este adaptador preserva a API de
conectar() usada hoje (execute, commit, rollback, close, with c, lastrowid).
Ele NÃO cria tabelas, NÃO migra dados e NÃO implementa um trabalhador de fila.
"""
from __future__ import annotations

import os
import re
import sqlite3
from datetime import datetime, timezone

try:
    import psycopg
except ImportError:  # manter o fallback SQLite local importável
    psycopg = None

DatabaseError = (sqlite3.Error, psycopg.Error) if psycopg else sqlite3.Error
DatabaseIntegrityError = (sqlite3.IntegrityError, psycopg.IntegrityError) if psycopg else sqlite3.IntegrityError
DatabaseOperationalError = (sqlite3.OperationalError, psycopg.OperationalError) if psycopg else sqlite3.OperationalError

# As tabelas abaixo têm id IDENTITY no esquema PostgreSQL já criado.
IDENTITY_TABLES = frozenset({
    'usuarios', 'redacoes', 'historico_questoes', 'notas_simulados',
    'treinos_personalizados', 'avaliacoes_redacao', 'pedidos_suporte',
})


def _placeholders(sql: str) -> str:
    """Converte ? posicional em %s sem tocar em literais ou comentários SQL."""
    out = []
    i = 0
    mode = 'code'
    while i < len(sql):
        c = sql[i]
        nxt = sql[i + 1] if i + 1 < len(sql) else ''
        if mode == 'code':
            if c == "'":
                out.append(c); mode = 'single'
            elif c == '"':
                out.append(c); mode = 'double'
            elif c == '-' and nxt == '-':
                out.extend(['-', '-']); i += 1; mode = 'line'
            elif c == '/' and nxt == '*':
                out.extend(['/', '*']); i += 1; mode = 'comment'
            elif c == '?':
                out.append('%s')
            else:
                out.append(c)
        elif mode in ('single', 'double'):
            out.append(c)
            quote = "'" if mode == 'single' else '"'
            if c == quote:
                if nxt == quote:
                    out.append(nxt); i += 1
                else:
                    mode = 'code'
        elif mode == 'line':
            out.append(c)
            if c == '\n': mode = 'code'
        else:  # comment
            out.append(c)
            if c == '*' and nxt == '/':
                out.append('/'); i += 1; mode = 'code'
        i += 1
    return ''.join(out)


def _convert_scalar_minmax(sql: str) -> str:
    """Traduz MAX(a,b)/MIN(a,b) escalar, preservando agregações MAX(a)."""
    patterns = tuple(re.finditer(r'\b(MAX|MIN)\s*\(', sql, flags=re.I))
    if not patterns:
        return sql
    replacements = []
    for match in patterns:
        start = match.end()
        depth = 1
        commas = 0
        i = start
        quote = None
        while i < len(sql) and depth:
            c = sql[i]
            if quote:
                if c == quote:
                    if i + 1 < len(sql) and sql[i + 1] == quote:
                        i += 1
                    else:
                        quote = None
            elif c in ("'", '"'):
                quote = c
            elif c == '(':
                depth += 1
            elif c == ')':
                depth -= 1
            elif c == ',' and depth == 1:
                commas += 1
            i += 1
        if commas:
            replacements.append((match.start(), match.start() + len(match.group(1)),
                                 'GREATEST' if match.group(1).upper() == 'MAX' else 'LEAST'))
    for start, end, replacement in reversed(replacements):
        sql = sql[:start] + replacement + sql[end:]
    return sql


def converter_sql(sql: str) -> tuple[str, bool]:
    """Devolve (SQL PostgreSQL, retornar_id). Bloqueia comandos perigosos não traduzidos."""
    if not isinstance(sql, str):
        raise TypeError('A consulta SQL precisa ser string.')
    stripped = sql.strip()
    if not stripped:
        raise ValueError('Consulta SQL vazia.')
    if re.match(r'^(?:PRAGMA|VACUUM|ATTACH|DETACH|REINDEX)\b', stripped, re.I):
        raise NotImplementedError('Comando exclusivo do SQLite no modo PostgreSQL: ' + stripped[:32])
    if re.search(r'\b(?:INSERT\s+OR\s+REPLACE\b|REPLACE\s+INTO\b|last_insert_rowid\s*\(|randomblob\s*\(|strftime\s*\(|julianday\s*\()', stripped, re.I):
        raise NotImplementedError('SQL SQLite ainda requer adaptação manual.')

    original_semicolon = stripped.endswith(';')
    statement = stripped[:-1].rstrip() if original_semicolon else stripped
    ignored = bool(re.match(r'^INSERT\s+OR\s+IGNORE\s+INTO\b', statement, re.I | re.S))
    if ignored:
        statement = re.sub(r'^INSERT\s+OR\s+IGNORE\s+INTO\b', 'INSERT INTO', statement,
                           count=1, flags=re.I | re.S)
        if not re.search(r'\bON\s+CONFLICT\b', statement, re.I):
            statement += ' ON CONFLICT DO NOTHING'

    # Regra de anti-spam em app.py: função datetime('now','-1 hour') do SQLite.
    statement = re.sub(
        r"datetime\s*\(\s*'now'\s*,\s*'-1 hour'\s*\)",
        "(CURRENT_TIMESTAMP - INTERVAL '1 hour')", statement, flags=re.I,
    )
    if re.search(r"\bdatetime\s*\(\s*'now'", statement, flags=re.I):
        raise NotImplementedError('datetime(now, ...) exige tradução explícita para PostgreSQL.')
    statement = _convert_scalar_minmax(statement)
    statement = re.sub(r'\s+COLLATE\s+NOCASE\b', '', statement, flags=re.I)
    insert = re.match(r'^INSERT\s+INTO\s+(?:(?:public|"public")\.)?"?([A-Za-z_][A-Za-z0-9_]*)"?\b',
                      statement, re.I | re.S)
    returning_id = bool(insert and insert.group(1).lower() in IDENTITY_TABLES and
                        not re.search(r'\bRETURNING\b', statement, re.I))
    if returning_id:
        statement += ' RETURNING id'
    statement = _placeholders(statement)
    return statement, returning_id


def _sqlite_value(value):
    # SQLite guardava datas em TEXT; manter esse formato evita quebrar clientes
    # existentes que fazem slicing [:10] ou comparações de strings.
    if isinstance(value, datetime):
        if value.tzinfo is not None:
            value = value.astimezone(timezone.utc).replace(tzinfo=None)
        return value.isoformat(sep=' ', timespec='seconds')
    if isinstance(value, memoryview):
        return value.tobytes()
    return value


class CompatibleRow:
    """Equivalente suficiente a sqlite3.Row: row['nome'], row[0], dict(row)."""
    def __init__(self, data):
        self._data = {k: _sqlite_value(v) for k, v in data.items()}
        self._values = tuple(self._data.values())

    def __getitem__(self, key):
        if isinstance(key, (int, slice)):
            return self._values[key]
        return self._data[key]

    def __iter__(self):
        # sqlite3.Row itera sobre valores, mas dict(row) usa keys().
        return iter(self._values)

    def __len__(self):
        return len(self._data)

    def keys(self):
        return self._data.keys()

    def __repr__(self):
        return f'CompatibleRow({self._data!r})'


class PgResult:
    def __init__(self, cursor, capture_identity=False):
        self._cursor = cursor
        self.rowcount = cursor.rowcount
        self.lastrowid = None
        if capture_identity and cursor.description:
            row = cursor.fetchone()
            if row:
                self.lastrowid = row['id']

    def fetchone(self):
        row = self._cursor.fetchone()
        return CompatibleRow(row) if row is not None else None

    def fetchall(self):
        return [CompatibleRow(r) for r in self._cursor.fetchall()]

    def __iter__(self):
        for row in self._cursor:
            yield CompatibleRow(row)


class PgConnection:
    def __init__(self, connection):
        self._connection = connection

    def execute(self, sql, parameters=()):
        if sql.strip().rstrip(';').upper() == 'BEGIN IMMEDIATE':
            # O SQLite tomava lock de escrita no BEGIN IMMEDIATE. Na transação
            # PostgreSQL usamos advisory lock para serializar fluxos legados.
            return PgResult(self._connection.execute(
                "SELECT pg_advisory_xact_lock(hashtext('voaam-legacy-write'))"))
        converted, capture_identity = converter_sql(sql)
        result = self._connection.execute(converted, parameters if parameters is not None else ())
        return PgResult(result, capture_identity)

    def commit(self):
        self._connection.commit()

    def rollback(self):
        self._connection.rollback()

    def close(self):
        self._connection.close()

    def __enter__(self):
        return self

    def __exit__(self, typ, value, traceback):
        if typ:
            self.rollback()
        else:
            self.commit()
        return False


def conectar():
    if psycopg is None:
        raise RuntimeError('PostgreSQL requer psycopg. Execute pip install -r requirements.txt')
    uri = os.environ.get('DATABASE_URL', '').strip()
    if not uri:
        raise RuntimeError('DATABASE_URL não configurada.')
    from psycopg.rows import dict_row
    connection = psycopg.connect(uri, row_factory=dict_row, prepare_threshold=None,
                                  connect_timeout=10, sslmode='require')
    return PgConnection(connection)
