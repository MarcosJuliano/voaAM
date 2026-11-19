function dialogoForaDaJanela(evento) {
  const dialogo = evento.target;
  if (!(dialogo instanceof HTMLDialogElement) || !dialogo.open || evento.button !== 0) return null;
  const {left, right, top, bottom} = dialogo.getBoundingClientRect();
  const fora = evento.clientX < left || evento.clientX > right || evento.clientY < top || evento.clientY > bottom;
  return fora ? dialogo : null;
}

let dialogoPressionadoFora = null;
document.addEventListener('pointerdown', evento => {
  dialogoPressionadoFora = dialogoForaDaJanela(evento);
});
document.addEventListener('pointercancel', () => { dialogoPressionadoFora = null; });
document.addEventListener('click', evento => {
  const dialogo = dialogoForaDaJanela(evento);
  const pressionadoFora = dialogoPressionadoFora;
  dialogoPressionadoFora = null;
  if (!dialogo || dialogo !== pressionadoFora) return;
  if (typeof dialogo.requestClose === 'function') dialogo.requestClose();
  else if (dialogo.dispatchEvent(new Event('cancel', {cancelable: true}))) dialogo.close();
});

// Usa a camada modal nativa para funcionar também sobre o leitor de redações.
function confirmarAcao({titulo, mensagem, acao, executar, cancelarTexto = 'Cancelar', destrutiva = true}) {
  const dialogo = document.getElementById('confirmar-acao');
  if (dialogo.open) return;
  const form = dialogo.querySelector('form');
  const confirmar = form.querySelector('[type="submit"]');
  const cancelar = form.querySelector('[data-cancelar]');
  const erro = form.querySelector('[role="alert"]');
  const impedirSaida = evento => { if (confirmar.disabled) evento.preventDefault(); };
  dialogo.querySelector('h2').textContent = titulo;
  dialogo.querySelector('#confirmar-mensagem').textContent = mensagem;
  confirmar.textContent = acao;
  confirmar.classList.toggle('sc-dialog-danger', destrutiva);
  confirmar.classList.toggle('sc-dialog-primary', !destrutiva);
  cancelar.textContent = cancelarTexto;
  erro.textContent = '';
  dialogo.addEventListener('cancel', impedirSaida);
  dialogo.addEventListener('close', () => {
    form.onsubmit = null;
    dialogo.removeEventListener('cancel', impedirSaida);
  }, {once: true});
  cancelar.onclick = () => dialogo.close();
  form.onsubmit = async evento => {
    evento.preventDefault();
    if (confirmar.disabled) return;
    confirmar.disabled = cancelar.disabled = true;
    erro.textContent = '';
    try {
      await executar();
      dialogo.close();
    } catch (e) {
      erro.textContent = e.message || 'Não foi possível concluir a ação.';
    } finally {
      confirmar.disabled = cancelar.disabled = false;
    }
  };
  dialogo.showModal();
  cancelar.focus();
}

function ampliarImagemPerfil(titulo, imagem, tema, alterar) {
  const dialogo = document.getElementById('perfil-imagem-dialogo');
  const ampliada = document.getElementById('perfil-imagem-ampliada');
  const fundo = document.getElementById('perfil-imagem-tema');
  document.getElementById('perfil-imagem-titulo').textContent = titulo;
  ampliada.alt = titulo;
  ampliada.hidden = !imagem;
  if (imagem) ampliada.src = imagem;
  else ampliada.removeAttribute('src');
  fundo.hidden = Boolean(imagem);
  fundo.className = 'ranking-publico-banner banner-' + (tema || 'oceano');
  const botao = document.getElementById('perfil-imagem-alterar');
  botao.hidden = !alterar;
  botao.onclick = alterar ? () => {
    dialogo.close();
    alterar();
  } : null;
  dialogo.showModal();
}
