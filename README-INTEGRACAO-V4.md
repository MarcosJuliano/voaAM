# voaAM v4 — Flask + SQLite + treino unificado

Este pacote integra o frontend do `voaAM(3).zip` com os conceitos de seleção aleatória do projeto de console `VoaAM-Backend.zip`. O programa .NET é mantido apenas como referência de estudo em `integracao/questoes-csharp/` (código C# e quatro arquivos JSON válidos). **O site não precisa executar .NET nem Node.js para funcionar.**

## Antes de instalar — preservar contas e progresso

1. Pare o serviço com `docker compose down`. **Não** use `down -v`, não apague `instance/voaam.db` e não use `git clean -fdx`.
2. Faça backup da pasta atual e especialmente de `instance/voaam.db` (se estiver usando o banco local). Um exemplo, a partir da pasta atual: `cp instance/voaam.db "instance/voaam-backup-$(date +%Y%m%d-%H%M%S).db"`.
3. Extraia **o conteúdo de `voaAM/` do ZIP** na raiz de uma cópia de seu projeto ou sobreponha os arquivos de código ao original. Este ZIP **não contém** `instance/voaam.db`, `.env`, senhas ou contas reais. Se você escolheu uma pasta nova, copie somente seu banco existente para `instance/voaam.db` nessa nova pasta.
4. Mantenha suas variáveis `.env`; configure uma `FLASK_SECRET_KEY` longa, única e secreta. Se mudar a chave, as sessões anteriores serão invalidadas e será preciso entrar novamente.
5. Inicie com `docker compose up --build`, abra `http://localhost:5000` e faça uma atualização forçada (`Ctrl+Shift+R`) no navegador.

### Validar no Docker

```bash
docker compose exec web python tests/test_integridade_v4.py
docker compose exec web python tests/test_v4.py
curl -s http://localhost:5000/api/health
curl -s http://localhost:5000/api/treino/catalogo
curl -s http://localhost:5000/api/temas-redacao
```

`tests/test_v4.py` cria um **banco temporário separado** para testes de API, sem modificar contas existentes. `test_integridade_v4.py` verifica as 1.257 questões cadastradas, imagens, SQL e JSONs.

## Funcionalidades e arquivos alterados

| Área | Arquivos | Alteração |
|---|---|---|
| Questões unificadas | `database/questoes_treino.json`, `scripts/gerar_catalogo.js`, `integracao/questoes-csharp/` | Combina questões do banco de exercícios existente, provas cadastradas e quatro JSONs C#. Elimina questões sem alternativa/gabarito válido. |
| Treino personalizado | `treino_api.py`, `public/js/modules/treino-personalizado.js`, `public/pages/praticar.html` | Filtros de vestibular/ano/disciplina/assunto/origem e quantidade, sorteio Fisher–Yates, correção no Flask, progresso salvo no SQLite. |
| Registro de respostas legadas | `treino_api.py`, `public/js/modules/exercicios.js`, `public/js/modules/simulado_completo.js`, `public/js/modules/nivel.js` | Resultados dos exercícios e simulados anteriores também podem contar na meta de conclusão. O servidor valida o gabarito. |
| Níveis | `nivel_api.py`, `public/js/modules/nivel.js`, `public/pages/perfil.html` | Níveis 1–49 por XP; o nível 50 exige registro completo de questões, quizzes e todos os temas verificados da biblioteca. |
| Logout | `public/components/header.html`, `public/js/modules/auth.js` | Botão de saída que encerra a sessão Flask. Em caso de falha de rede, informa o erro em vez de fingir que saiu. |
| Vidas | `public/js/modules/state.js`, `public/css/style.css` | Popover anexado ao `body`, acima da home, sem ser cortado pela área com `overflow`. |
| Praticar | `public/js/modules/praticar.js` | O card de simulado aparece já na primeira visita à tela. |
| Sair do simulado | `public/components/simulado-completo-view.html`, `public/js/modules/simulado_completo.js` | Diálogo estilizado no lugar do `confirm()` nativo. |
| SIS/PSC | `public/js/modules/banco-provas.js` | Botões para simulado online por etapa quando os dados estiverem presentes. **Esses conjuntos agregam questões cadastradas de 2023–2025**, não são uma reprodução exata de um único ano. |
| Redações | `database/temas_redacao.json`, `redacoes_api.py`, `public/js/modules/redacao.js`, `public/pages/redacao.html` | Temas identificados, fontes externas, editor, histórico por usuário em SQLite, avaliação IA opcional. |
| Banco | `database/schema.sql`, `banco.py` | Cria tabelas de treinos sem apagar dados e inclui uma migração de coluna `tema_id` para bancos antigos. |
| Infraestrutura | `.gitignore`, `.dockerignore` | PDFs, credenciais e bancos pessoais ficam fora do Git e do contexto do Docker. |

## Regras do nível máximo

O nível 50 só aparece se o servidor confirmar que o usuário concluiu **100% do catálogo conhecido nesta versão**: cada questão identificada ao menos uma vez (resposta certa ou errada), todos os tópicos do currículo com quiz concluído e uma redação com ao menos 100 caracteres em cada tema cadastrado. O número total cresce quando o catálogo for ampliado. Níveis intermediários dependem do XP, que **ainda segue o sistema local preexistente do frontend**; futura centralização do XP no SQLite é recomendada.

## Treinos personalizados

No menu **Praticar → Treino personalizado**, escolha o vestibular (ou todos), ano, disciplina, assunto, origem e quantidade de questões. O servidor seleciona sem repetição dentro de cada tentativa. É possível refazer uma questão em novo treino. O gabarito não é devolvido pela API antes da resposta. **A versão antiga de exercícios ainda contém seus próprios gabaritos em JS público**, portanto esta versão não oferece ambiente de prova inviolável; migrar completamente as telas antigas para a API é uma melhoria futura.

O arquivo `database/questoes_treino.json` está **fora de `public/`**. Não o mova para a pasta de recursos públicos. Para reconstruir o catálogo após adicionar questões ao projeto (necessita Node.js apenas como ferramenta de desenvolvimento):

```bash
node scripts/gerar_catalogo.js
```

Os arquivos `integracao/questoes-csharp/` são mantidos apenas como referência do algoritmo/dados, não geram container .NET.

## Redação e IA

Temas atualmente identificados: ENEM 2023, 2024 e 2025; SIS 2024 etapas 2 e 3; vestibular UEA aplicado em 2023 e 2024. O portal da fonte é apresentado em cada tema. Esses **não são todos os anos de todas as bancas**; novas propostas só devem entrar após confirmação de sua formulação e ano. Não são copiados textos motivadores de terceiros.

A redação é armazenada por usuário no SQLite. O botão de **Avaliar com IA (opcional)** usa a rota Flask `/api/corrigir-redacao`, que usa Gemini somente quando `GEMINI_API_KEY` está configurada no servidor. Sem chave, o usuário recebe uma mensagem de indisponibilidade e não há requisição ao fornecedor de IA. **API de terceiros pode ter limite, exigir cadastro ou gerar custos de consumo**: se você quer custo externo garantidamente zero, mantenha `GEMINI_API_KEY` vazio e use a escrita, salvamento e temas sem IA. Notas da IA são estimativas pedagógicas, nunca notas oficiais das bancas. Evite enviar informações pessoais no texto para serviços externos.

## PDFs de provas

**Não há PDFs completos neste ZIP.** O menu Banco de Provas abre fontes oficiais do INEP, UFAM/COMPEC e UEA/Vunesp a partir das URLs do catálogo. Isso não depende de Cloudflare R2, conta de armazenamento, serviços pagos ou banco BLOB; o repositório contém apenas as pequenas **imagens de apoio** indispensáveis às questões online. Links externos podem mudar e precisam de revisão periódica.

Se PDFs antigos já fazem parte do seu histórico Git, adicioná-los ao `.gitignore` não os remove do histórico; isso deve ser tratado em um passo separado, sem `push --force` impulsivo.

## Limitações e testes

Foram verificados com Node.js/Python: sintaxe dos JavaScripts e Python, estrutura SQL em banco temporário, 1.257 entradas válidas, imagens presentes e ausência de PDFs no pacote. **Não foi possível executar Flask e o navegador neste ambiente de preparação**, portanto o teste de API em Docker e o teste visual após a instalação continuam necessários.

O pacote não exclui os dados do usuário original; apenas não os distribui. Recomenda-se usar ambiente de desenvolvimento para o Flask (`--debug`) e configurar HTTPS, validação de sessão/CSRF, limites de requisições e revisão das fontes das questões antes de publicar o serviço publicamente.
