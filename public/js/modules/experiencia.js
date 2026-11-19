// Recomendações e atendimento, com dados obtidos do catálogo do servidor.
const expModal = document.getElementById('preferencias-inicio');
async function expBuscarPreferencias() {
  const dados = await authRequisicao('/api/preferencias');
  const select=document.getElementById('preferencias-inicio-disciplina');
  select.replaceChildren(...dados.opcoes.map(op=>new Option(op,op)));
  select.value=dados.disciplina;
  expRenderRecomendacoes(dados);
  return dados;
}
function expRenderRecomendacoes(dados) {
  const lista = document.getElementById('home-recomendacoes-lista');
  const descricao = document.getElementById('home-preferencia-desc');
  const materia = dados.recomendacoes.find(r => r.disciplina === dados.disciplina);
  if (!materia || materia.disciplina === 'Matemática') {
    descricao.textContent = 'Escolha um assunto de Matemática para praticar.';
    exRenderAssuntos(lista, id => {
      goTo('praticar', 'ex');
      exSelecionarAssunto(id);
      document.getElementById('ex-nivel-panel').querySelector('button').focus();
    }, 2);
    return;
  }

  descricao.textContent = `Sua preferência de estudo é ${materia.disciplina}.`;
  const icones = {'Biologia': 'leaf', 'História': 'archive', 'Português': 'book-open'};
  const grade = document.createElement('div');
  grade.className = 'ex-assunto-grade';
  grade.append(exCartaoAssunto({
    titulo: materia.disciplina,
    sub: 'Treino personalizado',
    icone: icones[materia.disciplina] || 'book-open',
    quantidade: materia.questoes,
  }, () => {
    goTo('praticar', 'personalizado', {disciplina: materia.disciplina});
    document.getElementById('treino-titulo').focus();
  }));
  lista.replaceChildren(grade);
}
async function abrirPreferenciasInicio() {
 try{await expBuscarPreferencias();expModal.showModal();}
 catch(e){if(typeof showXPToast==='function')showXPToast('Não foi possível carregar as preferências.');}
}
document.getElementById('preferencias-inicio-agora-nao').onclick=()=>expModal.close();
document.getElementById('preferencias-inicio-form').onsubmit=async e=>{
 e.preventDefault();
 const el=document.getElementById('preferencias-inicio-disciplina');
 try{
  const dados=await authRequisicao('/api/preferencias',{method:'POST',body:JSON.stringify({disciplina:el.value})});
  expRenderRecomendacoes(dados);expModal.close();
 }catch(erro){document.getElementById('preferencias-inicio-erro').textContent=erro.message;}
};
async function iniciarPreferencias(){
 try{
  const dados=await expBuscarPreferencias();
  if(!dados.configurado && !expModal.open) expModal.showModal();
 }catch(e){console.warn('[voaAM] Preferências indisponíveis',e);}
}
const expSuporte=document.getElementById('suporte-dialogo');
for (const botao of document.querySelectorAll('[data-abrir-suporte]')) {
  botao.addEventListener('click', () => expSuporte.showModal());
}
document.getElementById('suporte-fechar').onclick=()=>expSuporte.close();
document.getElementById('suporte-form').onsubmit=async e=>{
 e.preventDefault();
 const feedback=document.getElementById('suporte-feedback');feedback.textContent='Enviando…';
 try{
  const d=await authRequisicao('/api/suporte',{method:'POST',body:JSON.stringify({
   assunto:document.getElementById('suporte-assunto').value,
   mensagem:document.getElementById('suporte-mensagem').value
  })});
  feedback.textContent=`Solicitação recebida. Protocolo nº ${d.protocolo}.`;
  e.target.reset();
 }catch(e){feedback.textContent=e.message;}
};

// Menu lateral é opcional no desktop; a navegação inferior permanece no celular.
const expMenuBotao=document.getElementById('menu-lateral-toggle');
const expAppWrapper=document.getElementById('app-wrapper');
function expAplicarMenu(minimizado) {
 expAppWrapper.classList.toggle('menu-minimizado',minimizado);
 expMenuBotao.setAttribute('aria-expanded',String(!minimizado));
 const rotulo = minimizado ? 'Expandir menu' : 'Reduzir menu';
 document.getElementById('menu-lateral-rotulo').textContent = rotulo;
 expMenuBotao.title = rotulo;
 try{localStorage.setItem('voaam_menu_minimizado',minimizado?'1':'0');}catch{}
 if(typeof atualizarLuzNavegacao==='function')requestAnimationFrame(atualizarLuzNavegacao);
}
expMenuBotao.onclick=()=>expAplicarMenu(!expAppWrapper.classList.contains('menu-minimizado'));
expAplicarMenu(localStorage.getItem('voaam_menu_minimizado')==='1');
requestAnimationFrame(() => requestAnimationFrame(() => expAppWrapper.classList.add('menu-animado')));
