# voaAM

Plataforma de estudo para ENEM, PSC, SIS e MACRO.

<p> ---> correções para o futuro</p>

- simulados da pratica
- adicionar mais animações
- testar em servidor as IAs

## Responsividade, redação e classificação

- Praticar, Redação, Estudar, Provas, Perfil e Ranking usam a estrutura de página responsiva. Treino personalizado e simulado completo compartilham as classes de cabeçalho, enunciado, alternativas e ações.
- Avaliações por Ollama e Gemini salvam cada envio, nota estimada e relatório na conta. O Histórico acompanha a fila e mostra os últimos envios. A aba Rascunhos exibe os textos guardados no navegador.
- Questões e alternativas são embaralhadas em novas tentativas, com correção baseada no gabarito original.
- O ranking considera o XP registrado no SQLite para alunos ativos. Empates compartilham a posição. A lista exibe o primeiro nome e a inicial do último sobrenome.

- O Histórico da redação agrupa as versões por tema. O cartão abre a versão mais recente e oferece um seletor para ler ou excluir uma versão específica.
- O Ranking reúne nível, XP, atividade e gráficos privados por disciplina. Os gráficos usam a última resposta de cada questão identificada no acervo e nos quizzes. A precisão do resumo inclui todas as tentativas.
- O Perfil reúne dados pessoais, vestibulares, e-mail de acesso, senha, foto e vínculo com o Google. A foto é redimensionada e guardada no SQLite. A troca de senha aceita a senha atual ou a confirmação pela Conta Google vinculada.

## Aplicação

Execute o web, o corretor e o Ollama com o Docker Compose.

```bash
docker compose up -d --build
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

Depois de confirmar **Enviar para correção**, o site salva a versão da redação e registra o envio no SQLite. O serviço `corretor` processa a fila fora do Flask. O botão mostra a fila e a análise e fica desativado ao concluir a versão enviada com a configuração selecionada. O editor exibe o relatório abaixo das ações. O aluno pode fechar a página ou enviar outra versão e acompanhar no Histórico desde **Na fila** até **Concluída** ou **Falhou**. O envio idêntico para o mesmo provedor e nível de detalhe reaproveita a solicitação já em andamento. Uma nova avaliação após o término gera outro registro.

No Histórico, cada redação tem a última nota e a seção **Notas e envios** com as avaliações da versão salva. Avaliações salvas antes desta atualização são importadas a partir da última nota que ainda existir em cada redação. Os rascunhos ficam no navegador em que foram salvos, separados por conta. A análise local por regras dá orientações estruturais sem gerar nota.

### Ollama em infraestrutura própria

Use estas configurações como ponto de partida no computador em que o modelo pequeno já funcionou.

```dotenv
ATIVAR_OLLAMA=true
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=qwen3:0.6b
REDACAO_IA_CONCORRENCIA=1
```

O serviço Ollama do Compose guarda os modelos no volume `ollama_data`. Se o modelo ainda não estiver baixado, rode `docker compose exec ollama ollama pull qwen3:0.6b` após iniciar os serviços. A opção **Resumida** usa menos geração de texto. A **Detalhada** solicita pontos fortes, ajustes por competência e exemplos de reescrita, com citações validadas contra o texto. Se o Ollama não conseguir entregar a análise detalhada, o corretor pode reaproveitar uma resposta válida com as cinco competências ou tentar uma análise resumida. O relatório informa a modalidade entregue. Sua qualidade e duração dependem do modelo e do hardware.

### Gemini

A integração usa `ATIVAR_GEMINI=true`, `GEMINI_API_KEY` e `GEMINI_MODEL`, com vagas configuradas em `REDACAO_GEMINI_CONCORRENCIA`. Ao escolher Gemini, a redação segue para o Google. Consulte as [cotas do projeto](https://aistudio.google.com/rate-limit?timeRange=last-28-days) e os [termos da API Gemini](https://ai.google.dev/gemini-api/terms?hl=pt-br). Eles vedam o uso da API em aplicações voltadas a menores de 18 anos ou que provavelmente serão acessadas por eles. Mantenha `ATIVAR_GEMINI=false` nessa instalação escolar.

Para testar o Gemini em uma instalação de desenvolvimento para adultos, configure o `.env` com uma chave do AI Studio. O modelo padrão é `gemini-3.5-flash-lite`. A configuração explícita do seu projeto tem prioridade. Aplique as mudanças aos dois serviços.

```bash
docker compose up -d --build web corretor
docker compose logs --tail=60 corretor
```

Se o Gemini estiver desabilitado ou sem chave, o editor informa o motivo. Se o provedor recusar um envio, o editor e o Histórico exibem o erro e o serviço `corretor` registra o motivo sem gravar a chave ou o conteúdo da redação nos logs.

### Piloto com uma turma

O limite de vagas é independente para cada provedor. Dez ou trinta estudantes podem entrar na fila sem ocupar dez ou trinta vagas simultâneas. Em um servidor mais forte, teste `REDACAO_IA_CONCORRENCIA=2`; o Compose repassa o mesmo valor para `OLLAMA_NUM_PARALLEL`. Meça o tempo de espera, o tempo de correção e a memória com redações representativas antes de aumentar. O contexto e o paralelismo do Ollama afetam a memória necessária. [Concorrência no Ollama](https://docs.ollama.com/faq#how-does-ollama-handle-concurrent-requests)

Para verificar o processo e os provedores, rode `docker compose ps` e `docker compose logs --tail=80 corretor ollama`. Ao publicar, use um servidor WSGI com HTTPS e uma chave Flask própria.
