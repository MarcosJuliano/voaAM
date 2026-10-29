// js/modules/gamification.js
// XP, streak, conquistas e atualização de estatísticas


// ─── STREAK ───
function verificarStreak() {
  const el = document.getElementById('streak-days');
  if (el) el.textContent = `${state.streak} dia${state.streak !== 1 ? 's' : ''} de sequência`;
  const st = document.getElementById('perfil-streak');
  if (st) st.textContent = String(state.streak);
}

async function registrarVisita() {
  try {
    const resposta = await fetch('/api/atividade', {method:'POST', credentials:'same-origin'});
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    state.streak = Number(dados.sequencia) || 0;
    salvarState();
    verificarStreak();
    const el = document.getElementById('perfil-ultima-atividade');
    if (el) el.textContent = dados.ultima_atividade.split('-').reverse().join('/');
    localStorage.setItem('voaam_ultima_atividade', dados.ultima_atividade);
  } catch(erro) {
    console.warn('[VoaAM] Não foi possível registrar visita:', erro);
    verificarStreak();
  }
}

// ─── GAMIFICATION ───
function addXP(amount) {
  state.xp += amount;
  salvarState();
  const xpCount = document.getElementById('xp-count');
  if (xpCount) xpCount.textContent = state.xp;
  const rankXp = document.getElementById('rank-xp');
  if (rankXp) rankXp.textContent = state.xp + ' XP';
  showXPToast('+' + amount + ' XP');
}

function showXPToast(msg) {
  const t = document.getElementById('xp-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1500);
}

function spawnStars() {
  for(let i = 0; i < 3; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'float-star';
      star.textContent = ['⭐','🌟','✨'][Math.floor(Math.random()*3)];
      star.style.left = (30 + Math.random()*60) + 'vw';
      star.style.top = (40 + Math.random()*20) + 'vh';
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 900);
    }, i * 150);
  }
}

function showAchievement(icon, name) {
  const popup = document.getElementById('ach-popup');
  document.getElementById('ach-icon').textContent = icon;
  document.getElementById('ach-name').textContent = name;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 3000);
}

function showVideoMsg() {
  showXPToast('📺 Videoaula em breve!');
}

function updateStats() {
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('stat-aulas', state.aulas);
  setEl('stat-quiz', state.quizDone);
  setEl('stat-correct', state.quizCorrect);
  const pct = Math.min(100, Math.round((state.quizCorrect / Math.max(1, state.quizDone)) * 100));
  setEl('home-pct', pct + '%');
  const bar = document.getElementById('home-bar');
  if (bar) bar.style.width = pct + '%';
}


