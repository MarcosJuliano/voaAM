# voaAM

Plataforma de estudo para ENEM, PSC, SIS e MACRO.

## Responsividade, redação e classificação

- Praticar, Redação, Estudar, Provas, Perfil e Ranking usam a estrutura de página responsiva. Treino personalizado e simulado completo compartilham as classes de cabeçalho, enunciado, alternativas e ações.
- A avaliação do Gemini salva a redação, a nota estimada e o relatório na conta. Concluir o mesmo texto reaproveita o registro. Uma revisão do texto pode receber sua própria avaliação. A análise local continua disponível sem pontuação.
- Questões e alternativas são embaralhadas em novas tentativas, com correção baseada no gabarito original.
- O ranking considera o XP registrado no SQLite para alunos ativos. Empates compartilham a posição. A lista exibe o primeiro nome e a inicial do último sobrenome.

## Aplicação

execute:

```bash
docker compose up --build
```

Para atualizar uma instalação existente, copie os arquivos desta versão sobre o projeto e mantenha seu `.env` e `instance/voaam.db`. O pacote traz `.env.example` para instalações novas. A avaliação Gemini usa o modelo definido no seu `.env`.

## Comportamento esperado

- Ao abrir a tela Estudar, nenhum tópico aparece concluído só por estar escrito assim nos dados antigos.
- Abrir um quiz ou sair antes do resultado não conclui o tópico.
- Ao responder todas as questões do quiz, o status passa para concluído.
- Para usuário autenticado, a conclusão é salva no SQLite e volta a aparecer depois de atualizar o site ou entrar em outro dispositivo.
- Se o endpoint estiver temporariamente indisponível, o navegador usa cache local por usuário como fallback.
- Os quizzes sem dados em `quizzes.js` abrem o placeholder e não são marcados como concluídos.

## Testes básicos

1. Faça login e abra Estudar. Os tópicos ainda não feitos não devem ter check verde.
2. Abra um tópico que tenha quiz, responda todas as perguntas e chegue ao resultado.
3. Volte à lista: o check deve aparecer e a linha mostrará a porcentagem alcançada.
4. Atualize a página ou entre de novo na mesma conta: o check deve continuar.
5. Abra outro tópico e feche antes de responder tudo: ele não deve ser marcado.

## Conta Google

No Perfil, conecte uma Conta Google com e-mail verificado após confirmar a senha do voaAM. O endereço Google pode ser diferente do endereço de login por senha. O servidor rejeita um vínculo que já pertence a outro perfil e não associa perfis apenas por coincidência de e-mail.

No mesmo painel você pode desconectar o Google ou excluir a conta. Ao desconectar, as demais sessões do perfil perdem o acesso. Quem usa somente o Google pode confirmar com o Google e criar uma senha do voaAM na mesma operação. Quando o vínculo vem de uma versão anterior, o e-mail vinculado aparece depois do próximo login via Google.

A exclusão remove o perfil e os registros associados no SQLite, incluindo progresso, redações, notas e XP. Qualquer backup existente segue a política de retenção de quem administra o servidor. Após atualizar, a migração adiciona duas colunas automaticamente às tabelas existentes.

## Avaliações de redação simultâneas

O modo local por regras funciona sem plano de API e oferece apenas orientações estruturais. Para uma nota estimada com IA, configure Gemini ou Ollama. Os dois provedores usam a mesma rubrica e o mesmo histórico. Os textos só são enviados ao provedor escolhido no editor.

### Gemini

Use `ATIVAR_GEMINI=true`, `GEMINI_API_KEY` e um `GEMINI_MODEL` disponível no seu projeto. Confira as cotas ativas no [Google AI Studio](https://aistudio.google.com/rate-limit?timeRange=last-28-days). Um erro 429 indica limite de uso. Um 503 do provedor indica indisponibilidade temporária. Para usar apenas a cota gratuita, confira se o projeto está configurado para o plano gratuito antes de ativar.

### Ollama em infraestrutura própria

Execute o Ollama em uma máquina acessível pelo contêiner web, em rede privada. Baixe no Ollama um modelo instruído que aceite saída estruturada e avalie seu desempenho em português com redações já corrigidas. Configure no `.env` do voaAM:

```dotenv
ATIVAR_OLLAMA=true
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=nome-do-modelo-instalado
REDACAO_IA_CONCORRENCIA=2
```

O endereço do exemplo supõe um serviço chamado `ollama` na mesma rede Docker. Este ZIP não instala o Ollama. No servidor Ollama, teste `OLLAMA_NUM_PARALLEL=2` se a memória disponível suportar. A configuração precisa ser aplicada ao processo do Ollama. O modelo roda na sua máquina e usa os recursos dela. [Concorrência e memória no Ollama](https://docs.ollama.com/faq#how-does-ollama-handle-concurrent-requests)

### Piloto e produção

O voaAM aceita uma análise de IA por aluno ao mesmo tempo e limita quantas correções simultâneas entram no provedor por processo web. O padrão é 2. Vários processos web multiplicam esse limite. Ao alcançar o limite, o site pede para tentar novamente. A correção é síncrona nesta versão.

Para publicar para várias turmas, use uma fila persistente compartilhada (por exemplo, Redis com RQ ou Celery), com processos de correção separados do Flask e limite global compatível com o provedor. Grave o estado do trabalho para que o aluno possa sair da página e voltar ao histórico. Reprocesse falhas transitórias com espera entre tentativas. Teste com a quantidade esperada de alunos e meça o tempo de espera, erros e consumo antes de ampliar. Use um servidor WSGI em produção e configure um segredo próprio e HTTPS.
