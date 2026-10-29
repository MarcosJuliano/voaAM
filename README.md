# voa-am — Documentação da Arquitetura

Plataforma de estudos para os vestibulares do Amazonas (PSC, SIS, MACRO, ENEM).
---
Atividade de extensão da universidade.
---

## Iniciar localmente com Docker

1. Copie `.env.example` para `.env` e configure `FLASK_SECRET_KEY`. Para usar correção de redação, informe também `GEMINI_API_KEY`.
2. Execute `docker compose up --build` na raiz do projeto.
3. Abra `http://localhost:5000`.
4. Teste `http://localhost:5000/api/health` — deve responder JSON com `ok: true`.

O banco é inicializado em `instance/voaam.db`; não apague esse arquivo se contiver dados importantes. O arquivo é ignorado pelo Git para não publicar dados pessoais.