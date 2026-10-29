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
async function atualizarProgresso() {
  try {
    const r=await fetch('/api/progresso',{credentials:'same-origin'});
    if(!r.ok) return;
    const p=await r.json();
    state.xp=Number(p.xp)||0;
    state.quizDone=Number(p.questoes_respondidas)||0;
    state.quizCorrect=Number(p.acertos)||0;
    state.aulas=Number(p.aulas_concluidas)||0;
    state.streak=Number(p.sequencia_dias)||0;
    const xpCount=document.getElementById('xp-count');if(xpCount)xpCount.textContent=state.xp;
    updateStats();verificarStreak();
    if(typeof renderNivel==='function')renderNivel();
  }catch(e){console.warn('Progresso no servidor indisponível:',e);}
}
async function avaliarRespostaServidor(questao_id,alternativa) {
  const r=await fetch('/api/avaliacao/responder',{
    method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({questao_id,alternativa})
  });
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(d.message||`HTTP ${r.status}`);
  if(d.xp_ganho>0)showXPToast('+'+d.xp_ganho+' XP');
  await atualizarProgresso();
  if(typeof atualizarNivel==='function')atualizarNivel();
  return d;
}
function addXP(amount) {
  // Compatibilidade: chamadas legadas não podem conceder XP arbitrário.
  console.warn('[voaAM] addXP local desativado; usar a API de correção.',amount);
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


