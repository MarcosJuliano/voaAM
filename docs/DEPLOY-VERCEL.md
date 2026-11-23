# Preparação do voaAM para Vercel

## Estado atual — decisão técnica obrigatória

**O projeto completo NÃO deve ser publicado como Flask serverless na Vercel sem mudar a persistência.**
O Flask atual inicializa o banco SQLite na importação (`banco.py`) e mantém contas, imagens, XP, redações e chamados nesse arquivo. As Functions da Vercel têm sistema de arquivos somente leitura (salvo `/tmp`, temporário). O corretor de redações (`fila_redacao.py`) também depende de um processo contínuo. Publicar diretamente com o banco na Function coloca esses dados em risco ou faz a importação falhar.

## Caminho recomendado sem reescrever o site

1. Hospede o **Flask + SQLite persistente + corretor** em VPS ou serviço compatível com processo contínuo, volume persistente, HTTPS e backup, usando `compose.production.yaml`.
2. Garanta uma origem **HTTPS pública e estável** para esse backend, por exemplo `https://api.SEU-DOMINIO.com`.
3. Faça uma cópia de `deploy/vercel-frontend.example.json` como `vercel.json` na raiz e substitua a URL de exemplo pela URL real do backend.
4. Importe o repositório na Vercel com Framework Preset **Other**. O arquivo define `framework: null` e serve a pasta `public`.
5. Teste `/api/health` pela URL da Vercel; ele deve encaminhar ao Flask persistente. Teste a criação de conta, login, envio de chamado, correção e imagens **em dispositivos distintos**.
6. No Google Cloud, inclua a origem HTTPS da Vercel nas **origens JavaScript autorizadas** do OAuth Web.
7. Adicione um domínio seu, monitore o backend e rode os testes de segurança antes de abrir ao público.

**Importante:** o frontend publicado diretamente pela Vercel ainda contém o marcador de cache `__VOAAM_FRONTEND__`. Ele é inofensivo, mas nessa forma estática a substituição automática feita pela rota Flask não ocorre. Para uma versão de produção definitiva, configure uma etapa de build para substituí-lo pelo identificador da publicação.

## Alternativa mais profunda

Migrar todas as consultas de `sqlite3` para PostgreSQL externo, transferir os dados com validação e trocar o worker contínuo por uma fila gerenciada. Só então avaliar hospedar as APIs Flask na Vercel. **Essa migração não está implementada neste pacote**.

## Documentação da plataforma

- https://vercel.com/docs/frameworks/backend/flask
- https://vercel.com/docs/functions/runtimes
- https://vercel.com/docs/routing/rewrites
- https://vercel.com/docs/project-configuration
