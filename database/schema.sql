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


-- Conclusões dos tópicos de aula/quiz por estudante.
CREATE TABLE IF NOT EXISTS topicos_concluidos (
    usuario_id INTEGER NOT NULL,
    topico_id TEXT NOT NULL,
    disciplina TEXT NOT NULL CHECK (disciplina IN ('mat', 'red')),
    serie INTEGER NOT NULL CHECK (serie BETWEEN 1 AND 3),
    quiz_id TEXT NOT NULL,
    questoes_total INTEGER NOT NULL CHECK (questoes_total > 0),
    acertos INTEGER NOT NULL CHECK (acertos >= 0 AND acertos <= questoes_total),
    percentual INTEGER NOT NULL CHECK (percentual BETWEEN 0 AND 100),
    concluido_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, topico_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_topicos_concluidos_usuario
    ON topicos_concluidos(usuario_id, disciplina, serie);


-- Índice de referências a páginas oficiais. Nenhum PDF armazenado aqui.
CREATE TABLE IF NOT EXISTS documentos_provas (
    vestibular TEXT NOT NULL CHECK (vestibular IN ('ENEM', 'PSC', 'SIS', 'MACRO')),
    ano INTEGER NOT NULL CHECK (ano BETWEEN 0 AND 2100),
    titulo TEXT NOT NULL,
    instituicao TEXT NOT NULL,
    url_oficial TEXT NOT NULL,
    observacao TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (vestibular, ano)
);

-- Vidas separadas da pontuação, para recarga gradual por conta.
CREATE TABLE IF NOT EXISTS vidas (
    usuario_id INTEGER PRIMARY KEY,
    quantidade INTEGER NOT NULL DEFAULT 3 CHECK (quantidade BETWEEN 0 AND 3),
    proxima_recarga INTEGER, -- Unix timestamp UTC, próxima vida
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);


-- Treinos personalizados: escolhas e respostas persistidas por conta.
CREATE TABLE IF NOT EXISTS treinos_personalizados (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 usuario_id INTEGER NOT NULL,
 filtros_json TEXT NOT NULL,
 questoes_json TEXT NOT NULL,
 respostas_json TEXT NOT NULL DEFAULT '{}',
 criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 encerrado_em TEXT,
 FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_treinos_usuario ON treinos_personalizados(usuario_id, id);

-- V5: conceder XP somente uma vez por questão e conta, sempre no Flask.
CREATE TABLE IF NOT EXISTS recompensas_questoes (
 usuario_id INTEGER NOT NULL,
 questao_id TEXT NOT NULL,
 xp INTEGER NOT NULL CHECK(xp BETWEEN 0 AND 20),
 criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(usuario_id,questao_id),
 FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Contas Google vinculadas pelo identificador estável "sub", nunca só pelo e-mail.
CREATE TABLE IF NOT EXISTS google_identidades (
 google_sub TEXT PRIMARY KEY,
 usuario_id INTEGER NOT NULL UNIQUE,
 criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
