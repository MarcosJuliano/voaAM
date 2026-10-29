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
function renderNivel(){
  // XP recebido do SQLite fornece níveis intermediários; não libera o nível máximo.
  const nivelXP=Math.min(49,1+Math.floor(Math.max(0,Number(state.xp)||0)/200));
  const nivel=nivelCompleto?50:nivelXP;
  const titulo=document.getElementById('header-nivel');
  if(titulo)titulo.textContent=`Nível ${nivel}/50`;
  const perfil=document.getElementById('perfil-nivel');if(perfil)perfil.textContent=nivel;
  const barra=document.getElementById('nivel-barra');
  if(barra)barra.style.width=(nivelCompleto?100:(Math.max(0,(state.xp||0)%200)/200*100))+'%';
  const desc=document.getElementById('nivel-descricao');
  if(desc&&nivelResumo)desc.textContent=`${nivelResumo.concluidos} de ${nivelResumo.total} conteúdos concluídos (${nivelResumo.percentual}%). Nível 50 somente após completar todas as questões do catálogo, aulas e temas de redação. Próximo nível a cada 200 XP.`;
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
