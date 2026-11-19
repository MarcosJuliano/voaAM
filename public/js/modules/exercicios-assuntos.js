// js/modules/exercicios-assuntos.js
// ─── EXERCÍCIOS — FLUXO POR ASSUNTO → NÍVEL → QUESTÕES ───

// Catálogo de assuntos para exercícios
// Dificuldade dos assuntos: 1=Fácil(verde), 2=Médio(amarelo), 3=Difícil(vermelho)
// Definidas por nível de abstração e exigência nos vestibulares do AM
const EX_DIF_COR     = ['','rgba(34,197,94,0.13)','rgba(245,158,11,0.13)','rgba(239,68,68,0.12)'];
const EX_DIF_BORDA   = ['','rgba(34,197,94,0.35)','rgba(245,158,11,0.4)','rgba(239,68,68,0.35)'];
const EX_DIF_NUM     = ['','#22c55e','var(--amber)','var(--red)'];
const EX_DIF_LABEL   = ['','Fácil','Médio','Difícil'];

const exAssuntos = [
  // ── FÁCIL ──────────────────────────────────────────────────────────────────
  { id:'financ',    icone:'wallet', titulo:'Mat. Financeira',    sub:'Juros simples, compostos, porcentagem',
    dif:1,
    keywords:['juro','financ','porcentagem','desconto','prestação','montante','taxa'] },
  { id:'estat',     icone:'chart-column', titulo:'Estatística',        sub:'Média, moda, mediana, desvio, gráficos',
    dif:1,
    keywords:['estatística','média','moda','mediana','desvio','variância','gráfico','frequência'] },
  { id:'funcoes',   icone:'chart-column', titulo:'Funções',            sub:'Afim, quadrática, exponencial, logarítmica',
    dif:1,
    keywords:['função','afim','quadrática','exponencial','logarit','inversa','composta'] },
  // ── MÉDIO ──────────────────────────────────────────────────────────────────
  { id:'algebra',   icone:'book-open', titulo:'Álgebra',            sub:'Equações, sistemas, matrizes, PA e PG',
    dif:2,
    keywords:['equação','sistema','matrize','determinante','pa','pg','progressão','produto notável','polinôm'] },
  { id:'geometria', icone:'ruler', titulo:'Geometria',          sub:'Plana, espacial e analítica',
    dif:2,
    keywords:['geometr','área','volume','perímetro','pitágoras','triângl','polígon','cilindro','cone','esfera','pirâmide'] },
  { id:'log',       icone:'calculator', titulo:'Logaritmos & Exp.',  sub:'Propriedades, equações logarítmicas',
    dif:2,
    keywords:['logarit','exponencial','potência','base natural'] },
  // ── DIFÍCIL ────────────────────────────────────────────────────────────────
  { id:'trigon',    icone:'ruler', titulo:'Trigonometria',      sub:'Seno, cosseno, tangente, identidades',
    dif:3,
    keywords:['trigonometr','seno','cosseno','tangente','radianos','identidade trigon'] },
  { id:'prob',      icone:'dice-five', titulo:'Probabilidade',      sub:'Eventos, combinatória, análise combinatória',
    dif:3,
    keywords:['probabilidade','combinação','permutação','arranjo','fatorial','evento'] },
  { id:'comb',      icone:'shapes', titulo:'Combinatória',       sub:'Princípio multiplicativo, combinações',
    dif:3,
    keywords:['combinatória','princípio multiplicativo','binômio de newton','combinação','arranjo','permutação'] },
  { id:'geoAnal',   icone:'sparkles', titulo:'Geo. Analítica',     sub:'Pontos, retas, cônicas, circunferências',
    dif:3,
    keywords:['analítica','ponto médio','distância','reta','cônica','parábola','elipse','hipérbole','circunferência'] },
];

// Níveis: 1=Fácil, 2=Médio, 3=Difícil
// A dificuldade é mapeada de _dif (1-4) para o nível escolhido:
//   Fácil  → _dif 1
//   Médio  → _dif 2-3
//   Difícil → _dif 4 (ou 3-4 se houver poucas)

let exAssuntoAtual = null;
let exNivelAtual   = null;
let exListaAtual = [];
let exPedidoNotas = 0;

async function exAtualizarNotas() {
  const pedido = ++exPedidoNotas;
  const contaId = authConta?.id;
  const cartao = document.getElementById('ex-notas');
  cartao.hidden = !exListaAtual.length;
  if (cartao.hidden) return;

  const status = document.getElementById('ex-notas-status');
  const recentes = document.getElementById('ex-notas-recentes');
  const posicao = new Map(exListaAtual.map((q, indice) => ['banco:' + q.id, indice + 1]));
  const params = new URLSearchParams([...posicao.keys()].map(id => ['id', id]));
  try {
    const {ultimas, por_questao} = await authRequisicao('/api/praticar/exercicios/notas?' + params);
    if (pedido !== exPedidoNotas || contaId !== authConta?.id) return;
    status.textContent = ultimas.length ? '' : 'Responda a uma questão desta lista para ver sua nota.';
    recentes.replaceChildren(...ultimas.map(({questao_id, nota}) => {
      const item = document.createElement('li');
      item.className = 'ex-nota';
      item.dataset.resultado = nota === 100 ? 'acerto' : 'erro';
      const numero = document.createElement('span');
      numero.textContent = 'Questão ' + posicao.get(questao_id);
      const valor = document.createElement('strong');
      valor.textContent = nota + '%';
      item.append(numero, valor);
      return item;
    }));
    for (const item of document.querySelectorAll('#ex-lista-10 [data-exercicio-nota]')) {
      const nota = por_questao['banco:' + item.dataset.exercicioNota];
      item.hidden = nota === undefined;
      item.textContent = item.hidden ? '' : `Última tentativa · ${nota}%`;
      item.dataset.resultado = nota === 100 ? 'acerto' : 'erro';
    }
  } catch {
    if (pedido === exPedidoNotas && contaId === authConta?.id) status.textContent = 'Não foi possível carregar as notas.';
  }
}

function exQuestoesDoAssunto(assunto) {
  return bancoDB.filter(q => q.opcoes?.length &&
    assunto.keywords.some(k => (q.contexto || '').toLowerCase().includes(k) ||
      (q.enunciado || '').toLowerCase().includes(k)));
}

function exCartaoAssunto({titulo, sub, icone, quantidade, dif}, abrir) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'pratica-opcao ex-cartao-assunto';
  botao.addEventListener('click', abrir);
  botao.append(voaIcon(icone));
  const nome = document.createElement('strong');
  nome.textContent = titulo;
  const descricao = document.createElement('span');
  descricao.className = 'ex-cartao-descricao';
  descricao.textContent = sub;
  const contagem = document.createElement('span');
  contagem.textContent = `${quantidade} ${quantidade === 1 ? 'questão' : 'questões'}`;
  botao.append(nome, descricao, contagem);
  if (dif) {
    const selo = document.createElement('span');
    selo.className = 'ex-cartao-nivel';
    selo.append(voaIcon('circle-dot'), EX_DIF_LABEL[dif]);
    botao.append(selo);
  }
  return botao;
}

function exRenderAssuntos(alvo, abrirAssunto, limite = Infinity) {
  alvo.replaceChildren();
  for (let dif = 1; dif <= 3; dif++) {
    const grupo = document.createElement('div');
    grupo.className = 'ex-assunto-grupo';
    grupo.dataset.dificuldade = dif;
    grupo.style.setProperty('--ex-fundo', EX_DIF_COR[dif]);
    grupo.style.setProperty('--ex-borda', EX_DIF_BORDA[dif]);
    grupo.style.setProperty('--ex-cor', EX_DIF_NUM[dif]);
    const titulo = document.createElement('h3');
    titulo.className = 'ex-assunto-dificuldade';
    titulo.append(voaIcon('circle-dot'), EX_DIF_LABEL[dif]);
    const grade = document.createElement('div');
    grade.className = 'ex-assunto-grade';
    const assuntos = exAssuntos.filter(a => a.dif === dif).slice(0, limite);
    for (const assunto of assuntos) {
      const cartao = {...assunto, quantidade: exQuestoesDoAssunto(assunto).length};
      grade.append(exCartaoAssunto(cartao, () => abrirAssunto(assunto.id)));
    }
    grupo.append(titulo, grade);
    alvo.append(grupo);
  }
}

function exMostrarAssuntos() {
  const grid = document.getElementById('ex-assuntos-grid');
  if (grid) exRenderAssuntos(grid, exSelecionarAssunto);
}

function exSelecionarAssunto(id) {
  exAssuntoAtual = exAssuntos.find(a => a.id === id);
  if (!exAssuntoAtual) return;
  // Mostra painel de nível
  document.getElementById('ex-assuntos-panel').style.display = 'none';
  document.getElementById('ex-questoes-panel').style.display = 'none';
  const nivelPanel = document.getElementById('ex-nivel-panel');
  nivelPanel.style.display = 'block';
  // Header do assunto selecionado
  const header = document.getElementById('ex-nivel-header');
  if (header) header.innerHTML = `
    <div>
      <div style="font-size:14px;font-weight:800;color:${EX_DIF_NUM[exAssuntoAtual.dif]}">${exAssuntoAtual.titulo}</div>
      <div style="font-size:11px;color:var(--text2);margin-top:2px">${exAssuntoAtual.sub}</div>
    </div>`;
  header?.prepend(voaIcon(exAssuntoAtual.icone));
}

function exVoltarAssuntos() {
  exAssuntoAtual = null;
  exNivelAtual   = null;
  document.getElementById('ex-nivel-panel').style.display   = 'none';
  document.getElementById('ex-questoes-panel').style.display = 'none';
  document.getElementById('ex-assuntos-panel').style.display = 'block';
}

function exSelecionarNivel(nivel) {
  exNivelAtual = nivel;
  document.getElementById('ex-nivel-panel').style.display   = 'none';
  document.getElementById('ex-assuntos-panel').style.display = 'none';
  const questPanel = document.getElementById('ex-questoes-panel');
  questPanel.style.display = 'block';
  exRenderQuestoesFiltradas();
}

function exVoltarNivel() {
  exNivelAtual = null;
  document.getElementById('ex-questoes-panel').style.display  = 'none';
  document.getElementById('ex-assuntos-panel').style.display  = 'none';
  document.getElementById('ex-nivel-panel').style.display     = 'block';
}

function exAtualizarQuestoes() {
  exRenderQuestoesFiltradas();
  showXPToast('🔄 Lista atualizada!');
}

function exRenderQuestoesFiltradas() {
  const container = document.getElementById('ex-lista-10');
  const info      = document.getElementById('ex-lista-info');
  if (!container || !exAssuntoAtual) return;

  const a = exAssuntoAtual;
  const pool = exQuestoesDoAssunto(a).map(q => ({ ...q, _dif: getDificuldade(q) }));

  // Mapeia nível escolhido → faixas de _dif (1=fácil, 2=médio, 3=difícil, 4=avançado)
  let difMin, difMax;
  if (exNivelAtual === 1)      { difMin = 1; difMax = 1; }  // Fácil
  else if (exNivelAtual === 2) { difMin = 2; difMax = 2; }  // Médio
  else                          { difMin = 3; difMax = 4; }  // Difícil/Avançado

  let filtrado = pool.filter(q => q._dif >= difMin && q._dif <= difMax);
  // Fallback: se pouco, expande faixa
  if (filtrado.length < 3) filtrado = pool;

  filtrado = embaralhar(filtrado).slice(0, 10);
  exListaAtual = filtrado;
  document.getElementById('ex-notas-recentes').replaceChildren();
  document.getElementById('ex-notas-status').textContent = 'Carregando notas…';
  exAtualizarNotas();

  const nivelLabels = ['','Fácil','Médio','Difícil'];
  const nivelIcons  = ['','🟢','🟡','🔴'];
  if (info) info.textContent = `${filtrado.length} questões • ${a.titulo} • ${nivelIcons[exNivelAtual]} ${nivelLabels[exNivelAtual]}`;

  const difIcons     = ['','🟢','🟡','🟠','🔴'];
  const difLabels    = ['','Fácil','Médio','Difícil','Avançado'];
  const difColors    = ['','rgba(34,197,94,0.15)','rgba(245,158,11,0.15)','rgba(239,68,68,0.1)','rgba(139,92,246,0.15)'];
  const difTxtColors = ['','#22c55e','var(--amber)','var(--red)','var(--violet)'];

  if (!filtrado.length) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text2);font-size:14px">
      <div style="font-size:40px;margin-bottom:12px">🔍</div>
      <div>Nenhuma questão encontrada para este assunto e nível.<br>Tente outro nível ou assunto!</div>
    </div>`;
    return;
  }

  container.innerHTML = filtrado.map(q => {
    const dif  = q._dif || 1;
    const tema = q.contexto ? q.contexto.split('—')[0].replace('Tema:','').trim() : a.titulo;
    return `<button type="button" class="ex-lista-item" onclick="abrirExercicio('${q.id}')">
      <span class="ex-dif-badge" style="background:${difColors[dif]};color:${difTxtColors[dif]}">${difIcons[dif]}</span>
      <span style="flex:1;min-width:0">
        <span style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
          <span style="font-size:10px;font-weight:700;color:${difTxtColors[dif]}">${difLabels[dif]}</span>
          <span style="font-size:10px;color:var(--text2);background:var(--surface2);padding:2px 6px;border-radius:4px">${q.vest}${q.etapa?' E'+q.etapa:''} ${q.ano||''}</span>
          <span style="font-size:10px;color:var(--text2)">${tema.slice(0,28)}</span>
        </span>
        <span style="font-size:13px;color:var(--text);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${q.enunciado}</span>
        <span class="ex-nota-questao" data-exercicio-nota="${q.id}" hidden></span>
      </span>
      <span style="color:var(--text2);font-size:18px;flex-shrink:0">›</span>
    </button>`;
  }).join('');
}

// Mantém compat com chamada antiga (pratAba chama renderListaEx)
function renderListaEx() { exMostrarAssuntos(); }
function atualizarListaEx() { exMostrarAssuntos(); }
function exVestFiltro() {} // stub para não quebrar

// ─── EXERCÍCIOS ESTILO DUOLINGO (mantido para o botão Exercícios do nav) ───
// (declarado em exercicios.js)
// (declarado em exercicios.js)
