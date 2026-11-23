# Revisão técnica para entrega — 23/11/2026

## Verificado no pacote enviado

- Flask com módulos separados para conta, Google, níveis, progresso, treino, redações e perfil.
- Frontend HTML, CSS e JS modular, sem framework de compilação.
- Banco SQLite e migrações no `banco.py` / `database/schema.sql`.
- Docker de desenvolvimento, Docker + Gunicorn + Caddy para produção, worker dedicado de redações e Ollama opcional.
- 54 MB de arquivos no pacote limpo principalmente em **documentos oficiais e imagens de questões**; mantidos por serem conteúdo da plataforma.

## Mudanças neste pacote

- Tipografia padronizada em Inter, títulos sem serifas decorativas, sombras e efeitos de vidro discretos, navegação sem alteração de rotas.
- Suporte agora pode enviar e-mail via API Resend. Gravação no banco precede a notificação, com limite de envios, data de confirmação e comando de reenvio.
- Adicionados cabeçalhos de segurança básicos e validação de chave de sessão no modo `APP_ENV=production`.
- Desabilitado `--debug` por padrão no Compose de desenvolvimento.
- Removidos da **entrega** `.git/`, `.env`, `.env.funnel`, `deploy.env`, `instance/`, `__pycache__/` e protótipos legados de HTML/JS.
- Mantidos `integracao/questoes-csharp/` como referência histórica identificada; ele não é carregado pelo site Flask.
- Adicionados `.dockerignore`, `.vercelignore`, `.env.example` claro, documentação de entrega e guia da Vercel.

## Pendências antes de lançar publicamente

1. **Troque** `FLASK_SECRET_KEY` e chaves de IA se alguma versão anterior do ZIP/commit já as expôs. Não basta adicionar `.gitignore` se o Git ainda rastreia o segredo.
2. Configurar `SUPPORT_EMAIL`, `SUPPORT_FROM_EMAIL` e `RESEND_API_KEY` com domínio de envio validado.
3. Testar autenticação, Google OAuth, recuperação de acesso, moderação de imagens, filas, simulados e suporte num ambiente real, incluindo dispositivos móveis.
4. Adicionar proteção antiabuso de login/cadastro, CSRF para rotas mutáveis e monitoramento centralizado (ainda não implementados).
5. Definir e publicar termos de uso, política de privacidade, retenção e backup, especialmente porque há contas de alunos, possíveis menores e redações pessoais. Removi links fictícios e o atalho de senha esquecida sem implementação para não criar falsa expectativa.
6. Separar banco e worker da Vercel ou fazer migração completa de persistência. Ver `DEPLOY-VERCEL.md`.
7. Revisar desempenho/recursos e direitos de distribuição das provas e imagens oficiais antes de publicar.

**Validação neste ambiente:** sintaxe Python e JavaScript, estrutura JSON/SQLite e teste do módulo de e-mail sem serviço externo. A suíte HTTP de Flask requer instalar dependências (`pip install -r requirements.txt`); esta sessão não tem Flask instalado e a instalação falhou por acesso externo indisponível. Não é correto declarar testes HTTP concluídos.
