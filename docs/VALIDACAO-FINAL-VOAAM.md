# voaAM — Validação final do ambiente de testes (24/11/2026)

Este documento descreve o que foi alterado na branch `finalizacao-testes-voaam-20261124` e os passos para validar sem modificar o banco principal.

## Alterações incluídas

- Contagem de solicitações da Cloudflare em janela UTC móvel de 24 horas, compatível com PostgreSQL e SQLite.
- Avaliações pendentes/concluídas ocupam a cota por usuário; falhas técnicas não ocupam a cota de correções úteis, mas possuem limite independente para evitar abuso.
- A proteção existente contra XP duplicado **foi mantida**: `recompensas_redacoes_assinaturas` garante um único crédito para a assinatura do texto por usuário; novo teste de regressão verifica duas avaliações concluídas da mesma redação.
- O cookie de sessão é sempre `Secure` quando `VERCEL=1`; respostas `/api/` que ainda não definem cache recebem `private, no-store`.
- O esquema de desenvolvimento SQLite inclui os provedores `cloudflare` e `openai`. **Não execute o schema SQLite no Supabase**.
- Testes locais sem chamadas às APIs pagas ou gratuitas.

## Testes isolados sem tocar em produção

```bash
cd "$HOME/Área de trabalho/voaam/voaAM"
git fetch origin
git switch finalizacao-testes-voaam-20261124

# Preferir o container com as dependências já instaladas, mas forçar SQLite de teste:
docker compose exec -T \
  -e DATABASE_URL= -e APP_ENV=development -e VERCEL= \
  web python -m unittest discover -s tests -p 'test_finalizacao_voaam.py' -v

git diff --check
```

A execução acima usa banco SQLite temporário criado por `test_v6`, não o Supabase. Se o Docker Compose não estiver ativo, crie um ambiente virtual Python com `requirements.txt` e execute a mesma suíte com `DATABASE_URL='' APP_ENV=development VERCEL=''`.

## Implantação de teste

```bash
git switch finalizacao-testes-voaam-20261124
npx --yes vercel@latest deploy --prod
```

O destino precisa ser **voaam/voa-am-teste**. Não faça merge com `main` nem reconfigure o banco principal.

As variáveis de Production do projeto de teste devem manter `ATIVAR_CLOUDFLARE=true`, `ATIVAR_OPENAI=false`, `ATIVAR_GEMINI=false`, `ATIVAR_OLLAMA=false`. Nunca exiba os valores de `CLOUDFLARE_API_TOKEN`, `DATABASE_URL` ou `WORKER_TOKEN`.

## Checklist de teste manual

1. Abra a implantação de teste em janela privada/autenticada pela Vercel. Faça cadastro e login fictícios, recarregue e teste logout.
2. Confirme `/api/health` (200), `/api/config-publica` (inclui `cloudflare`) e que a interface mostra Cloudflare.
3. Envie apenas uma redação fictícia sem nomes nem dados sensíveis. O fluxo deve ir de `fila` a `processando` e `concluida`.
4. Confira o relatório com cinco competências, sem inventar citações, e o histórico após recarregar.
5. Confirme no Supabase de **teste** que a recompensa por assinatura do texto não é duplicada; **não teste exclusão de usuários reais**.
6. Teste o limite com uma conta fictícia, sem disparar chamadas de IA desnecessárias. Use a suíte automatizada para verificar falhas e duplicatas.
7. Confirme os logs do worker sem incluir texto de redação, tokens ou credenciais.

## Antes de abrir para estudantes reais (pendências)

**Aprovação pública NÃO está implícita nesta branch.** É necessário fazer revisão adicional, incluindo:

- Termos, política de privacidade, base legal/LGPD, retenção e exclusão de dados e contato do responsável.
- Salvaguardas para menores: autorização apropriada, minimização de dados, revisão dos termos atuais do provedor e tratamento seguro das redações.
- Proteção contra abuso em cadastro/login, CSRF para operações com sessão, restauração de backups, moderação de imagens e revisão de Google OAuth.
- Verificar qualidade pedagógica da correção em amostra de redações com notas humanas; a nota da IA não é oficial.
- Verificar o orçamento/franquia Workers AI, erros de limite, limites de tempo do Cron e observabilidade.
- Testes completos de API, usabilidade/acessibilidade, dispositivos móveis e demais funcionalidades (simulados, provas, suporte).

Se algum teste de avaliação falhar, consulte `avaliacoes_redacao.erro` e os logs protegidos da Vercel antes de reenviar.
