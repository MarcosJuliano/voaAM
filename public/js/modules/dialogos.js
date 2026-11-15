// Usa a camada modal nativa para funcionar também sobre o leitor de redações.
function confirmarAcao({titulo, mensagem, acao, executar}) {
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
