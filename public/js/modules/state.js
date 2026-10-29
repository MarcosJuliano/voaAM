// =============================================================
// js/modules/state.js
// Estado global, perfil do aluno e sistema de corações
// VoaAM · Vestibulares do Amazonas
// =============================================================

// ─── PERFIL DO ALUNO (localStorage) ───
let perfil = JSON.parse(localStorage.getItem('voaam_perfil') || 'null');

// ─── STATE ───
const ESTADO_DEFAULT = {xp:0, streak:0, aulas:0, quizDone:0, quizCorrect:0};
// O servidor é a fonte de verdade. O navegador não lê nem restaura XP antigo.
const estadoInicial = {...ESTADO_DEFAULT}; // Estado autoritativo carregado da API /api/progresso.

let state = {
  xp: estadoInicial.xp||0,
  streak: estadoInicial.streak||0,
  aulas: estadoInicial.aulas||0,
  quizDone: estadoInicial.quizDone||0,
  quizCorrect: estadoInicial.quizCorrect||0,
  currentSubject: 'mat',
  currentSerie: perfil ? (perfil.serie <= 3 ? perfil.serie : 3) : 1,
  currentSerieRed: 1,
};

function salvarState() {
  // Segurança: XP/estatísticas NÃO são persistidos pelo navegador.
  // O servidor é a única fonte de verdade para recompensas.
}
function trocarStateUsuario() {
  Object.assign(state, ESTADO_DEFAULT);
  if(typeof atualizarProgresso==='function')atualizarProgresso();
}

// ─── VIDAS: 3 no máximo, 1 recuperada a cada 4 horas. ───
const MAX_CORACOES = 3;
const VIDA_INTERVALO = 4 * 60 * 60 * 1000;
let vidasFila = Promise.resolve();
let timerRecargaInterval = null;
let timerVidasHeader = null;
function vidasKey() {
  return `voaam_vidas:${localStorage.getItem('voaam_usuario_id') || 'local'}`;
}
function getCoracoes() {
  let d;
  try { d = JSON.parse(localStorage.getItem(vidasKey()) || 'null'); } catch (_) { d = null; }
  if (!d || !Number.isFinite(Number(d.qtd))) d = {qtd:MAX_CORACOES, recargaTs:null};
  d.qtd = Math.max(0, Math.min(MAX_CORACOES, Number(d.qtd)));
  d.recargaTs = d.recargaTs ? Number(d.recargaTs) : null;
  if (d.qtd < MAX_CORACOES && d.recargaTs && Date.now() >= d.recargaTs) {
    const ganhos = 1 + Math.floor((Date.now() - d.recargaTs)/VIDA_INTERVALO);
    d.qtd = Math.min(MAX_CORACOES, d.qtd + ganhos);
    d.recargaTs = d.qtd === MAX_CORACOES ? null : d.recargaTs + ganhos*VIDA_INTERVALO;
    localStorage.setItem(vidasKey(), JSON.stringify(d));
  }
  return d;
}
function setCoracoes(qtd) {
  const anterior = getCoracoes();
  const novo = Math.max(0, Math.min(MAX_CORACOES, Number(qtd)));
  const recargaTs = novo === MAX_CORACOES ? null : (anterior.recargaTs || Date.now() + VIDA_INTERVALO);
  localStorage.setItem(vidasKey(), JSON.stringify({qtd:novo,recargaTs}));
  return novo;
}
function enviarEventoVidas(acao) {
  // Operações serializadas evitam reordenação de perdas e ganhos no servidor.
  vidasFila = vidasFila.catch(() => {}).then(async () => {
    const r = await fetch('/api/vidas', {method:'POST',credentials:'same-origin',
      headers:{'Content-Type':'application/json'}, body:JSON.stringify({acao})});
    if (!r.ok) throw new Error(`vidas HTTP ${r.status}`);
    const d = await r.json();
    localStorage.setItem(vidasKey(), JSON.stringify({qtd:d.quantidade,recargaTs:d.proxima_recarga ? d.proxima_recarga*1000 : null}));
    renderCoracoes();
  }).catch(e => console.warn('[voaAM] Não foi possível sincronizar as vidas:',e));
}
async function sincronizarVidas() {
  await vidasFila;
  try {
    const r = await fetch('/api/vidas',{credentials:'same-origin'});
    if (!r.ok) throw new Error(`vidas HTTP ${r.status}`);
    const d = await r.json();
    localStorage.setItem(vidasKey(), JSON.stringify({qtd:d.quantidade,recargaTs:d.proxima_recarga ? d.proxima_recarga*1000 : null}));
  } catch(e) { console.warn('[voaAM] Vidas locais por indisponibilidade da API:',e); }
  renderCoracoes();
}
function perderCoracao() {
  const novo = setCoracoes(getCoracoes().qtd - 1);
  renderCoracoes(); enviarEventoVidas('perder'); return novo;
}
function ganharCoracao() {
  if (getCoracoes().qtd >= MAX_CORACOES) return;
  setCoracoes(getCoracoes().qtd + 1);
  renderCoracoes(); enviarEventoVidas('ganhar');
}
function formatarTempoVidas(ts) {
  if (!ts) return '';
  const minutos = Math.max(0, Math.ceil((ts-Date.now())/60000));
  const h = Math.floor(minutos/60), m=minutos%60;
  return `${h}h ${String(m).padStart(2,'0')}min`;
}
function renderCoracoes() {
  const c = getCoracoes();
  for (let i=1; i<=3; i++) {
    const el=document.getElementById('c'+i);
    if(el) el.classList.toggle('vazio',i>c.qtd);
  }
  const qtd=document.getElementById('vidas-count');
  if(qtd) qtd.textContent=`${c.qtd}/${MAX_CORACOES}`;
  const prox=document.getElementById('vidas-next');
  if(prox) prox.textContent=c.qtd===MAX_CORACOES ? 'Completas' : `+1 em ${formatarTempoVidas(c.recargaTs)}`;
  const p=document.getElementById('perfil-vidas');
  if(p) p.textContent=`${c.qtd}/${MAX_CORACOES}`;
  const info=document.getElementById('recarga-info');
  if(info) info.textContent=c.qtd<MAX_CORACOES ? `+1 vida em ${formatarTempoVidas(c.recargaTs)} (máximo: 3)` : 'Todas as vidas disponíveis';
  const banner=document.getElementById('bloqueado-banner');
  const filtros=document.getElementById('ex-filtros');
  const lista=document.getElementById('ex-lista');
  const reforco=document.getElementById('reforco-banner');
  if(c.qtd<=0) {
    if(banner) banner.style.display='block';
    if(filtros) filtros.style.display='none';
    if(lista) lista.innerHTML='';
    if(reforco) reforco.style.display='none';
  } else {
    if(banner) banner.style.display='none';
    if(filtros) filtros.style.display='block';
  }
  const t=document.getElementById('bloqueado-timer');
  if(t) t.textContent=c.qtd<MAX_CORACOES ? `Próxima vida em ${formatarTempoVidas(c.recargaTs)}` : 'Vidas completas';
  if (!timerVidasHeader) timerVidasHeader=setInterval(() => {
    const atual=getCoracoes();
    renderCoracoes();
  },60000);
}
function iniciarTimerRecarga(ts) { renderCoracoes(); }
function abrirInfoVidas() {
  const dialog = document.getElementById('vidas-ajuda');
  const botao = document.getElementById('vidas-toggle');
  if (!dialog || !botao) return;
  // Coloca o popover em body para escapar dos contextos de empilhamento do header/grid.
  if (dialog.parentElement !== document.body) document.body.appendChild(dialog);
  const estavaAberto = !dialog.hidden;
  dialog.hidden = estavaAberto;
  botao.setAttribute('aria-expanded', String(!estavaAberto));
  if (!estavaAberto) {
    const rect = botao.getBoundingClientRect();
    const largura = Math.min(320, innerWidth - 24);
    dialog.style.left = `${Math.max(12, Math.min(innerWidth - largura - 12, rect.left))}px`;
    dialog.style.top = `${Math.min(innerHeight - 190, rect.bottom + 8)}px`;
  }
}
document.addEventListener('click', ev => {
  const d = document.getElementById('vidas-ajuda');
  if (!d || d.hidden || ev.target.closest('#vidas-toggle, #vidas-ajuda')) return;
  d.hidden = true;
  document.getElementById('vidas-toggle')?.setAttribute('aria-expanded','false');
});
// ─── ONBOARDING (legado — mantido para compatibilidade) ───
let obSerie = null, obVests = [], obDific = null;
function obValidar(step) {
  const btn = document.getElementById('ob-btn-'+step);
  if (!btn) return;
  if (step === 0) btn.disabled = !document.getElementById('ob-nome').value.trim();
}
function obSelecionarSerie(n, el) {
  obSerie = n;
  document.querySelectorAll('#ob-step-1 .ob-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('ob-btn-1').disabled = false;
}
function obSelecionarVest(v, el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    obVests = obVests.filter(x => x !== v);
  } else {
    el.classList.add('selected');
    obVests.push(v);
  }
  document.getElementById('ob-btn-2').disabled = obVests.length === 0;
}
function obSelecionarDific(d, el) {
  obDific = d;
  document.querySelectorAll('#ob-step-3 .ob-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('ob-btn-3').disabled = false;
}
function obProximo(step) {
  document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active'));
  document.getElementById('ob-step-'+step).classList.add('active');
  for (let i = 0; i < 4; i++) {
    document.getElementById('dot-'+i)?.classList.toggle('active', i <= step);
  }
}
function obFinalizar() {
  const nome = document.getElementById('ob-nome').value.trim();
  perfil = { nome, serie: obSerie, vests: obVests, dific: obDific };
  localStorage.setItem('voaam_perfil', JSON.stringify(perfil));
  state.currentSerie = obSerie <= 3 ? obSerie : 1;
  const ob = document.getElementById('onboarding');
  if (ob) ob.classList.add('hidden');
  aplicarPerfil();
}

// ─── APLICAR PERFIL ───
function aplicarPerfil() {
  if (!perfil) return;
  const primeiro = perfil.nome.split(' ')[0];
  const el = document.getElementById('home-greeting');
  if (el) el.textContent = `Olá, ${primeiro}! 👋`;
  const rankNome = document.getElementById('rank-nome');
  if (rankNome) rankNome.textContent = primeiro;

  verificarStreak();

  const vestInfo = {
    SIS:   { cls:'sis',   tag:'Seriado',     inst:'UEA',     date:'Jul–Jan' },
    PSC:   { cls:'psc',   tag:'Seriado',     inst:'UFAM',    date:'Nov–Jan' },
    MACRO: { cls:'macro', tag:'Tradicional', inst:'UEA',     date:'Jan–Fev' },
    ENEM:  { cls:'enem',  tag:'Nacional',    inst:'MEC/INEP',date:'Nov' },
  };
  const container = document.getElementById('home-vest-cards');
  if (container && perfil.vests) {
    container.innerHTML = perfil.vests.map(v => {
      const info = vestInfo[v] || {};
      return `<div class="vest-card ${info.cls||''}" onclick="abrirVestibularDoInicio('${v}')">
        <div class="vest-tag">${info.tag||''}</div>
        <div class="vest-name">${v}</div>
        <div class="vest-inst">${info.inst||''}</div>
        <div class="vest-date">📅 ${info.date||''}</div>
      </div>`;
    }).join('');
  }

  const simSub = document.getElementById('home-sim-sub');
  if (simSub && perfil.vests?.[0]) simSub.textContent = `Simulado ${perfil.vests[0]} cronometrado`;

  const matSub = document.getElementById('home-mat-sub');
  const serieLabel = ['','1ª Série','2ª Série','3ª Série','EM Completo'];
  if (matSub) matSub.textContent = `${serieLabel[perfil.serie]||''} — Continue de onde parou`;

  updateStats();
  renderCoracoes();
}
