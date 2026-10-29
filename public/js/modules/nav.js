// js/modules/nav.js
// Navegação entre telas, renderPerfil, toggleTheme e inicialização

// ─── NAVIGATION ───
const SLOT_MAP = {
  home:              'slot-page-home',
  materia:           'slot-page-materia',
  praticar:          'slot-page-praticar',
  redacao:           'slot-page-redacao',
  perfil:            'slot-page-perfil',
  'banco-de-provas': 'slot-page-banco-de-provas',
};

function goTo(screen) {
  // Compatibilidade: a tela 'vestibulares' foi removida; abre os anos de prova no Praticar.
  if (screen === 'vestibulares') {
    if (typeof abrirVestibularDoInicio === 'function') abrirVestibularDoInicio('ENEM');
    return;
  }
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + screen)?.classList.add('active');
  document.getElementById('nav-' + screen)?.classList.add('active');
  // Esconde todos os slots de página e mostra apenas o ativo (grid desktop)
  const activeSlotId = SLOT_MAP[screen] || null;
  Object.entries(SLOT_MAP).forEach(([name, slotId]) => {
    const slot = document.getElementById(slotId);
    if (slot) slot.style.display = (slotId === activeSlotId) ? 'block' : 'none';
  });
  if (screen === 'materia')       renderTopics();
  if (screen === 'perfil')        renderPerfil();
  if (screen === 'praticar')      pratAba('sim');
  if (screen === 'redacao')       redAba('temas');
  if (screen === 'banco-de-provas') { if (typeof initBancoProvas === 'function') initBancoProvas(); }
}

// ─── MODAL SIMULADO (compatibilidade) ───
// já redefinido acima no bloco PRATICAR — ABAS

// ─── PERFIL ───
function renderPerfil() {
  if (!perfil) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const serie = ['','1º ano','2º ano','3º ano','Ensino Médio completo'];
  set('perfil-nome', perfil.nome);
  set('perfil-info', `${serie[perfil.serie] || 'Não informada'} · ${(perfil.vests || []).join(', ')}`);
  set('perfil-xp', state.xp);
  if (typeof atualizarNivel === 'function') atualizarNivel();
  set('perfil-acertos', state.quizDone ? Math.round(100*state.quizCorrect/state.quizDone)+'%' : '—');
  set('perfil-streak', state.streak);
  set('perfil-respondidas', state.quizDone);
  set('perfil-aulas', state.aulas);
  set('perfil-corretas', state.quizCorrect);
  const c = typeof getCoracoes === 'function' ? getCoracoes() : {qtd:3};
  set('perfil-vidas', `${c.qtd}/3`);
  const ultima = localStorage.getItem('voaam_ultima_atividade');
  set('perfil-ultima-atividade', ultima ? ultima.split('-').reverse().join('/') : 'Aguardando sincronização');
  const difEl = document.getElementById('perfil-dificuldades');
  if (difEl) {
    const temas = Object.entries(temasFragos || {}).filter(([,n]) => n > 0).sort((a,b) => b[1]-a[1]);
    difEl.replaceChildren();
    if (!temas.length) {
      difEl.textContent = 'Nenhum assunto identificado. Pratique para receber recomendações.';
    } else {
      temas.slice(0,5).forEach(([nome,n]) => {
        const linha = document.createElement('div');
        linha.className = 'perfil-recomendacao';
        const titulo = document.createElement('span'); titulo.textContent = nome;
        const quantidade = document.createElement('strong'); quantidade.textContent = `${n} erro${n === 1 ? '' : 's'}`;
        linha.append(titulo, quantidade); difEl.appendChild(linha);
      });
    }
  }
}

function editarPerfil() {
  if (!perfil) return;
  document.getElementById('editar-nome').value = perfil.nome || '';
  document.getElementById('editar-serie').value = String(perfil.serie || 1);
  document.querySelectorAll('input[name="editar-vest"]').forEach(c => {
    c.checked = (perfil.vests || []).includes(c.value);
  });
  document.getElementById('editar-erro').textContent = '';
  document.getElementById('editar-perfil-modal').hidden = false;
  document.getElementById('editar-nome').focus();
}
function fecharEdicaoPerfil() {
  document.getElementById('editar-perfil-modal').hidden = true;
}
async function salvarEdicaoPerfil(event) {
  event.preventDefault();
  const botao = document.getElementById('editar-salvar');
  const erro = document.getElementById('editar-erro');
  const nome = document.getElementById('editar-nome').value.trim();
  const serie = Number(document.getElementById('editar-serie').value);
  const vests = [...document.querySelectorAll('input[name="editar-vest"]:checked')].map(el => el.value);
  if (!nome || !vests.length) { erro.textContent = 'Informe seu nome e selecione pelo menos um vestibular.'; return; }
  botao.disabled = true;
  try {
    const res = await fetch('/api/perfil', {method:'PUT',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome, serie, vests})});
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Não foi possível salvar.');
    authGuardarPerfil(data.perfil, data.usuario);
    fecharEdicaoPerfil();
    renderPerfil();
    if (typeof showXPToast === 'function') showXPToast('Perfil atualizado com sucesso.');
  } catch(e) { erro.textContent = e.message; }
  finally { botao.disabled = false; }
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


