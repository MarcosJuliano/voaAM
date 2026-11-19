# voaAM — atualização após teste da turma (novembro de 2026)

Esta é uma atualização **para aplicar sobre uma cópia do projeto**, com migrações aditivas no SQLite. Não contém a conta dos alunos nem `.env`.

## Alterações incluídas

- **XP de questões:** 20 XP somente para a primeira resposta correta de cada questão por aluno. Erros concedem 0 XP, mas o aluno pode tentar de novo e ganhar o XP quando acertar. A migração retira os antigos 5 XP por erro uma única vez, respeitando XP não negativo.
- **XP de redação:** uma correção concluída concede `nota_estimada // 25` XP (0–40). É a primeira avaliação válida por versão. Uma assinatura de tema e texto impede ganhar XP ao excluir e reenviar a mesma redação. O histórico existente de redações concluídas recebe crédito na primeira migração.
- **Ranking:** altura limitada a aproximadamente cinco alunos com rolagem interna, paginação e botão **Ir para minha colocação** abaixo da lista. Ao selecionar um estudante, o perfil mostra nome abreviado, banner, XP, tentativas, acertos, precisão, etapa de estudo, vestibulares de interesse, questões diferentes, matéria em destaque e matéria mais praticada. O destaque usa o maior percentual de acertos de matérias com ao menos três questões distintas respondidas e um acerto. E-mails, redações e credenciais não são públicos.
- **Imagens do perfil:** fotos e banners são convertidos para JPEG e aparecem no Ranking para estudantes com sessão iniciada após salvar. O endereço da imagem muda quando o arquivo muda, para atualizar a foto na lista e no perfil do Ranking.
- **Perfil e banner:** abra Alterar banner no Perfil ou na visualização ampliada do seu banner. O editor mostra as cores em Banner padrão e o seletor de arquivo em Banner personalizado. Ao escolher uma imagem, ajuste o enquadramento 4:1 com zoom e posição e confirme antes de salvar o perfil. O banner personalizado fica guardado ao voltar para o tema padrão.
- **Cadastro:** campo de confirmação de senha; validação repetida no servidor quando a confirmação é enviada.
- **Acesso via Google:** mensagem de boas-vindas depois de uma sessão iniciada pelo Google.
- **Início:** ao entrar pela primeira vez após a atualização, o aluno escolhe disciplina preferida. O Início mostra cartões de exercícios por dificuldade. Os cartões de Matemática abrem o assunto em Praticar, e os de outras disciplinas abrem o treino personalizado com a disciplina selecionada.
- **Simulados:** ao abrir Praticar, escolha o vestibular na lista.
- **Estudar:** os conteúdos de Matemática e Redação seguem disponíveis.
- **Vídeos:** vídeos do YouTube permitidos para incorporação tocam dentro da aula, em `youtube-nocookie.com`. Alguns vídeos podem bloquear incorporação por decisão do autor.
- **Suporte:** aluno cadastra dúvidas, recebe protocolo; uma conta ADMIN consulta `/api/admin/suporte`. **Ainda não há notificações por e-mail ou chat de atendimento.**
- **Menu lateral:** traz o controle de recolher ou expandir na parte de baixo, acima da seção de Suporte e Sair. No layout com navegação inferior, Suporte e Sair ficam no Perfil.
- **Barra de XP:** a linha inferior do cabeçalho funciona como barra de progresso. A linha engrossa e mostra o nível e os detalhes de XP com mouse, teclado ou toque. O nível 50 exige completar o catálogo.
- **Tema claro:** reflexos suaves azuis.
- **Segurança:** `.dockerignore` impede copiar `.env`, banco local e arquivos Git para a imagem Docker de desenvolvimento.

## Instalação

1. Pare a aplicação antes do backup: `docker compose down`.
2. Faça backup de `instance/voaam.db` e `.env` fora da pasta do projeto.
3. Extraia os arquivos do patch na raiz do projeto, onde estão `app.py` e `docker-compose.yml`.
4. **Não copie banco e segredos do ZIP de origem para o GitHub.** A versão deste pacote não inclui esses arquivos.
5. Rode `docker compose up -d --build`.
6. Teste `docker compose exec web python tests/test_feedback_2026.py` e `docker compose logs --tail=80 web corretor`.
7. Atualize o navegador com Ctrl+Shift+R.

**Atenção ao XP:** a migração reduz o saldo dos alunos que receberam o bônus de 5 XP por erros antigos. Avise a turma antes de aplicar. Depois, o saldo seguirá as novas regras.

## Moderação opcional de imagens

Por padrão, foto e banner personalizado aparecem no Ranking após salvar, inclusive os uploads que ficaram pendentes em versões anteriores. Para exigir revisão humana antes de publicar novos uploads, defina `MODERAR_IMAGENS_PERFIL=true` no ambiente do servidor e reinicie o serviço. Nesse modo, as imagens pendentes ficam visíveis para o dono da conta e para os moderadores. Para conceder a permissão de revisão a uma conta existente, execute o comando abaixo.

```bash
docker compose exec web python -m flask --app app imagens moderador 'seu-email@exemplo.com'
```

Na conta autorizada, abra o perfil no **Ranking**, confira as imagens e clique em **Aprovar foto** e **Aprovar banner**. Use `--revogar` no fim do comando para remover essa permissão extra. Contas ADMIN já têm acesso à revisão de imagens.

Um classificador automático de imagens exigirá avaliar modelos, falsos negativos, custos e proteção de dados; **não incluí um detector automático sem testes de qualidade**.

## Endereços `@voaam.edu.br`

O voaAM **não cria e-mails reais**. Para isso, é necessário possuir o domínio, gerenciar DNS (MX), provedor de correio, políticas antispam e contas. `edu.br` não está disponível para qualquer projeto independente: exige elegibilidade institucional. A autenticação por endereço externo e senha voaAM já funciona; não inventar um domínio institucional evita confundir os estudantes.

## Vercel

O Vercel consegue hospedar Flask como funções HTTP, mas a versão atual não está preparada para rodar inteira lá: SQLite local precisa de disco persistente e `fila_redacao.py` é um worker contínuo. Para uma arquitetura viável, são necessários pelo menos um **PostgreSQL externo**, um worker durável hospedado separadamente, e configuração de arquivos estáticos, cookies e domínio. Hospedar na Vercel *sem* essas migrações pode causar perda de dados ou correções presas na fila. O Tailscale Funnel + Docker continua sendo a opção de testes disponível neste momento.

Documentação: https://vercel.com/docs/frameworks/backend/flask , https://vercel.com/docs/functions/runtimes .

## Segurança antes de publicar

O ZIP original entregue para revisão continha `.env`, `.env.funnel`, `deploy.env`, banco e `.git`. **Esses arquivos foram excluídos do pacote distribuível**. Se alguma chave já foi compartilhada, revogue e substitua a chave Gemini e o segredo do Flask. Não suba fotos ou redações dos alunos em arquivos ZIP públicos.

## O que ainda exige validação

Os testes de sintaxe e a inicialização/migração isolada do SQLite foram executados. Os testes Flask integrados foram escritos, mas exigem as dependências no Docker (`Flask` não estava disponível neste ambiente). O navegador do ambiente bloqueou abrir o endereço local de teste; portanto, revise o visual e o fluxo de login no seu navegador antes de liberar a turma.

Contas autorizadas podem revisar fotos e banners diretamente no perfil do estudante no Ranking.


## Correções da interface

- **Alterar banner** abre o editor com as opções padrão e personalizada. Ao aplicar o recorte, o editor fecha e a nova imagem aparece como prévia no Perfil. Use **Salvar alterações** no fim do formulário para gravar o banner.
- Foto e banner são gravados juntos pelo botão **Salvar alterações**. O mesmo botão confirma a remoção de uma imagem.
- No desktop, a barra lateral abre e fecha com uma transição que acompanha a largura do conteúdo. Em telas baixas, o menu lateral ainda pode ser rolado.
- A parte preenchida da barra de XP alterna entre azul e roxo. Os detalhes se abrem para baixo, logo abaixo da barra. Ela usa o XP confirmado pelo servidor. O Ranking atualiza esse valor mesmo se dados auxiliares de desempenho estiverem indisponíveis.
- Clicar fora de uma janela modal fecha a janela, exceto durante operações que bloqueiam o fechamento.
