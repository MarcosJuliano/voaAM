// js/modules/nav.js
// Navegação entre telas, renderPerfil, toggleTheme e inicialização

// ─── NAVIGATION ───
const SLOT_MAP = {
  home:              'slot-page-home',
  materia:           'slot-page-materia',
  praticar:          'slot-page-praticar',
  redacao:           'slot-page-redacao',
  perfil:            'slot-page-perfil',
  ranking:           'slot-page-ranking',
  'banco-de-provas': 'slot-page-banco-de-provas',
};

function goTo(screen) {
  // Compatibilidade: a tela 'vestibulares' foi removida; abre os anos de prova no Praticar.
  if (screen === 'vestibulares') {
    if (typeof abrirVestibularDoInicio === 'function') abrirVestibularDoInicio('ENEM');
    return;
  }
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  document.getElementById('screen-' + screen)?.classList.add('active');
  const nav = document.getElementById('nav-' + screen);
  nav?.classList.add('active');
  nav?.setAttribute('aria-current', 'page');
  atualizarLuzNavegacao();
  if (document.getElementById('vidas-toggle')?.getAttribute('aria-expanded') === 'true') abrirInfoVidas();
  const slot = document.getElementById(SLOT_MAP[screen]);
  if (slot) slot.scrollTop = 0;
  if (screen === 'ranking') { carregarRanking(); carregarDesempenhoRanking(); }
  if (screen === 'materia')       renderTopics();
  if (screen === 'perfil')        renderPerfil();
  if (screen === 'praticar')      pratAba('sim');
  if (screen === 'redacao') { redAba('temas'); redCarregarHistorico(); }
  if (screen === 'banco-de-provas') { if (typeof initBancoProvas === 'function') initBancoProvas(); }
}

const barraNavegacao = document.querySelector('.bottom-nav');
const luzNavegacao = barraNavegacao.querySelector('.nav-luz');

function atualizarLuzNavegacao() {
  const item = barraNavegacao.querySelector('.nav-btn.active');
  if (!item?.offsetWidth) {
    luzNavegacao.classList.remove('nav-luz-visivel');
    return;
  }
  luzNavegacao.style.setProperty('--nav-x', item.offsetLeft + 'px');
  luzNavegacao.style.setProperty('--nav-y', item.offsetTop + 'px');
  luzNavegacao.style.width = item.offsetWidth + 'px';
  luzNavegacao.style.height = item.offsetHeight + 'px';
  luzNavegacao.classList.add('nav-luz-visivel');
}

const observarNavegacao = new ResizeObserver(atualizarLuzNavegacao);
observarNavegacao.observe(barraNavegacao);
for (const item of barraNavegacao.querySelectorAll('.nav-btn')) observarNavegacao.observe(item);
atualizarLuzNavegacao();

// ─── MODAL SIMULADO (compatibilidade) ───
// já redefinido acima no bloco PRATICAR — ABAS

// ─── PERFIL ───
function renderPerfil() {
  if (!perfil) return;
  renderContaPerfil();
  document.getElementById('editar-nome').value = perfil.nome || '';
  document.getElementById('editar-serie').value = String(perfil.serie || 1);
  for (const item of document.querySelectorAll('input[name="editar-vest"]')) {
    item.checked = (perfil.vests || []).includes(item.value);
  }
  document.getElementById('editar-erro').textContent = '';
  document.getElementById('perfil-email').textContent = authConta?.email || '—';
  renderFotoPerfil();
  atualizarSalvarPerfil();
}

const formularioPerfil = document.getElementById('perfil-form');

function dadosEditadosPerfil() {
  const selecionados = new Set([...formularioPerfil.querySelectorAll('input[name="editar-vest"]:checked')].map(el => el.value));
  const ordem = [...(perfil?.vests || []), ...selecionados];
  return {
    nome: document.getElementById('editar-nome').value.trim(),
    serie: Number(document.getElementById('editar-serie').value),
    vests: [...new Set(ordem)].filter(vest => selecionados.has(vest)),
  };
}

function perfilFoiAlterado(dados) {
  return Boolean(perfil && (
    dados.nome !== (perfil.nome || '').trim() ||
    dados.serie !== Number(perfil.serie || 1) ||
    dados.vests.join(',') !== (perfil.vests || []).join(',')
  ));
}

function atualizarSalvarPerfil() {
  document.getElementById('editar-acoes').hidden = !perfilFoiAlterado(dadosEditadosPerfil());
}

formularioPerfil.addEventListener('input', atualizarSalvarPerfil);
formularioPerfil.addEventListener('change', atualizarSalvarPerfil);

async function salvarEdicaoPerfil(event) {
  event.preventDefault();
  const botao = document.getElementById('editar-salvar');
  const erro = document.getElementById('editar-erro');
  const dados = dadosEditadosPerfil();
  if (botao.disabled || !perfilFoiAlterado(dados)) return;
  if (!dados.nome || !dados.vests.length) {
    erro.textContent = 'Informe seu nome e selecione pelo menos um vestibular.';
    return;
  }
  botao.disabled = true;
  erro.textContent = '';
  try {
    const data = await authRequisicao('/api/perfil', {
      method: 'PUT', body: JSON.stringify(dados),
    });
    authGuardarPerfil(data.perfil, data.usuario);
    if (typeof showXPToast === 'function') showXPToast('Perfil atualizado com sucesso.');
  } catch(e) { erro.textContent = e.message; }
  finally {
    if (!perfilFoiAlterado(dadosEditadosPerfil()) && document.activeElement === botao) {
      document.getElementById('editar-nome').focus({preventScroll: true});
    }
    atualizarSalvarPerfil();
    botao.disabled = false;
  }
}
// authLogout() definido em auth.js

// ─── THEME TOGGLE ───
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('voaam_theme', next);
}
(function() {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('voaam_theme') || 'dark');
})();

// ─── INIT ───
const _xpEl = document.getElementById('xp-count');
if (_xpEl) _xpEl.textContent = state.xp;
if (perfil) {
  aplicarPerfil();
}
renderTopics();


