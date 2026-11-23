// Recomendações e atendimento, com dados obtidos do catálogo do servidor.
const expModal = document.getElementById('preferencias-inicio');
let expPedidoRecomendacoes = 0;
async function expBuscarPreferencias() {
  const dados = await authRequisicao('/api/preferencias');
  const select=document.getElementById('preferencias-inicio-disciplina');
  select.replaceChildren(...dados.opcoes.map(op=>new Option(op,op)));
  select.value=dados.disciplina;
  await expRenderRecomendacoes(dados);
  return dados;
}
async function expRenderRecomendacoes(dados) {
  const pedido = ++expPedidoRecomendacoes;
  const contaId = authConta?.id;
  const lista = document.getElementById('home-recomendacoes-lista');
  const descricao = document.getElementById('home-preferencia-desc');
  const materia = dados.recomendacoes.find(r => r.disciplina === dados.disciplina);
  const disciplina = materia?.disciplina || 'Matemática';
  const area = Object.keys(EX_MATERIAS).find(chave => EX_MATERIAS[chave].includes(disciplina));
  lista.replaceChildren();
  descricao.textContent = `Escolha um assunto de ${disciplina} para praticar.`;

  if (area) {
    try {
      const vestibulares = exVestibularesAtivos('perfil');
      const assuntos = await exAssuntosDisponiveis(disciplina, vestibulares);
      if (pedido !== expPedidoRecomendacoes || contaId !== authConta?.id) return;
      const abrirExercicios = (filtro, assunto) => {
        exAreaAtual = area;
        exMateriaSelecionada = disciplina;
        exDefinirFiltroVestibular(filtro);
        goTo('praticar', 'ex');
        if (assunto) exSelecionarAssunto(assunto);
        else document.getElementById('ex-vestibular').focus();
      };
      if (assuntos.length) {
        if (vestibulares.length) descricao.textContent = `${disciplina} · ${vestibulares.join(', ')}`;
        exRenderAssuntos(lista, assuntos, assunto => abrirExercicios('perfil', assunto), 2);
      } else {
        descricao.textContent = `Nenhum assunto de ${disciplina} para os vestibulares do seu perfil.`;
        const verTodos = document.createElement('button');
        verTodos.type = 'button';
        verTodos.className = 'btn-secondary';
        verTodos.textContent = 'Ver todos os vestibulares';
        verTodos.addEventListener('click', () => abrirExercicios(''));
        lista.append(verTodos);
      }
    } catch {
      if (pedido !== expPedidoRecomendacoes || contaId !== authConta?.id) return;
      descricao.textContent = `Não foi possível carregar os assuntos de ${disciplina}.`;
      const tentar = document.createElement('button');
      tentar.type = 'button';
      tentar.className = 'btn-secondary';
      tentar.textContent = 'Tentar novamente';
      tentar.addEventListener('click', () => expRenderRecomendacoes(dados));
      lista.append(tentar);
    }
    return;
  }

  descricao.textContent = `Sua preferência de estudo é ${disciplina}.`;
  const grade = document.createElement('div');
  grade.className = 'ex-assunto-grade';
  grade.append(exCartaoAssunto({
    titulo: materia.disciplina,
    sub: 'Treino personalizado',
    icone: 'book-open',
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
// O fragmento de Perfil fica oculto nas outras telas. Um <dialog> modal dentro
// desse slot tornava todo o restante da interface inerte sem mostrar o Suporte.
// Mantemos o modal no <body>, fora dos slots que alternam display:none.
const expSuporte = document.getElementById('suporte-dialogo');
if (expSuporte && expSuporte.parentElement !== document.body) {
  document.body.appendChild(expSuporte);
}
for (const botao of document.querySelectorAll('[data-abrir-suporte]')) {
  botao.addEventListener('click', () => {
    if (expSuporte && !expSuporte.open) expSuporte.showModal();
  });
}
document.getElementById('suporte-fechar').onclick = () => expSuporte.close();
// Fecha ao tocar no fundo do modal; a tecla Esc já é tratada pelo navegador.
expSuporte.addEventListener('click', event => {
  if (event.target !== expSuporte) return;
  const area = expSuporte.getBoundingClientRect();
  if (event.clientX < area.left || event.clientX > area.right ||
      event.clientY < area.top || event.clientY > area.bottom) expSuporte.close();
});
document.getElementById('suporte-form').onsubmit=async e=>{
 e.preventDefault();
 const feedback=document.getElementById('suporte-feedback');feedback.textContent='Enviando…';
 try{
  const d=await authRequisicao('/api/suporte',{method:'POST',body:JSON.stringify({
   assunto:document.getElementById('suporte-assunto').value,
   mensagem:document.getElementById('suporte-mensagem').value
  })});
  feedback.textContent=`Solicitação registrada — protocolo nº ${d.protocolo}. ${d.notificacao==='enviada'?'O atendimento foi notificado por e-mail.':'A mensagem está registrada; o aviso por e-mail ainda não foi confirmado.'}`;
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
