// js/modules/utils.js
// Utilitários: getDificuldade e post-processamento do banco

// ─── BANCO: POST-PROCESSAMENTO ─────────────────────────────
// Adiciona campos 'materia' e 'serie' a cada questão do banco
bancoDB.forEach(q => {
  if (!q.materia) q.materia = 'Matemática'; // todo o banco atual é matemática
  if (!q.serie) {
    if (q.etapa === 1) q.serie = 1;
    else if (q.etapa === 2) q.serie = 2;
    else if (q.etapa === 3) q.serie = 3;
    else q.serie = 3; // ENEM/MACRO cobrem todo EM, tratamos como 3ª série
  }
});

// ─── DIFICULDADE DAS QUESTÕES ─────────────────────────────
function getDificuldade(q) {
  const ctx = (q.contexto || '').toLowerCase();
  // Nível 4 — avançado (SIS 3, conteúdo universitário)
  if (ctx.includes('transformada') || ctx.includes('integral') || ctx.includes('autovalor') ||
      ctx.includes('edo') || ctx.includes('laplace') || ctx.includes('série de taylor') ||
      (q.vest === 'SIS' && q.etapa >= 3)) return 4;
  // Nível 3 — difícil
  if (ctx.includes('cônica') || ctx.includes('combinação') || ctx.includes('permutação') ||
      ctx.includes('determinante') || ctx.includes('logarit') || ctx.includes('trigonometr') ||
      (q.vest === 'SIS' && q.etapa === 2) || (q.vest === 'PSC' && q.etapa === 3)) return 3;
  // Nível 2 — médio
  if (ctx.includes('probabilidade') || ctx.includes('exponencial') ||
      ctx.includes('geometr') || ctx.includes('matr') ||
      ctx.includes('quadrática') || ctx.includes('progressão') ||
      ctx.includes('estatística')) return 2;
  // Nível 1 — fácil
  return 1;
}


// ─── SANITIZAÇÃO XSS ──────────────────────────────────────────
// Escapa conteúdo HTML antes de injetar via innerHTML.
// Usar em contextos onde o conteúdo não é HTML intencional.
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Retorna uma cópia para que o acervo preserve a ordem exigida pelo gabarito.
function embaralhar(itens) {
  const copia = [...itens];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function ordenarAlternativas(alternativas) {
  return embaralhar(alternativas.map((_, indice) => indice));
}


// Animação reutilizável nas chamadas ao servidor, sem dependências externas.
// O conteúdo dos textos é escapado; a função não recebe HTML do usuário.
function voaAnimacaoCarregamento(mensagem = 'Preparando atividade…') {
  return '<div class="voa-loading-journey" role="status" aria-live="polite">' +
    '<div class="voa-flight-visual" aria-hidden="true">' +
      '<span class="voa-flight-halo"></span><span class="voa-flight-orbit"></span>' +
      '<svg class="voa-flight-plane" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M42 6 5 22l15 5 6 15L42 6Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<path d="m20 27 22-21M20 27l6 15" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>' +
      '</svg>' +
      '<span class="voa-flight-spark voa-flight-spark--one"></span>' +
      '<span class="voa-flight-spark voa-flight-spark--two"></span>' +
      '<span class="voa-flight-spark voa-flight-spark--three"></span>' +
    '</div>' +
    '<strong class="voa-loading-title">' + escapeHTML(mensagem) + '</strong>' +
    '<span class="voa-loading-detail">Seu próximo desafio está chegando</span>' +
    '<span class="voa-loading-track" aria-hidden="true"></span>' +
  '</div>';
}

const voaCarregamentos = new Map();
let voaCarregamentoId = 0;
let voaCarregamentoTimer = null;

// Em requisições muito rápidas não há overlay, evitando o efeito de piscar.
// Cada operação recebe sua própria função de fechamento (sem conflitos entre requisições).
function voaIniciarCarregamento(mensagem = 'Preparando atividade…') {
  const id = ++voaCarregamentoId;
  let overlay = document.getElementById('voa-loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'voa-loading-overlay';
    overlay.className = 'voa-loading-overlay';
    overlay.hidden = true;
    overlay.innerHTML = voaAnimacaoCarregamento(mensagem);
    document.body.appendChild(overlay);
  }
  voaCarregamentos.set(id, mensagem);
  overlay.querySelector('.voa-loading-title').textContent = mensagem;
  if (!voaCarregamentoTimer && overlay.hidden) {
    voaCarregamentoTimer = setTimeout(() => {
      voaCarregamentoTimer = null;
      if (voaCarregamentos.size) overlay.hidden = false;
    }, 180);
  }
  let encerrado = false;
  return function voaFinalizarCarregamento() {
    if (encerrado) return;
    encerrado = true;
    voaCarregamentos.delete(id);
    if (!voaCarregamentos.size) {
      clearTimeout(voaCarregamentoTimer);
      voaCarregamentoTimer = null;
      overlay.hidden = true;
    } else {
      overlay.querySelector('.voa-loading-title').textContent =
        Array.from(voaCarregamentos.values()).at(-1);
    }
  };
}
