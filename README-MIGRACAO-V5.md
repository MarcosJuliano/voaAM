# voaAM v5 — XP no servidor, gabaritos privados, treino, Google e redação

Este pacote **não** substitui o SQLite existente e **não** precisa do projeto C# em produção. O site continua rodando com `docker compose` na porta 5000.

## Antes de instalar

1. **Faça backup da pasta e de `instance/voaam.db`**, com o Docker parado.
2. Preserve seu `.env` real. Não copie um `.env` de outro projeto.
3. Extraia os arquivos sobre uma **cópia** da versão v4, preservando as pastas `database/`, `public/`, `integracao/` e `tests/`.
4. Não apague dados e não use `docker compose down -v` nem `git clean`.
5. Se você escolheu **aplicar apenas o patch**, remova do diretório público os dois arquivos antigos **depois de conferir o backup**: `public/js/script.js` e `public/pages/views.html`. Eles agora estão preservados em `integracao/legacy/`; deixá-los em `public/` manteria respostas de uma versão obsoleta publicamente acessíveis. O ZIP completo já vem sem eles.
6. Rode `docker compose up --build` e, em outro terminal, `docker compose exec web python tests/test_v5.py`.

## Alterações por arquivo

| Arquivo | Alteração |
|---|---|
| `progresso_api.py` (novo) | `/api/progresso`, `/api/avaliacao/responder`, `/api/avaliacao/lote`: correção e XP autoritativos; cada questão concede recompensa apenas uma vez por conta. |
| `treino_api.py` | Filtros com contagem contextual e escolha aleatória no servidor; grava respostas do treino e usa XP centralizado; endpoint legado de registro arbitrário retorna HTTP 410. |
| `app.py` | Registra os novos módulos; valida conclusão de tópicos pelos registros de resposta; Gemini só funciona com `ATIVAR_GEMINI=true`. |
| `database/schema.sql` | Duas novas tabelas: `recompensas_questoes` e `google_identidades`, criadas sem remover dados anteriores. |
| `database/questoes_treino.json` | Questões e respostas do treino, somente no servidor. |
| `database/gabaritos_banco.json` e `database/gabaritos_legados.json` | Gabaritos de exercícios antigos e quizzes, fora de `public/`. |
| `public/js/data/{banco,quizzes,simulados}.js` e arquivos oficiais de matemática | Mantêm enunciados/alternativas, removendo gabaritos publicados. |
| `public/js/modules/{exercicios,aula,praticar,simulado,simulado_completo}.js` | Pedem correção e feedback ao Flask; não atribuem XP no cliente. |
| `public/js/modules/{gamification,state,materia,nivel}.js` | Progresso obtido no SQLite; desativa adição local de XP e atualiza os indicadores. |
| `public/js/modules/treino-personalizado.js`, `public/components/treino-view.html` | Filtros em cascata, tela própria no estilo dos simulados, navegação e resultado; respostas avaliadas no servidor. |
| `public/pages/redacao.html`, `public/js/modules/redacao.js` | Seletor de temas alinhado e dois modos de análise: local gratuito padrão, Gemini opcional. |
| `redacao_gratis_api.py` (novo) | Análise pedagógica local por regras: estrutura, palavras, parágrafos e conectivos. Não é IA generativa e **não atribui nota ENEM**. |
| `google_api.py`, `public/js/modules/auth.js`, `public/pages/auth.html`, `public/pages/perfil.html` | Google Identity Services com token validado no Flask; contas de senha existentes exigem vinculação autenticada. |
| `public/css/style.css`, `public/index.html` | Novo layout de treino, formulário de redação, toggle no extremo direito, carregamento do overlay. |
| `scripts/migrar_xp_legado.py` | Migração administrativa **opcional** de XP antigo que só existia no navegador. |
| `tests/test_v5.py` | Testes API sem mexer no banco real: usam arquivo SQLite temporário. |
| `integracao/legacy/{script.js,views.html}` | Arquivos monolíticos de demonstração arquivados fora da pasta pública; não participam da SPA. |
| `docker-compose.yml`, `requirements.txt`, `.env.example`, `.gitignore` | Variáveis e dependências de Google; Gemini desativado por padrão; dados privados fora do Git. |

## Rodar e verificar

```bash
docker compose config
docker compose up --build
# Em outro terminal:
docker compose exec web python tests/test_v5.py
curl -i http://localhost:5000/api/config-publica
curl -i http://localhost:5000/api/treino/catalogo
```

Faça login antes de testar `/api/progresso` e a correção. O teste usa `DATABASE_PATH` temporário e não modifica a conta real.

## Filtros do treino

Escolha `vestibular -> ano -> disciplina -> assunto -> origem`. Cada etapa lista apenas opções compatíveis com os filtros anteriores, com contagem de questões. Ao iniciar, aparece uma tela independente, com cartões, navegação e botões seguindo o padrão do simulado. Um treino não repete a mesma questão, e a API não envia a resposta correta antes de recebê-la.

## XP antigo — passo opcional

O novo servidor não aceita mais `state.xp` ou `localStorage` como fonte da verdade. Portanto, o XP antigo **não é migrado automaticamente**: não existe maneira segura de confiar nos valores do navegador. Se quiser preservar sua pontuação anterior, revise-a e use exclusivamente o script administrativo no terminal:

```bash
# Mostra o que faria sem modificar:
docker compose exec web python scripts/migrar_xp_legado.py --email SEU_EMAIL --xp 1255
# Apenas se os dados estiverem corretos:
docker compose exec web python scripts/migrar_xp_legado.py --email SEU_EMAIL --xp 1255 --confirmar
```

O código só aumenta o XP se a pontuação informada for maior que a existente. O histórico de questões anteriores não é recriado artificialmente.

## Login Google sem serviço de autenticação pago

1. Acesse [Google Cloud Console](https://console.cloud.google.com/apis/credentials) com uma conta Google; configure a tela de consentimento OAuth para o projeto. Configure os públicos e usuários de teste conforme a exigência do console.
2. Crie **OAuth Client ID -> Web application**; adicione as origens JavaScript autorizadas `http://localhost:5000` e `http://127.0.0.1:5000` (se for usar ambas).
3. Copie **apenas o Client ID** para `GOOGLE_CLIENT_ID=...` no seu arquivo `.env`. Não coloque client secret no frontend.
4. Reinicie com `docker compose up --build`. Os botões GIS serão renderizados no login. Em contas novas o Google cria a conta; uma conta voaAM antiga com mesmo e-mail deve autenticar por senha e usar o botão de vinculação no perfil. Não há vinculação automática baseada só no endereço de e-mail.

A criação e validação de ID tokens usa as bibliotecas `google-auth` e `requests`. A integração de login não requer Firebase Authentication nem um plano pago do provedor. Pode depender de domínio publicado/HTTPS e políticas do Google antes de lançar para produção. Configure `FLASK_SECRET_KEY` forte; em produção use HTTPS e `SESSION_COOKIE_SECURE=true`.

## Redação gratuita, sem risco de cobranças por API

O botão **Analisar redação** usa, por padrão, `POST /api/redacao/avaliar-gratis`: ele conta palavras, parágrafos, conectivos e verifica indícios de aderência temática por palavras-chave. Isso **não é um modelo de IA**, não julga argumentação nem gera nota oficial; oferece apenas sugestões preliminares. Não usa serviço externo e não tem tarifa por requisição.

O Gemini está **desativado** por padrão: `ATIVAR_GEMINI=false`, mesmo que exista `GEMINI_API_KEY`. Só altere ambos conscientemente, após conferir a franquia, termos e eventual cobrança no provedor. Não existe garantia geral de uma API de IA generativa ilimitada, grátis e sem risco de cobrança. O frontend nunca recebe a chave.

## Gabaritos, segurança e GitHub

Os arquivos `database/questoes_treino.json`, `database/gabaritos_banco.json` e `database/gabaritos_legados.json` contêm respostas, por isso estão fora de `public/` e no `.gitignore`. **São necessários no container**; se clonar o repositório em outra máquina, restaure-os de fonte privada ou construa-os com um script de importação autorizado. Nunca publique esses JSONs no repositório aberto. O ZIP de trabalho entregue ao proprietário contém as cópias para que o projeto rode localmente.

Se versões antigas dos arquivos ou gabaritos já estão no histórico público do Git, adicionar `.gitignore` **não os remove retroativamente**. A remoção do histórico deve ser planejada separadamente com backup. Além disso, um endpoint de correção pode sofrer tentativas repetidas de adivinhação: para produção, recomenda-se controle de taxa, proteção CSRF e sessões de prova com tempo/limites no servidor.

## Limitações de validação

A sintaxe de Python/JavaScript, a integridade dos catálogos e a aplicação idempotente do SQL foram verificadas fora do Docker. Este ambiente não tinha Flask instalado e não conseguiu baixar dependências; logo, os testes HTTP de integração **precisam ser executados em seu Docker**. Consulte o log do container e o Console/Network do navegador ao encontrar uma falha.
