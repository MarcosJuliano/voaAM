// js/modules/materia.js
// Seleção de matéria/série e status real de conclusão dos tópicos.

const TOPICOS_CONCLUIDOS_PREFIX = 'voaam_topicos_concluidos';
let topicosConcluidos = new Map();
let topicosProgressoCarregado = false;
let topicosProgressoPromise = null;

function chaveLocalTopicos() {
  const usuarioId = localStorage.getItem('voaam_usuario_id');
  return `${TOPICOS_CONCLUIDOS_PREFIX}:${usuarioId || 'local'}`;
}

function lerTopicosLocais() {
  try {
    const dados = JSON.parse(localStorage.getItem(chaveLocalTopicos()) || '{}');
    return new Map(Object.entries(dados && typeof dados === 'object' && !Array.isArray(dados) ? dados : {}));
  } catch (_) {
    return new Map();
  }
}

function salvarTopicosLocais() {
  localStorage.setItem(chaveLocalTopicos(), JSON.stringify(Object.fromEntries(topicosConcluidos)));
}

function montarTopicoId(disciplina, serie, quizId) {
  return `${disciplina}:${serie}:${quizId}`;
}

// Busca conclusões no SQLite via Flask. O localStorage serve de cache/fallback.
async function carregarProgressoTopicos() {
  if (topicosProgressoCarregado) return;
  if (topicosProgressoPromise) return topicosProgressoPromise;

  topicosProgressoPromise = (async () => {
    topicosConcluidos = lerTopicosLocais();
    try {
      const resposta = await fetch('/api/topicos-concluidos', {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      if (resposta.ok) {
        const dados = await resposta.json();
        const remotos = new Map((dados.topicos || []).map(t => [t.topico_id, t]));
        // A API é a fonte de verdade quando há sessão: não misture checks antigos
        // do navegador que poderiam aparecer como concluídos sem registro no SQLite.
        topicosConcluidos = remotos;
        salvarTopicosLocais();
      } else if (resposta.status === 401) {
        topicosConcluidos = new Map(); // sem sessão não mostrar progresso de outra conta
      } else {
        console.warn('[VoaAM] Não foi possível carregar conclusões dos tópicos. Usando cache local.');
      }
    } catch (erro) {
      console.warn('[VoaAM] API de progresso indisponível; usando cache local.', erro);
    } finally {
      topicosProgressoCarregado = true;
      topicosProgressoPromise = null;
    }
  })();
  return topicosProgressoPromise;
}

// Recarrega o progresso depois que auth.js confirma o usuário da sessão.
function reiniciarProgressoTopicos() {
  topicosProgressoCarregado = false;
  topicosProgressoPromise = null;
  topicosConcluidos = new Map();
  return carregarProgressoTopicos().then(() => renderTopics());
}

// Chamado somente quando o estudante termina todas as questões de uma aula/quiz.
async function registrarConclusaoTopico(contexto, total, acertos) {
  if (!contexto || !contexto.quizId || !['mat', 'red'].includes(contexto.disciplina)) return;
  await carregarProgressoTopicos();

  const topicoId = montarTopicoId(contexto.disciplina, contexto.serie, contexto.quizId);
  const jaConcluidoLocalmente = topicosConcluidos.has(topicoId);
  const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;
  const registro = {
    topico_id: topicoId,
    disciplina: contexto.disciplina,
    serie: contexto.serie,
    quiz_id: contexto.quizId,
    questoes_total: total,
    acertos,
    percentual,
  };
  let resposta;
  try {
    resposta = await fetch('/api/topicos-concluidos', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(registro),
    });
    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      throw new Error(erro.message || `Falha ao salvar (HTTP ${resposta.status})`);
    }
  } catch (erro) {
    console.error('[VoaAM] Não foi possível salvar a conclusão:', erro);
    if (typeof showXPToast === 'function')
      showXPToast('Não foi possível salvar a conclusão. Confira a conexão e tente novamente.');
    return { topicoId, salvo: false, percentual };
  }

  const resultado = await resposta.json();
  const jaConcluidoNoServidor = Boolean(resultado.ja_concluido);
  topicosConcluidos.set(topicoId, registro);
  salvarTopicosLocais();
  if (!jaConcluidoLocalmente && !jaConcluidoNoServidor) {
    state.aulas++;
    salvarState();
    addXP(10);
    ganharCoracao(); // primeira conclusão do tópico concede uma vida, até o limite

    updateStats();
  }

  renderTopics();
  return { topicoId, salvo: true, jaConcluido: jaConcluidoLocalmente || jaConcluidoNoServidor, percentual };
}

// ─── NAVIGATION ───
function toggleVest(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// ─── MATÉRIA ───
function selectSubject(subj) {
  state.currentSubject = subj;
  document.getElementById('tab-mat')?.classList.toggle('active', subj === 'mat');
  document.getElementById('tab-red')?.classList.toggle('active', subj === 'red');
  const matSelector = document.getElementById('serie-selector-mat');
  const redSelector = document.getElementById('serie-selector-red');
  if (matSelector) matSelector.style.display = subj === 'mat' ? 'flex' : 'none';
  if (redSelector) redSelector.style.display = subj === 'red' ? 'flex' : 'none';
  renderTopics();
}

function selectSerie(n) {
  state.currentSerie = n;
  localStorage.setItem(`voaam_serie:${localStorage.getItem('voaam_usuario_id') || 'local'}`, String(n));
  document.querySelectorAll('#serie-selector-mat .serie-btn').forEach((b, i) => {
    b.classList.toggle('active', i + 1 === n);
  });
  renderTopics();
}

function selectSerieRed(n) {
  state.currentSerieRed = n;
  document.querySelectorAll('#serie-selector-red .serie-btn').forEach((b, i) => {
    b.classList.toggle('active', i + 1 === n);
  });
  renderTopics();
}

function renderTopics() {
  const list = document.getElementById('topics-list');
  if (!list) return;

  // A série selecionada na lógica também precisa estar destacada visualmente.
  document.querySelectorAll('#serie-selector-mat .serie-btn').forEach((b, i) => b.classList.toggle('active', i + 1 === state.currentSerie));
  document.querySelectorAll('#serie-selector-red .serie-btn').forEach((b, i) => b.classList.toggle('active', i + 1 === state.currentSerieRed));
  const serie = state.currentSubject === 'mat' ? state.currentSerie : state.currentSerieRed;
  const topics = state.currentSubject === 'mat'
    ? mathTopics[state.currentSerie]
    : redTopics[state.currentSerieRed];

  list.innerHTML = (topics || []).map(t => {
    const id = montarTopicoId(state.currentSubject, serie, t.quizId);
    const registro = topicosConcluidos.get(id);
    const concluido = Boolean(registro);
    const status = concluido ? 'done' : '';
    const emoji = concluido ? '✓' : '';
    const resumo = concluido && Number.isFinite(Number(registro.percentual))
      ? `${t.sub} · ${registro.percentual}% de acertos`
      : t.sub;

    return `
      <div class="topic-card" data-quiz-id="${t.quizId}" role="button" tabindex="0" aria-label="Abrir quiz: ${t.name}">
        <div class="topic-icon">${t.icon}</div>
        <div class="topic-info">
          <div class="topic-name">${t.name}</div>
          <div class="topic-meta">${resumo}</div>
        </div>
        <div class="topic-status">
          <div class="topic-check ${status}" aria-label="${concluido ? 'Tópico concluído' : 'Tópico não concluído'}">${emoji}</div>
        </div>
      </div>
    `;
  }).join('');

  // Delegação de eventos: os cartões são recriados a cada atualização do progresso.
  // Um único listener continua funcionando mesmo após renderizações sucessivas.
  if (list.dataset.quizEventsBound !== '1') {
    const abrirCartao = (evento) => {
      const cartao = evento.target.closest('.topic-card[data-quiz-id]');
      if (!cartao || !list.contains(cartao)) return;
      if (typeof window.openAula !== 'function') {
        console.error('[VoaAM] A função openAula não foi carregada. Confira os erros de scripts no Console.');
        if (typeof showXPToast === 'function') showXPToast('O quiz ainda não carregou. Atualize a página e tente novamente.');
        return;
      }
      window.openAula(cartao.dataset.quizId);
    };
    list.addEventListener('click', abrirCartao);
    list.addEventListener('keydown', (evento) => {
      if (evento.key !== 'Enter' && evento.key !== ' ') return;
      const cartao = evento.target.closest('.topic-card[data-quiz-id]');
      if (!cartao || !list.contains(cartao)) return;
      evento.preventDefault();
      abrirCartao(evento);
    });
    list.dataset.quizEventsBound = '1';
  }

  if (!topicosProgressoCarregado && !topicosProgressoPromise) {
    carregarProgressoTopicos().then(() => renderTopics());
  }
}
