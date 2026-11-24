# Atualização: tela de abertura + esqueci minha senha

## O que foi modificado

**Tela de carregamento:** `public/index.html` e novo `public/css/boot-loader.css`. Aparece ao abrir o site e é encerrada em `authInit()` no `public/js/modules/auth.js`. Não altera as animações já existentes de atividades. Se uma dependência falhar, existe limite de 10 segundos para não manter a página bloqueada.

**Recuperação de senha:** `public/pages/auth.html`, `public/css/auth.css`, `public/js/modules/auth.js`, `app.py` e novo `recuperacao_email.py`. Fluxo: solicitar link pelo e-mail → receber via Resend → abrir o link → definir nova senha (mínimo 8 caracteres). O token assinado expira em 15 minutos e deixa de funcionar após a primeira redefinição, pois está vinculado ao hash da senha. Ao redefinir, as sessões anteriores são invalidadas pelo incremento de `sessao_versao`.

**Não foi criado nem alterado esquema de banco:** compatível com a tabela `usuarios` existente, em SQLite e PostgreSQL.

## Variáveis necessárias

Adicione no `.env` local, no ambiente de backend e nas variáveis de ambiente do **projeto Vercel que executa Flask** (se for o caso):

```dotenv
PUBLIC_BASE_URL=https://URL-PUBLICA-DO-FRONTEND
RESET_FROM_EMAIL=suporte@SEU-DOMINIO-VERIFICADO
RESEND_API_KEY=CHAVE_EXISTENTE_DO_RESEND
FLASK_SECRET_KEY=CHAVE_SECRETA_EXISTENTE_SEM_ALTERAR
```

O `RESET_FROM_EMAIL` pode ser omitido se `SUPPORT_FROM_EMAIL` já estiver configurado **com domínio verificado que permite enviar para usuários reais**. `onboarding@resend.dev` é para testes e pode não entregar a estudantes com e-mails externos. Nunca altere `FLASK_SECRET_KEY` de produção ao atualizar: alterar invalida sessões e links emitidos.

`PUBLIC_BASE_URL` deve ser a URL **HTTPS da interface pública** (sem barra final), e não a URL interna de banco de dados ou o endpoint de API. Se frontend e API usam origens diferentes, as rotas `/api/*` devem continuar encaminhadas ao Flask pelo mesmo domínio.

## Passo a passo local (não envolve produção)

1. Faça backup do projeto atual e crie uma branch: `git switch -c feat/loader-recuperacao`.
2. Aplique os arquivos do ZIP atualizado ao repositório local **sem substituir seu `.env` ou seu banco**.
3. Preencha `PUBLIC_BASE_URL` com `http://localhost:5000` no `.env` **apenas no desenvolvimento**, e use um remetente Resend habilitado para o e-mail de teste.
4. Execute `docker compose up --build -d`.
5. Acesse `http://localhost:5000` e confira tela de abertura, login e cadastro. Clique em "Esqueci minha senha", solicite por um e-mail de teste cadastrado e confirme o recebimento. Siga o link, cadastre a nova senha e teste o login. Links repetidos devem falhar.
6. Verifique os logs sem colar credenciais: `docker compose logs --tail=80 web`.
7. Confirme que os testes existentes continuam aprovados no ambiente de teste. Faça uma verificação separada em staging com PostgreSQL antes de publicar na produção.

## GitHub

```bash
git status -sb
git diff --check
git add app.py recuperacao_email.py docker-compose.yml deploy.env.example docs/ATUALIZACAO-LOADER-RECUPERACAO.md public/index.html public/css/boot-loader.css public/css/auth.css public/pages/auth.html public/js/modules/auth.js
git commit -m "Adiciona carregamento inicial e recuperacao segura de senha"
git push -u origin feat/loader-recuperacao
```

Abra um Pull Request da branch para a branch que o **seu projeto Vercel de teste realmente usa**. Não faça push diretamente para `main` nem deploy em produção sem validar as variáveis e os testes; o projeto contém branches de migração e testes diferentes.

## Vercel

1. Na Vercel, confirme qual projeto (`teste` ou `produção`) e qual branch estão associados ao deploy.
2. Em Settings → Environment Variables, configure `PUBLIC_BASE_URL`, `RESET_FROM_EMAIL` e `RESEND_API_KEY` **no projeto que roda o backend Flask**. Preserve `DATABASE_URL`, `FLASK_SECRET_KEY` e as configurações existentes.
3. Publique primeiro o preview da branch, valide o envio de e-mail e os links. Se alterar variáveis, faça redeploy para que sejam carregadas.
4. Só depois faça merge/promoção para produção. Se o projeto Vercel hospedar **somente o frontend**, é indispensável atualizar o **backend hospedado separadamente**, pois a recuperação usa novas rotas Flask.

## Cuidados antes do público

O endpoint inclui limitação básica por e-mail/IP em memória, mas **isso não é suficiente para instâncias distribuídas ou para produção pública**. Configure limite de requisições global/distribuído por IP e por e-mail no edge/gateway (por exemplo, WAF/Cloudflare com regras apropriadas), monitore custos de envio e teste proteção contra abuso. Não envie tokens ou links de recuperação aos logs. Garanta que domínio de envio Resend esteja verificado.
