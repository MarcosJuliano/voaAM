# voaAM

Plataforma de estudos para ENEM, PSC, SIS e MACRO, com exercícios, simulados, redações, perfil e ranking.

## Tecnologias

- **Interface:** HTML, CSS, JavaScript modular. Sem compilação de frontend.
- **API:** Python 3.11+, Flask.
- **Dados:** SQLite persistente; `database/` guarda o acervo e o esquema.
- **Redações:** worker Python separado, com Ollama local e Gemini opcional.
- **Deploy próprio:** Docker Compose, Gunicorn e Caddy (HTTPS).

## Organização

```text
app.py, *_api.py          Rotas e regras Flask
banco.py                 Inicialização e migrações SQLite
fila_redacao.py          Worker de análises
suporte_email.py         Notificações de chamados (Resend API)
public/                  Interface e mídias
  css/                   Estilos, incluindo professional.css
  js/modules/            Lógica de interface
  pages/                 Seções renderizadas no navegador
  components/            Componentes comuns
  assets/documents/      Provas, gabaritos e ilustrações
 database/               Acervo de questões e schema.sql
 tests/                  Testes existentes
 scripts/                Scripts de manutenção
 docs/                   Deploy, suporte e revisão técnica
 integracao/             Referência histórica de C#
 deploy/                 Exemplo de frontend na Vercel
```

## Como executar localmente

1. Copie `.env.example` para `.env`, gere uma chave aleatória forte (`openssl rand -hex 32`) e edite o arquivo **somente em seu computador**.
2. Suba o projeto: `docker compose up -d --build`.
3. Abra `http://127.0.0.1:5000`. Os dados persistem em `instance/voaam.db` durante o desenvolvimento.
4. Para ver logs: `docker compose logs -f web corretor`.
5. Teste com `python -m pytest -q` depois de instalar as dependências de desenvolvimento necessárias.

## Produção

Use `Dockerfile.production`, `compose.production.yaml`, `deploy.env.example` e uma infraestrutura com volume persistente. Configure HTTPS, backup, chave Flask forte, OAuth e as regras do provedor de IA antes de liberar alunos.

**Vercel:** a publicação da interface está preparada como **exemplo** em `deploy/vercel-frontend.example.json`, mas o backend Flask atual **não é serverless-ready** devido ao SQLite e ao worker. Leia `docs/DEPLOY-VERCEL.md` antes de publicar.

**Suporte por e-mail:** configurar `SUPPORT_EMAIL`, `SUPPORT_FROM_EMAIL` e `RESEND_API_KEY`. Consulte `docs/SUPORTE.md`.

**Auditoria e pendências:** `docs/REVISAO-TECNICA.md`.

> Não publique `.env`, bancos `.db`, o histórico Git exportado de outra instalação ou chaves de serviços. Um ZIP anterior que continha segredos exige rotação das credenciais potencialmente expostas.
