PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    senha_hash TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'ALUNO',
    ativo INTEGER NOT NULL DEFAULT 1 CHECK (ativo IN (0, 1)),
    data_cadastro TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS perfis (
    usuario_id INTEGER PRIMARY KEY,
    serie INTEGER NOT NULL DEFAULT 3 CHECK (serie BETWEEN 1 AND 4),
    vestibulares_json TEXT NOT NULL DEFAULT '["SIS"]',
    dificuldade TEXT NOT NULL DEFAULT 'ambos',
    atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS progresso (
    usuario_id INTEGER PRIMARY KEY,
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    sequencia_dias INTEGER NOT NULL DEFAULT 0 CHECK (sequencia_dias >= 0),
    aulas_concluidas INTEGER NOT NULL DEFAULT 0 CHECK (aulas_concluidas >= 0),
    questoes_respondidas INTEGER NOT NULL DEFAULT 0 CHECK (questoes_respondidas >= 0),
    acertos INTEGER NOT NULL DEFAULT 0 CHECK (acertos >= 0),
    coracoes INTEGER NOT NULL DEFAULT 3 CHECK (coracoes BETWEEN 0 AND 3),
    ultima_atividade TEXT,
    atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS redacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    tema_id TEXT,
    tema TEXT NOT NULL,
    texto TEXT NOT NULL,
    resultado_ia TEXT,
    nota INTEGER CHECK (nota BETWEEN 0 AND 1000),
    criada_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizada_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS historico_questoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    questao_id TEXT NOT NULL,
    vestibular TEXT,
    resposta TEXT,
    acertou INTEGER NOT NULL CHECK (acertou IN (0, 1)),
    respondida_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_redacoes_usuario ON redacoes(usuario_id, atualizada_em);
CREATE INDEX IF NOT EXISTS idx_historico_usuario ON historico_questoes(usuario_id, respondida_em);
