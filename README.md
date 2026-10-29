## Coisas a ser adicionadas

- salvar a nota que a IA da a redação ao concluir avaliação, e adicionar indicador de analise da IA para evitar confusão (achar que o site travou).
- arrumar o CSS dos treinos personalizados.
- adicionar aleatorização de questões e respostas.
- remover arquivos apagados e não utilizados do produto final.

## Aplicação

execute:

```bash
docker compose up --build
```

A tabela `topicos_concluidos` será criada na inicialização do Flask, sem apagar usuários nem progresso existente. Não apague `instance/voaam.db`.

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
