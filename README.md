# Correção de status de tópicos do voaAM

## Problemas corrigidos

1. `public/js/data/topics.js` tinha tópicos com `status: 'done'` e `status: 'partial'` fixos. Por isso eles apareciam concluídos sem o aluno fazer o quiz.
2. `public/js/modules/aula.js` somava aula e dava XP ao abrir o quiz; não registrava a conclusão ao terminar.
3. `public/js/modules/materia.js` renderizava somente o status estático e não consultava progresso salvo.
4. O banco não tinha tabela para conclusões por tópico.

## Arquivos alterados

- `app.py`: adiciona GET/POST `/api/topicos-concluidos`, exigindo sessão Flask.
- `database/schema.sql`: cria `topicos_concluidos` de forma não destrutiva (`CREATE TABLE IF NOT EXISTS`).
- `public/js/data/topics.js`: remove os status iniciais fixos.
- `public/js/modules/materia.js`: mostra o check apenas para tópicos concluídos e lê/salva o progresso pelo Flask, com cache local como fallback.
- `public/js/modules/aula.js`: registra conclusão quando todas as perguntas do quiz forem respondidas; não conclui ao abrir nem ao fechar antes do fim. Bônus de 10 XP e contagem da aula só acontecem na primeira conclusão daquele tópico.
- `public/js/modules/auth.js`: guarda o ID do usuário para isolar o cache local por conta.
- `public/js/script.js`: remove os status fixos do script legado (não é carregado pelo roteador modular atual).

## Aplicação

Extraia o ZIP na raiz do projeto (a pasta que contém `app.py`, `database/` e `public/`), permitindo substituir os arquivos correspondentes.

Depois execute:

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
