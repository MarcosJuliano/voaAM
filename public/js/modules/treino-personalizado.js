// Treino personalizado: filtros em cascata, sessão no Flask e tela de prova dedicada.
let treinoAtual=null,treinoIndice=0,treinoRespostas={},treinoRespondendo=false;
let treinoFiltroVersao = 0;
let treinoEncerrando = false;
const treinoCampos=['vestibular','etapa','ano','disciplina','assunto','fonte'];
const treinoEl=id=>document.getElementById(id);
const treinoEscape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function treinoApi(url,opcoes={}){
 const r=await fetch(url,{credentials:'same-origin',...opcoes});
 const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.message||`HTTP ${r.status}`);return d;
}
function treinoFiltrosAte(indice){
 const f={};for(let i=0;i<indice;i++){const v=treinoEl('treino-'+treinoCampos[i])?.value;if(v)f[treinoCampos[i]]=v;}return f;
}
function treinoSelecionados(){
 const f={quantidade:Number(treinoEl('treino-quantidade')?.value||10)};
 for(const k of treinoCampos){const v=treinoEl('treino-'+k)?.value;if(v)f[k]=v;}return f;
}
async function treinoAtualizarFiltros(indice=0, selecao=null){
 const versao = ++treinoFiltroVersao;
 const status=treinoEl('treino-status');
 if(status) { status.textContent = 'Carregando opções de treino…'; status.classList.add('voa-busy-status'); }
 const btn=treinoEl('treino-iniciar');if(btn)btn.disabled=true;
 const selects = treinoCampos.map(campo => treinoEl('treino-'+campo));
 selects.forEach((el, i) => { el.disabled = i >= indice; });
 try {
  // Cascata: cada seleção restringe as opções dos campos seguintes.
  for(let i=indice;i<treinoCampos.length;i++){
   const campo=treinoCampos[i],sel=treinoEl('treino-'+campo);
   if(!sel)continue;
   const antigo=selecao ? (selecao[campo] || '') : sel.value;
   const params=new URLSearchParams(treinoFiltrosAte(i));
   const d=await treinoApi('/api/treino/catalogo?'+params.toString());
   if (versao !== treinoFiltroVersao) return;
   const plural={vestibular:'vestibulares',etapa:'etapas',ano:'anos',disciplina:'disciplinas',assunto:'assuntos',fonte:'fontes'}[campo];
   sel.replaceChildren(new Option('Todos / aleatório',''));
   for(const item of d[plural]||[]) {
    const nome = campo === 'etapa' ? `${item.valor}ª etapa` : item.valor;
    sel.add(new Option(`${nome} (${item.total})`, item.valor));
   }
   sel.value=[...sel.options].some(o=>o.value===antigo)?antigo:'';
  }
  const result=await treinoApi('/api/treino/catalogo?'+new URLSearchParams(treinoFiltrosAte(treinoCampos.length)).toString());
  if (versao !== treinoFiltroVersao) return;
  if(status)status.textContent=result.disponiveis
    ? `${result.disponiveis} questões disponíveis para sua seleção. O sorteio não repete questões no mesmo treino.`
    : 'Essa combinação não tem questões. Altere um dos filtros.';
  if(btn)btn.disabled=result.disponiveis===0;
 }catch(e){if(versao === treinoFiltroVersao && status)status.textContent='Não foi possível filtrar: '+e.message;}
 finally {
  if (versao === treinoFiltroVersao) {
   if(status)status.classList.remove('voa-busy-status');
   selects.forEach(el => { el.disabled = false; });
  }
 }
}
function treinoCarregarFiltros(selecao){
 for(let i=0;i<treinoCampos.length;i++){
  const sel=treinoEl('treino-'+treinoCampos[i]);
  if(sel && !sel.dataset.listenerV5){sel.addEventListener('change',()=>treinoAtualizarFiltros(i+1));sel.dataset.listenerV5='1';}
 }
 return treinoAtualizarFiltros(0, selecao);
}
async function treinoIniciar(event){
 event?.preventDefault();const btn=treinoEl('treino-iniciar'),status=treinoEl('treino-status');
 if (!btn || btn.disabled) return;
 const versao = treinoFiltroVersao;
 const textoOriginal = btn.textContent;
 const fecharAnimacao = voaIniciarCarregamento('Preparando seu treino…');
 btn.disabled=true;
 btn.classList.add('voa-busy-button');
 btn.textContent='Preparando questões…';
 if(status)status.textContent='Montando seu treino personalizado…';
 try {
  const resposta=await treinoApi('/api/treino/iniciar',{
   method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(treinoSelecionados())
  });
  treinoAtual=resposta;treinoIndice=0;treinoRespostas={};treinoRespondendo=false;
  treinoEl('treino-overlay').hidden=false;
  treinoEl('app-wrapper').inert=true;
  treinoRender();
  treinoEl('treino-overlay').querySelector('.back-btn').focus();
 }catch(e){if(status)status.textContent=e.message;}
 finally{
  fecharAnimacao();
  btn.classList.remove('voa-busy-button');
  btn.textContent=textoOriginal;
  if(versao === treinoFiltroVersao)btn.disabled=false;
 }
}
function treinoRender(){
 if(!treinoAtual)return;
 const q=treinoAtual.questoes[treinoIndice];
 if(!q){treinoFinalizar();return;}
 treinoEl('treino-scroll').scrollTop=0;
 treinoEl('treino-progresso-fill').style.width = (100 * (treinoIndice+1) / treinoAtual.questoes.length) + '%';
 treinoEl('treino-progresso-overlay').textContent=`Questão ${treinoIndice+1} de ${treinoAtual.questoes.length}`;
 const meta=[q.vestibular,q.etapa&&`${q.etapa}ª etapa`,q.ano,q.disciplina,q.assunto,q.fonte].filter(Boolean).join(' · ');
 let img='';
 if(typeof q.imagem==='string' && /^\/?assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg)$/i.test(q.imagem)){
  img=`<figure class="sc-img-box"><img alt="Figura de apoio à questão" src="/${treinoEscape(q.imagem.replace(/^\//,''))}"></figure>`;
 }
 const r=treinoRespostas[q.id];
 treinoEl('treino-questao-overlay').innerHTML=`<div class="assessment-meta"><span class="quiz-badge">Treino personalizado</span><span >${treinoEscape(meta)}</span></div>
 <div class="question-card"><p class="question-text">${treinoEscape(q.enunciado)}</p>${img}</div>
 <div class="options-list">${q.alternativas.map((alt,i)=>`<button class="option-btn treino-alternativa" type="button" data-alt="${i}" ${r?'disabled':''}>
 <span class="option-letter">${'ABCDE'[i]||i+1}</span><span class="ex-alternativa">${treinoEscape(alt)}</span></button>`).join('')}</div>`;
 treinoEl('treino-feedback-overlay').textContent='';
 const proxima=treinoEl('treino-proxima-overlay');proxima.disabled=!r;
 proxima.textContent=treinoIndice===treinoAtual.questoes.length-1?'Ver resultado':'Próxima questão';
 treinoEl('treino-pular-overlay').disabled=!!r;
 treinoEl('treino-questao-overlay').querySelectorAll('[data-alt]').forEach(b=>b.addEventListener('click',()=>treinoResponder(Number(b.dataset.alt))));
 if(r)treinoExibirFeedback(r);
}
async function treinoResponder(indice){
 const q=treinoAtual?.questoes[treinoIndice];if(!q||treinoRespostas[q.id]||treinoRespondendo)return;
 treinoRespondendo=true;
 const fecharAnimacao = voaIniciarCarregamento('Conferindo sua resposta…');
 const btns=treinoEl('treino-questao-overlay').querySelectorAll('[data-alt]');btns.forEach(b=>b.disabled=true);
 treinoEl('treino-pular-overlay').disabled=true;
 const feedbackPendente=treinoEl('treino-feedback-overlay');
 feedbackPendente.textContent='Conferindo resposta…';
 feedbackPendente.classList.add('voa-busy-status');
 try {
  const r=await treinoApi(`/api/treino/${treinoAtual.treino_id}/responder`,{
   method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({questao_id:q.id,alternativa:indice})
  });
  treinoRespostas[q.id]={...r,selecionada:indice};
  feedbackPendente.classList.remove('voa-busy-status');
  treinoExibirFeedback(treinoRespostas[q.id]);
  if (r.acertou) spawnStars();
  treinoEl('treino-proxima-overlay').disabled=false;treinoEl('treino-pular-overlay').disabled=true;
  if(r.xp_ganho)if(typeof showXPToast==='function')showXPToast('+'+r.xp_ganho+' XP');
  if(typeof atualizarProgresso==='function')await atualizarProgresso();
  if(typeof atualizarNivel==='function')atualizarNivel();
 }catch(e){treinoEl('treino-pular-overlay').disabled=false;btns.forEach(b=>b.disabled=false);feedbackPendente.textContent='Erro: '+e.message;}
 finally{fecharAnimacao();feedbackPendente.classList.remove('voa-busy-status');treinoRespondendo=false;}
}
function treinoExibirFeedback(r){
 const fb=treinoEl('treino-feedback-overlay');
 fb.textContent=(r.acertou?'Resposta correta. ':'Resposta incorreta. ')+`Alternativa correta: ${'ABCDE'[r.correta]||'?'}${r.explicacao?' — '+r.explicacao:''}`;
 fb.classList.toggle('treino-acerto',!!r.acertou);
 treinoEl('treino-questao-overlay').querySelectorAll('[data-alt]').forEach(b=>{
  const i=Number(b.dataset.alt);b.disabled=true;b.classList.toggle('correct',i===r.correta);
  b.classList.toggle('wrong',i===r.selecionada&&!r.acertou);
 });
}
function treinoPular(){if(!treinoAtual||treinoRespondendo)return;treinoProxima();}
function treinoProxima() {
 if (!treinoAtual || treinoRespondendo || treinoEncerrando) return;
 if (treinoIndice + 1 >= treinoAtual.questoes.length) treinoFinalizar();
 else {
  treinoIndice++;
  treinoRender();
 }
}
async function treinoFinalizar(sair = false) {
 if (!treinoAtual || treinoRespondendo || treinoEncerrando) return;
 treinoEncerrando = true;
 const fecharAnimacao = voaIniciarCarregamento('Salvando resultado do treino…');
 const proxima = treinoEl('treino-proxima-overlay');
 const pular = treinoEl('treino-pular-overlay');
 const estado = [proxima.disabled, pular.disabled];
 proxima.disabled = pular.disabled = true;
 treinoEl('treino-feedback-overlay').textContent = 'Finalizando treino…';
 treinoEl('treino-feedback-overlay').classList.add('voa-busy-status');
 try {
  const r = await treinoApi(`/api/treino/${treinoAtual.treino_id}/encerrar`, {method:'POST'});
  treinoAtual = null;
  if (sair) {
   treinoNovo();
   return;
  }
  treinoEl('treino-questao-overlay').innerHTML = `<div class="result-card">
    <h2 class="result-title">Treino concluído</h2>
    <p class="result-score">${r.acertos}/${r.total}</p>
    <p class="result-sub">${r.respondidas} respondidas · ${r.total-r.respondidas} puladas</p>
    <button type="button" class="btn-primary" onclick="treinoNovo()">Voltar aos filtros</button>
  </div>`;
  treinoEl('treino-feedback-overlay').textContent = '';
  treinoEl('treino-progresso-overlay').textContent = 'Resultado';
  treinoEl('treino-barra').hidden = true;
  treinoEl('treino-rodape').hidden = true;
  treinoEl('treino-scroll').scrollTop = 0;
  treinoEl('treino-questao-overlay').querySelector('button').focus();
  if (typeof atualizarNivel === 'function') atualizarNivel();
 } catch (e) {
  treinoEl('treino-feedback-overlay').textContent = 'Não foi possível encerrar: ' + e.message;
  [proxima.disabled, pular.disabled] = estado;
 } finally {
  fecharAnimacao();
  treinoEl('treino-feedback-overlay').classList.remove('voa-busy-status');
  treinoEncerrando = false;
 }
}
function treinoSair() {
 if (treinoRespondendo || treinoEncerrando) return;
 if (!treinoAtual) {
  treinoNovo();
  return;
 }
 treinoEl('treino-confirmar-saida').hidden = false;
 treinoEl('treino-confirmar-saida').querySelector('button').focus();
}
function treinoCancelarSaida() {
 treinoEl('treino-confirmar-saida').hidden = true;
 treinoEl('treino-overlay').querySelector('.back-btn').focus();
}
function treinoConfirmarSaida() {
 treinoCancelarSaida();
 treinoFinalizar(true);
}
function treinoNovo() {
 treinoAtual = null;
 treinoEl('treino-overlay').hidden = true;
 treinoEl('app-wrapper').inert = false;
 treinoEl('treino-rodape').hidden = false;
 treinoEl('treino-barra').hidden = false;
 treinoEl('pratab-custom').focus();
 treinoCarregarFiltros();
}

document.addEventListener('keydown', event => {
 if (event.key !== 'Escape' || treinoEl('treino-overlay').hidden) return;
 if (!treinoEl('treino-confirmar-saida').hidden) treinoCancelarSaida();
 else treinoSair();
});
