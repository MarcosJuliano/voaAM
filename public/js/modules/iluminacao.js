// O brilho acompanha o ponteiro somente nas superfícies e controles sob ele.
(() => {
  const paineis = [
    '.header', '.bottom-nav', '.liquid-glass', '.perfil-metric', '.perfil-section',
    '.red-hist-item', '.red-tema-card', '.red-ai-relatorio', '.red-rascunho-revisao',
    '.progress-card', '.topic-card', '.action-card', '.vest-card', '.vest-full-card',
    '.sim-card', '.simulado-card', '.question-card', '.result-card', '.bp-ano', '.ranking-redacao-grid > div',
    '.pratica-opcao', '.pratica-cartao', '.ex-lista-item', '.subject-tab', '.serie-btn', '.page-tab',
    'dialog', '.vidas-popover', '.sc-dialog',
  ].join(',');
  const controles = [
    'button:not(:disabled):not([aria-disabled="true"])', 'a[href]', 'summary',
    'input:not([type="hidden"]):not(:disabled)', 'textarea:not(:disabled)', 'select:not(:disabled)',
    'label:has(input:not(:disabled))', '[role="button"]:not([aria-disabled="true"])',
    '[onclick]:not(button):not([aria-disabled="true"])',
  ].join(',');
  const efeito = document.createElement('div');
  efeito.className = 'cursor-luz';
  efeito.setAttribute('aria-hidden', 'true');
  document.body.append(efeito);
  let painelAnterior = null;
  let ultimoPonteiro = null;
  let quadro = 0;

  function apagar() {
    painelAnterior?.classList.remove('luz-painel-acesa');
    painelAnterior = null;
    efeito.classList.remove('cursor-luz-visivel');
  }

  function iluminar() {
    quadro = 0;
    if (!ultimoPonteiro) return;
    const {x, y} = ultimoPonteiro;
    const alvo = document.elementFromPoint(x, y);
    const painel = alvo?.closest(paineis);
    if (painelAnterior !== painel) {
      painelAnterior?.classList.remove('luz-painel-acesa');
      painelAnterior = painel;
    }
    if (painel && !painel.matches(':disabled')) {
      const caixa = painel.getBoundingClientRect();
      painel.style.setProperty('--luz-x', `${x - caixa.left}px`);
      painel.style.setProperty('--luz-y', `${y - caixa.top}px`);
      painel.classList.add('luz-painel-acesa');
    }

    const controle = alvo?.closest(controles);
    if (!controle || controle.closest('[inert]')) {
      efeito.classList.remove('cursor-luz-visivel');
      return;
    }
    const {top, left, right, bottom} = controle.getBoundingClientRect();
    const raio = getComputedStyle(controle).borderRadius.split(' ')[0];
    // No top layer o brilho também fica acima do conteúdo do diálogo.
    const janela = controle.closest('dialog[open]');
    const camada = janela || document.body;
    if (efeito.parentElement !== camada) camada.append(efeito);
    const largura = document.documentElement.clientWidth;
    const altura = document.documentElement.clientHeight;
    efeito.style.setProperty('--cursor-x', `${x}px`);
    efeito.style.setProperty('--cursor-y', `${y}px`);
    efeito.style.setProperty('--luz-recorte', `${top}px ${largura - right}px ${altura - bottom}px ${left}px round ${raio}`);
    efeito.classList.toggle('cursor-luz-visivel',
      x >= left && x <= right && y >= top && y <= bottom);
  }

  function atualizar() {
    if (!quadro && ultimoPonteiro) quadro = requestAnimationFrame(iluminar);
  }

  document.addEventListener('pointermove', evento => {
    if (evento.pointerType === 'touch') {
      ultimoPonteiro = null;
      apagar();
      return;
    }
    ultimoPonteiro = {x: evento.clientX, y: evento.clientY};
    atualizar();
  }, {passive: true});
  document.addEventListener('scroll', atualizar, {capture: true, passive: true});
  document.addEventListener('click', atualizar, {passive: true});
  window.addEventListener('resize', atualizar, {passive: true});
  document.documentElement.addEventListener('pointerleave', () => {
    ultimoPonteiro = null;
    apagar();
  });
  window.addEventListener('blur', () => {
    ultimoPonteiro = null;
    apagar();
  });
})();
