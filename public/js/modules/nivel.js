// Níveis 1–50. Nível 50 exige 100% do catálogo de questões + aulas + temas.
let nivelCompleto = false;
let nivelResumo = null;
async function atualizarNivel(){
  try{
    const r=await fetch('/api/nivel',{credentials:'same-origin'});
    if(!r.ok)return;
    nivelResumo=await r.json();nivelCompleto=!!nivelResumo.completo;
  }catch(e){console.warn('Nível temporariamente indisponível',e);}
  renderNivel();
}
const XP_POR_NIVEL = 200;
const xpNumero = new Intl.NumberFormat('pt-BR');
const xpBotao = document.getElementById('xp-display');
const xpDetalhes = document.getElementById('xp-detalhes');
const xpArea = document.getElementById('xp-faixa');

if (xpArea && xpBotao && xpDetalhes) {
  function mostrarDetalhesXp(aberto) {
    xpDetalhes.hidden = !aberto;
    xpBotao.setAttribute('aria-expanded', String(aberto));
  }

  xpArea.addEventListener('pointerenter', e => {
    if (e.pointerType === 'mouse') mostrarDetalhesXp(true);
  });
  xpArea.addEventListener('pointerleave', e => {
    if (e.pointerType === 'mouse' && !xpBotao.matches(':focus-visible')) mostrarDetalhesXp(false);
  });
  xpBotao.addEventListener('focus', () => {
    if (xpBotao.matches(':focus-visible')) mostrarDetalhesXp(true);
  });
  xpBotao.addEventListener('blur', () => mostrarDetalhesXp(false));
  xpBotao.addEventListener('click', e => {
    mostrarDetalhesXp(e.pointerType === 'mouse' || xpDetalhes.hidden);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !xpDetalhes.hidden) mostrarDetalhesXp(false);
  });
  document.addEventListener('pointerdown', e => {
    if (!xpArea.contains(e.target)) mostrarDetalhesXp(false);
  });
}

function renderNivel() {
  const xp = Math.max(0, Number(state.xp) || 0);
  const nivel = nivelCompleto ? 50 : Math.min(49, 1 + Math.floor(xp / XP_POR_NIVEL));
  const meta = nivel >= 49 ? 100 : XP_POR_NIVEL;
  const progresso = nivelCompleto ? 100 : (nivel === 49 ? nivelResumo?.percentual || 0 : xp % XP_POR_NIVEL);
  const mostrar = (id, texto) => {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
  };
  mostrar('xp-nivel', `Nível ${nivel}`);
  mostrar('xp-count', xpNumero.format(xp));
  const preenchimento = document.getElementById('xp-preenchimento');
  const porcentagem = (100 * progresso / meta) + '%';
  if (preenchimento) preenchimento.style.width = porcentagem;
  const medidor = document.getElementById('xp-barra');
  if (medidor) {
    medidor.setAttribute('aria-valuemax', meta);
    medidor.setAttribute('aria-valuenow', progresso);
    medidor.setAttribute('aria-label', nivel >= 49 ? 'Progresso do catálogo' : 'XP no nível atual');
  }

  let proximo = `Faltam ${xpNumero.format(meta - progresso)} XP para o nível ${nivel + 1}.`;
  if (nivelCompleto) proximo = 'Você chegou ao nível máximo.';
  else if (nivel === 49) proximo = 'Complete o catálogo para chegar ao nível 50.';
  mostrar('xp-proximo', proximo);

  const perfil = document.getElementById('perfil-nivel');
  if (perfil) perfil.textContent = nivel;
  const barra = document.getElementById('nivel-barra');
  if (barra) barra.style.width = porcentagem;
  const desc = document.getElementById('nivel-descricao');
  if (desc && nivelResumo) {
    const catalogo = `${nivelResumo.concluidos} de ${nivelResumo.total} conteúdos concluídos (${nivelResumo.percentual}%).`;
    desc.textContent = catalogo + ' ' + proximo;
  }
}
renderNivel();
setTimeout(atualizarNivel,600);


// Registra atividades das telas antigas no mesmo histórico do treino personalizado.
// O backend confere a alternativa e não aceita um "acertou" enviado pelo browser.
async function registrarQuestoesLegadas(respostas) {
  if (!Array.isArray(respostas) || respostas.length === 0) return;
  try {
    const r=await fetch('/api/avaliacao/lote', {
      method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({respostas})
    });
    if(!r.ok) console.warn('[voaAM] Não foi possível salvar tentativas anteriores:',r.status);
    else { if(typeof atualizarProgresso==='function') await atualizarProgresso(); if(typeof atualizarNivel==='function') atualizarNivel(); }
  }catch(e){console.warn('[voaAM] Sem conexão ao registrar respostas:',e);}
}
