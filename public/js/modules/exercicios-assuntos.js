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
let exPedidoQuestoes = 0;
let exPedidoAssuntos = 0;
const EX_MATERIAS = {
  exatas: ['Matemática', 'Física', 'Química'],
  humanas: ['História', 'Geografia', 'Filosofia', 'Sociologia'],
  natureza: ['Biologia'],
  linguagens: ['Português'],
};
let exAreaAtual = 'exatas';
let exMateriaSelecionada = 'Matemática';
let exCatalogoPendente;

function exCarregarCatalogo() {
  exCatalogoPendente ??= authRequisicao('/api/praticar/exercicios/assuntos')
    .then(({assuntos}) => assuntos.map(assunto => ({
      ...assunto,
      autoral: true,
      icone: 'book-open',
      sub: assunto.descricao,
      origem: [assunto.vestibular, assunto.etapa && `${assunto.etapa}ª etapa`].filter(Boolean).join(' · '),
      dif: assunto.dificuldade_sugerida,
      quantidade: assunto.total,
    })))
    .catch(erro => {
      exCatalogoPendente = undefined;
      throw erro;
    });
  return exCatalogoPendente;
}

async function exAtualizarNotas(novaLista = false) {
  const pedido = ++exPedidoNotas;
  const contaId = authConta?.id;
  const cartao = document.getElementById('ex-notas');
  cartao.hidden = !exListaAtual.length;
  if (cartao.hidden) return;

  const status = document.getElementById('ex-notas-status');
  const dados = document.getElementById('ex-notas-dados');
  if (novaLista) {
    dados.hidden = true;
    status.textContent = 'Carregando notas…';
  }
  const ids = exListaAtual.map(q => 'banco:' + q.id);
  const params = new URLSearchParams(ids.map(id => ['id', id]));
  try {
    const {por_questao} = await authRequisicao('/api/praticar/exercicios/notas?' + params);
    if (pedido !== exPedidoNotas || contaId !== authConta?.id) return;
    const notas = ids.map(id => por_questao[id]);
    const respondidas = notas.filter(nota => nota !== undefined);
    const total = respondidas.length;
    const maior = document.getElementById('ex-notas-maior');
    const menor = document.getElementById('ex-notas-menor');
    exPreencherNota(maior, total ? Math.max(...respondidas) : undefined);
    exPreencherNota(menor, total ? Math.min(...respondidas) : undefined);
    status.textContent = `${total} de ${ids.length} ${ids.length === 1 ? 'questão respondida' : 'questões respondidas'}`;
    document.getElementById('ex-notas-grade').replaceChildren(...notas.map((nota, indice) => {
      const item = document.createElement('li');
      item.className = 'ex-nota';
      const numero = document.createElement('span');
      numero.textContent = 'Questão ' + (indice + 1);
      const valor = document.createElement('strong');
      exPreencherNota(valor, nota, 'Sem resposta');
      item.append(numero, valor);
      return item;
    }));
    dados.hidden = false;
    for (const item of document.querySelectorAll('#ex-lista-10 [data-exercicio-nota]')) {
      const nota = por_questao['banco:' + item.dataset.exercicioNota];
      item.hidden = nota === undefined;
      exPreencherNota(item, nota, '', 'Última tentativa · ');
    }
  } catch {
    if (pedido !== exPedidoNotas || contaId !== authConta?.id) return;
    dados.hidden = true;
    status.textContent = 'Não foi possível carregar as notas.';
  }
}

function exPreencherNota(elemento, nota, vazio = '—', prefixo = '') {
  elemento.textContent = nota === undefined ? vazio : `${prefixo}${nota}%`;
  if (nota === undefined) delete elemento.dataset.resultado;
  else elemento.dataset.resultado = nota === 100 ? 'acerto' : 'erro';
}

function exVestibularesAtivos(filtro) {
  if (filtro === 'perfil') return Array.isArray(perfil?.vests) ? perfil.vests : [];
  return filtro ? [filtro] : [];
}

function exDefinirFiltroVestibular(filtro) {
  document.getElementById('ex-vestibular').value = filtro;
  document.getElementById('ex-etapa').value = '';
}

function exQuestoesDoAssunto(assunto, vestibulares, etapa) {
  return bancoDB.filter(q => q.opcoes?.length &&
    (!vestibulares.length || vestibulares.includes(q.vest)) &&
    (!etapa || String(q.etapa) === etapa) &&
    assunto.keywords.some(k => (q.contexto || '').toLowerCase().includes(k) ||
      (q.enunciado || '').toLowerCase().includes(k)));
}

async function exAssuntosDisponiveis(materia, vestibulares, etapa = '') {
  if (materia === 'Matemática') {
    return exAssuntos.map(assunto => {
      const questoes = exQuestoesDoAssunto(assunto, vestibulares, etapa);
      return {...assunto, quantidade: questoes.length, questoes};
    }).filter(assunto => assunto.quantidade > 0);
  }
  const catalogo = await exCarregarCatalogo();
  return catalogo.filter(a => a.disciplina === materia
    && (!vestibulares.length || vestibulares.includes(a.vestibular))
    && (!etapa || String(a.etapa) === etapa));
}

function exCartaoAssunto({id, titulo, sub, origem, icone, quantidade, dif}, abrir) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'pratica-opcao ex-cartao-assunto';
  if (id) botao.dataset.assuntoId = id;
  botao.addEventListener('click', abrir);
  botao.append(voaIcon(icone));
  const nome = document.createElement('strong');
  nome.textContent = titulo;
  const descricao = document.createElement('span');
  descricao.className = 'ex-cartao-descricao';
  descricao.textContent = sub;
  const contagem = document.createElement('span');
  contagem.textContent = `${quantidade} ${quantidade === 1 ? 'questão' : 'questões'}`;
  if (origem) contagem.append(' · ', origem);
  botao.append(nome, descricao, contagem);
  if (dif) {
    const selo = document.createElement('span');
    selo.className = 'ex-cartao-nivel';
    selo.title = 'Nível sugerido para o assunto';
    selo.append(voaIcon('circle-dot'), EX_DIF_LABEL[dif]);
    botao.append(selo);
  }
  return botao;
}

function exRenderAssuntos(alvo, lista, abrirAssunto, limite = Infinity) {
  alvo.replaceChildren();
  for (let dif = 1; dif <= 3; dif++) {
    const assuntos = lista.filter(a => a.dif === dif).slice(0, limite);
    if (!assuntos.length) continue;
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
    for (const assunto of assuntos) {
      grade.append(exCartaoAssunto(assunto, () => abrirAssunto(assunto)));
    }
    grupo.append(titulo, grade);
    alvo.append(grupo);
  }
}

function exTrocarArea(area) {
  if (exAreaAtual !== area) {
    exAreaAtual = area;
    exMateriaSelecionada = EX_MATERIAS[area][0];
  }
  return exMostrarAssuntos();
}

function exTrocarMateria(materia) {
  exMateriaSelecionada = materia;
  return exMostrarAssuntos();
}

async function exMostrarAssuntos() {
  const grid = document.getElementById('ex-assuntos-grid');
  if (!grid) return;
  const pedido = ++exPedidoAssuntos;
  const area = exAreaAtual;
  const materia = exMateriaSelecionada;
  for (const chave of Object.keys(EX_MATERIAS)) {
    const botao = document.getElementById('ex-area-' + chave);
    botao.classList.toggle('active', area === chave);
    botao.setAttribute('aria-pressed', String(area === chave));
  }
  const seletor = document.getElementById('ex-materia');
  seletor.replaceChildren(...EX_MATERIAS[area].map(nome => new Option(nome, nome)));
  seletor.value = materia;

  const status = document.getElementById('ex-assuntos-status');
  const filtro = document.getElementById('ex-vestibular').value;
  const vestibulares = exVestibularesAtivos(filtro);
  const temEtapa = vestibulares.length > 0 && vestibulares.every(v => v === 'PSC' || v === 'SIS');
  document.getElementById('ex-filtro-etapa').hidden = !temEtapa;
  grid.replaceChildren();
  const etapa = temEtapa ? document.getElementById('ex-etapa').value : '';
  status.textContent = 'Carregando assuntos…';
  status.classList.add('voa-busy-status');
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '<div class="voa-loading-inline">' + voaAnimacaoCarregamento('Buscando assuntos…') + '</div>';
  let assuntos;
  try {
    assuntos = await exAssuntosDisponiveis(materia, vestibulares, etapa);
  } catch {
    if (pedido === exPedidoAssuntos) {
      status.classList.remove('voa-busy-status');
      grid.removeAttribute('aria-busy');
      grid.replaceChildren();
      status.textContent = 'Não foi possível carregar os assuntos. Selecione a área para tentar novamente.';
    }
    return;
  }
  if (pedido !== exPedidoAssuntos) return;
  status.classList.remove('voa-busy-status');
  grid.removeAttribute('aria-busy');
  grid.replaceChildren();

  if (!assuntos.length) {
    status.textContent = 'Nenhum assunto para esta seleção. Experimente outro vestibular ou etapa.';
    return;
  }
  const contagem = materia === 'Matemática' ? ''
    : `${assuntos.reduce((soma, assunto) => soma + assunto.quantidade, 0)} exercícios autorais`;
  status.textContent = [filtro === 'perfil' ? vestibulares.join(', ') : '', contagem]
    .filter(Boolean).join(' · ');
  exRenderAssuntos(grid, assuntos, exSelecionarAssunto);
}

function exSelecionarAssunto(assunto) {
  exAssuntoAtual = assunto;
  exNivelAtual = null;
  // Mostra painel de nível
  document.getElementById('ex-assuntos-panel').style.display = 'none';
  document.getElementById('ex-questoes-panel').style.display = 'none';
  const nivelPanel = document.getElementById('ex-nivel-panel');
  nivelPanel.style.display = 'block';
  // Header do assunto selecionado
  const header = document.getElementById('ex-nivel-header');
  if (header) header.innerHTML = `
    <div>
      <div style="font-size:14px;font-weight:800;color:${EX_DIF_NUM[assunto.dif]}">${escapeHTML(assunto.titulo)}</div>
      <div style="font-size:11px;color:var(--text2);margin-top:2px">${escapeHTML([assunto.sub, assunto.origem].filter(Boolean).join(' · '))}</div>
    </div>`;
  header?.prepend(voaIcon(assunto.icone));
  for (const botao of nivelPanel.querySelectorAll('[data-ex-nivel]')) {
    const quantidade = assunto.niveis?.[botao.dataset.exNivel] ?? 0;
    botao.disabled = assunto.autoral === true && quantidade === 0;
    const total = botao.querySelector('.ex-nivel-total');
    total.textContent = assunto.autoral ? `${quantidade} ${quantidade === 1 ? 'questão' : 'questões'}` : '';
    total.hidden = !assunto.autoral;
  }
  document.getElementById('ex-voltar-assuntos').focus();
}

async function exVoltarAssuntos() {
  const id = exAssuntoAtual?.id;
  exAssuntoAtual = null;
  exNivelAtual   = null;
  document.getElementById('ex-nivel-panel').style.display   = 'none';
  document.getElementById('ex-questoes-panel').style.display = 'none';
  document.getElementById('ex-assuntos-panel').style.display = 'block';
  await exMostrarAssuntos();
  if (!exAssuntoAtual && id) {
    document.querySelector(`#ex-assuntos-grid [data-assunto-id="${CSS.escape(id)}"]`)?.focus();
  }
}

function exSelecionarNivel(nivel) {
  exNivelAtual = nivel;
  document.getElementById('ex-nivel-panel').style.display   = 'none';
  document.getElementById('ex-assuntos-panel').style.display = 'none';
  const questPanel = document.getElementById('ex-questoes-panel');
  questPanel.style.display = 'block';
  document.getElementById('ex-voltar-niveis').focus();
  return exRenderQuestoesFiltradas();
}

function exVoltarNivel() {
  const nivel = exNivelAtual;
  exNivelAtual = null;
  document.getElementById('ex-questoes-panel').style.display  = 'none';
  document.getElementById('ex-assuntos-panel').style.display  = 'none';
  document.getElementById('ex-nivel-panel').style.display     = 'block';
  document.querySelector(`#ex-nivel-panel [data-ex-nivel="${nivel}"]`)?.focus();
}

async function exAtualizarQuestoes() {
  if (await exRenderQuestoesFiltradas()) showXPToast('🔄 Lista atualizada!');
}

async function exRenderQuestoesFiltradas() {
  const container = document.getElementById('ex-lista-10');
  const info      = document.getElementById('ex-lista-info');
  if (!container || !exAssuntoAtual) return;

  const a = exAssuntoAtual;
  const nivel = exNivelAtual;
  const pedido = ++exPedidoQuestoes;
  let filtrado;
  if (a.autoral) {
    info.textContent = 'Carregando questões…';
    info.classList.add('voa-busy-status');
    container.setAttribute('aria-busy', 'true');
    container.innerHTML = '<div class="voa-loading-inline">' + voaAnimacaoCarregamento('Preparando questões…') + '</div>';
    exListaAtual = [];
    exAtualizarNotas();
    try {
      const {questoes} = await authRequisicao(`/api/praticar/exercicios/${encodeURIComponent(a.id)}/questoes?nivel=${nivel}`);
      if (pedido !== exPedidoQuestoes || a !== exAssuntoAtual || nivel !== exNivelAtual) return;
      filtrado = questoes.map(q => ({
        id: q.id.slice('banco:'.length), vest: q.vestibular, etapa: q.etapa,
        materia: q.disciplina, enunciado: q.enunciado, opcoes: q.alternativas, _dif: nivel,
        ano: q.ano, fonte: q.fonte,
      }));
    } catch {
      if (pedido === exPedidoQuestoes && a === exAssuntoAtual && nivel === exNivelAtual) {
        info.classList.remove('voa-busy-status');
        container.removeAttribute('aria-busy');
        container.replaceChildren();
        info.textContent = 'Não foi possível carregar as questões. Use Atualizar para tentar novamente.';
      }
      return;
    }
  } else {
    const pool = a.questoes.map(q => ({ ...q, _dif: getDificuldade(q) }));
    // A faixa difícil também inclui questões avançadas do banco de Matemática.
    const doNivel = pool.filter(q => q._dif === nivel || (nivel === 3 && q._dif === 4));
    filtrado = embaralhar(doNivel.length >= 3 ? doNivel : pool).slice(0, 10);
  }
  if (pedido !== exPedidoQuestoes || a !== exAssuntoAtual || nivel !== exNivelAtual) return;
  info.classList.remove('voa-busy-status');
  container.removeAttribute('aria-busy');
  exListaAtual = filtrado;

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
    exAtualizarNotas();
    return;
  }

  container.innerHTML = filtrado.map((q, indice) => {
    const dif  = q._dif || 1;
    const tema = q.contexto ? q.contexto.split('—')[0].replace('Tema:','').trim() : a.titulo;
    return `<button type="button" class="ex-lista-item" onclick="abrirExercicio('${q.id}')">
      <span class="ex-dif-badge" style="background:${difColors[dif]};color:${difTxtColors[dif]}">${difIcons[dif]}</span>
      <span style="flex:1;min-width:0">
        <span style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
          <span class="ex-lista-numero">Questão ${indice + 1}</span>
          <span style="font-size:10px;font-weight:700;color:${difTxtColors[dif]}">${difLabels[dif]}</span>
          <span style="font-size:10px;color:var(--text2);background:var(--surface2);padding:2px 6px;border-radius:4px">${q.vest}${q.etapa?' E'+q.etapa:''} ${q.ano||''}</span>
          <span style="font-size:10px;color:var(--text2)">${escapeHTML(a.autoral ? tema : tema.slice(0,28))}</span>
        </span>
        <span style="font-size:13px;color:var(--text);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${a.autoral ? escapeHTML(q.enunciado) : q.enunciado}</span>
        <span class="ex-nota-questao" data-exercicio-nota="${q.id}" hidden></span>
      </span>
      <span style="color:var(--text2);font-size:18px;flex-shrink:0">›</span>
    </button>`;
  }).join('');
  exAtualizarNotas(true);
  return true;
}

// Mantém compat com chamada antiga (pratAba chama renderListaEx)
function renderListaEx() { exMostrarAssuntos(); }
function atualizarListaEx() { exMostrarAssuntos(); }
function exVestFiltro() {} // stub para não quebrar

// ─── EXERCÍCIOS ESTILO DUOLINGO (mantido para o botão Exercícios do nav) ───
// (declarado em exercicios.js)
// (declarado em exercicios.js)
