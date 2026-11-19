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
    """Executa o esquema e cadastra referências oficiais sem remover dados."""
    if not ARQUIVO_SQL.is_file():
        raise FileNotFoundError(f"Esquema SQL não encontrado: {ARQUIVO_SQL}")

    script = ARQUIVO_SQL.read_text(encoding="utf-8")
    conexao = conectar()
    try:
        conexao.executescript(script)
        conexao.execute('BEGIN IMMEDIATE')
        migracoes = (
            ('redacoes', 'tema_id', 'TEXT'),
            ('usuarios', 'sessao_versao', 'INTEGER NOT NULL DEFAULT 0'),
            ('usuarios', 'modera_imagens', 'INTEGER NOT NULL DEFAULT 0 CHECK (modera_imagens IN (0, 1))'),
            ('google_identidades', 'email_google', 'TEXT'),
            ('fotos_perfil', 'versao', 'TEXT'),
            ('banners_perfil', 'versao', 'TEXT'),
        )
        for tabela, coluna, tipo in migracoes:
            campos = {r['name'] for r in conexao.execute(f'PRAGMA table_info({tabela})')}
            if coluna not in campos:
                conexao.execute(f'ALTER TABLE {tabela} ADD COLUMN {coluna} {tipo}')
        # V7: elimina recompensas anteriores por erro sem reduzir XP de acertos ou redações.
        # Uma linha de recompensa só existia após a primeira tentativa da questão.
        for linha in conexao.execute(
                'SELECT usuario_id, COALESCE(SUM(xp),0) AS perda FROM recompensas_questoes WHERE xp=5 GROUP BY usuario_id'
        ).fetchall():
            conexao.execute('UPDATE progresso SET xp=MAX(0,xp-?) WHERE usuario_id=?',
                            (linha['perda'], linha['usuario_id']))
        conexao.execute('DELETE FROM recompensas_questoes WHERE xp=5')
        # Adiciona colunas sem apagar perfis existentes.
        campos_perfil = {r['name'] for r in conexao.execute('PRAGMA table_info(perfis)')}
        if 'banner_tema' not in campos_perfil:
            conexao.execute("ALTER TABLE perfis ADD COLUMN banner_tema TEXT NOT NULL DEFAULT 'oceano'")
        if 'banner_modo' not in campos_perfil:
            conexao.execute("ALTER TABLE perfis ADD COLUMN banner_modo TEXT NOT NULL DEFAULT 'padrao'"
                            " CHECK (banner_modo IN ('padrao', 'personalizado'))")
            conexao.execute("""UPDATE perfis SET banner_modo='personalizado'
                              WHERE usuario_id IN (SELECT usuario_id FROM banners_perfil)""")
        campos_foto = {r['name'] for r in conexao.execute('PRAGMA table_info(fotos_perfil)')}
        if 'moderacao' not in campos_foto:
            conexao.execute("ALTER TABLE fotos_perfil ADD COLUMN moderacao TEXT NOT NULL DEFAULT 'aprovada'")
        for tabela in ('fotos_perfil', 'banners_perfil'):
            conexao.execute(f'UPDATE {tabela} SET versao=lower(hex(randomblob(16))) WHERE versao IS NULL')
        # Conserva a última nota de instalações que ainda não registravam cada envio.
        conexao.execute(
            """INSERT INTO avaliacoes_redacao
               (redacao_id, provedor, detalhe, estado, nota, resultado_ia, enviada_em)
               SELECT r.id, 'anterior', 'anterior', 'concluida', r.nota, r.resultado_ia, r.atualizada_em
               FROM redacoes r
               WHERE r.nota IS NOT NULL
                 AND NOT EXISTS (SELECT 1 FROM avaliacoes_redacao a WHERE a.redacao_id=r.id)"""
        )
        # Credita versões de redação avaliadas antes desta atualização (uma única vez).
        for r in conexao.execute('''SELECT r.id AS rid, r.usuario_id AS uid, MAX(a.nota) AS nota
                  FROM redacoes r JOIN avaliacoes_redacao a ON a.redacao_id=r.id
                  WHERE a.estado='concluida' AND a.nota IS NOT NULL
                  GROUP BY r.id''').fetchall():
            pontos = max(0, min(40, int(r['nota']) // 25))
            cursor = conexao.execute('INSERT OR IGNORE INTO recompensas_redacoes(redacao_id,usuario_id,xp) VALUES(?,?,?)',
                                     (r['rid'], r['uid'], pontos))
            if cursor.rowcount:
                conexao.execute('INSERT OR IGNORE INTO progresso(usuario_id) VALUES(?)', (r['uid'],))
                conexao.execute('UPDATE progresso SET xp=xp+? WHERE usuario_id=?', (pontos, r['uid']))
        # Reconhece versões que receberam XP antes da prevenção de duplicatas.
        import hashlib
        for r in conexao.execute("""SELECT k.usuario_id AS uid, k.xp, t.tema_id, t.texto
                    FROM recompensas_redacoes k JOIN redacoes t ON t.id=k.redacao_id""").fetchall():
            assinatura = hashlib.sha256(((r['tema_id'] or '') + '\0' + r['texto'].strip()).encode('utf-8')).hexdigest()
            conexao.execute('INSERT OR IGNORE INTO recompensas_redacoes_assinaturas(usuario_id, assinatura, xp) VALUES(?,?,?)',
                            (r['uid'], assinatura, r['xp']))
        # URLs vêm de um catálogo auditado e permanecem editáveis no SQLite.
        catalogo = BASE_DIR / 'database' / 'provas_oficiais.json'
        if catalogo.is_file():
            import json
            dados = json.loads(catalogo.read_text(encoding='utf-8'))
            for item in dados:
                conexao.execute(
                    """INSERT OR IGNORE INTO documentos_provas
                       (vestibular, ano, titulo, instituicao, url_oficial, observacao)
                       VALUES (?, ?, ?, ?, ?, ?)""",
                    (item['vestibular'], item['ano'], item['titulo'],
                     item['instituicao'], item['url_oficial'], item['observacao']),
                )
        conexao.commit()
    finally:
        conexao.close()
