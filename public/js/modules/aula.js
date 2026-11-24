// js/modules/aula.js
// Abertura de aula, renderização de quiz e resultado

// ─── AULA / QUIZ ───
let currentQuiz = null;
let currentQuizIdx = 0;
let quizCorrect = 0;
let quizXpGanho = 0;
let answered = false;
let isSimulado = false;
let currentQuizTopicContext = null;
let quizResultadoRegistrado = false;

function idQuestaoSimulado(q) {
  return q.id?.startsWith('simulado:') ? q.id : 'banco:' + q.id;
}

function sortearQuiz(quiz) {
  return {
    ...quiz,
    questions: embaralhar(quiz.questions.map((q, indice) => ({
      ...q,
      indiceOriginal: q.indiceOriginal ?? indice,
      ordem: ordenarAlternativas(q.opts),
    }))),
  };
}

function openAula(quizId) {
  const overlay = document.getElementById('aula-view');
  const titleEl = document.getElementById('aula-title');
  const contentEl = document.getElementById('aula-content');
  const catalogo = window.VOAAM_QUIZZES || (typeof quizzes !== 'undefined' ? quizzes : null);
  const quiz = catalogo && Object.prototype.hasOwnProperty.call(catalogo, quizId)
    ? catalogo[quizId]
    : null;

  if (!overlay || !titleEl || !contentEl) {
    console.error('[VoaAM] Overlay de aula não encontrado.');
    if (typeof showXPToast === 'function') showXPToast('A tela do quiz não carregou. Atualize a página.');
    return;
  }

  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    currentQuiz = null;
    currentQuizTopicContext = null;
    quizResultadoRegistrado = false;
    titleEl.textContent = 'Conteúdo indisponível';
    contentEl.innerHTML = `
      <div class="result-card">
        <div class="result-title">Este quiz não foi encontrado</div>
        <p>Não foi possível carregar o quiz <strong>${String(quizId)}</strong>. Confira se a lista de quizzes foi carregada e se essa chave possui perguntas.</p>
        <button class="btn-secondary" onclick="closeAula()">← Voltar à lista</button>
      </div>`;
    overlay.classList.add('open');
    console.error('[VoaAM] Quiz ausente ou vazio:', quizId, {
      catalogoDisponivel: !!catalogo,
      chavesDisponiveis: catalogo ? Object.keys(catalogo) : []
    });
    return;
  }

  currentQuiz = sortearQuiz(quiz);
  currentQuizIdx = 0;
  quizCorrect = 0;
  quizXpGanho = 0;
  answered = false;
  isSimulado = false;
  quizResultadoRegistrado = false;
  currentQuizTopicContext = {
    quizId,
    disciplina: state.currentSubject,
    serie: state.currentSubject === 'mat' ? state.currentSerie : state.currentSerieRed,
  };
  titleEl.textContent = quiz.title || 'Aula';
  renderAulaContent();
  overlay.classList.add('open');
}

function openGenericAula(id) {
  currentQuizTopicContext = null;
  quizResultadoRegistrado = false;
  document.getElementById('aula-title').textContent = 'Aula — Em breve';
  document.getElementById('aula-content').innerHTML = `
    <div class="video-area">
      <div class="video-thumb-bg">
        <div class="play-btn">▶</div>
        <div class="video-label">Videoaula disponível em breve</div>
      </div>
    </div>
    <div class="topic-desc">
      Este conteúdo está sendo produzido. Em breve você terá acesso à videoaula e questões de treino!
    </div>
    <button class="btn-secondary" onclick="closeAula()" style="margin-top:8px">← Voltar</button>
  `;
  document.getElementById('aula-view').classList.add('open');
}

function renderAulaContent() {
  const quiz = currentQuiz;
  if(currentQuizIdx === 0) {
    // Show lesson intro first
    document.getElementById('aula-content').innerHTML = `
      <div class="video-area" role="group" aria-label="Videoaula">
        <button type="button" class="video-play-inline" onclick="openPlaylist('${quiz.playlistUrl || '#'}', this)">
        <div class="video-thumb-bg">
          <div class="play-btn">▶</div>
          <div class="video-label">${quiz.video}</div>
        </div>
        <div class="video-redirect-hint">Assistir nesta página</div>
        </button>
      </div>
      <div class="topic-desc">${quiz.desc}</div>
      <div class="quiz-title-bar">
        <span class="quiz-badge">⚡ Quiz</span>
        <span class="quiz-progress-text">0 / ${quiz.questions.length} questões</span>
      </div>
      <div id="quiz-area"></div>
    `;
    renderQuestion();
  } else {
    renderQuestion();
  }
}

/**
 * Abre a playlist no YouTube (ou qualquer URL) em uma nova aba.
 * Para alterar o link de cada assunto, edite a propriedade `playlistUrl`
 * no objeto correspondente em js/data/quizzes.js.
 *
 * Exemplo:
 *   funcao_afim: {
 *     ...
 *     playlistUrl: 'https://www.youtube.com/playlist?list=SEU_ID_AQUI',
 *     ...
 *   }
 */
function openPlaylist(url, botao) {
  if (!url || url === '#' || url.includes('SUBSTITUA_AQUI')) {
    showXPToast('Videoaula ainda não configurada.');
    return;
  }
  let fonte;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' || !['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(u.hostname))
      throw new Error('Fonte não incorporável');
    const video = u.hostname === 'youtu.be' ? u.pathname.slice(1) :
      (u.pathname.startsWith('/embed/') ? u.pathname.split('/')[2] : u.searchParams.get('v'));
    const lista = u.searchParams.get('list');
    if (!video || !/^[a-zA-Z0-9_-]{11}$/.test(video)) throw new Error('Vídeo inválido');
    fonte = `https://www.youtube-nocookie.com/embed/${video}?rel=0` +
      (lista && /^[a-zA-Z0-9_-]+$/.test(lista) ? '&list=' + encodeURIComponent(lista) : '');
  } catch (e) {
    showXPToast('Esta videoaula não pode ser reproduzida dentro do site.');
    return;
  }
  const area = botao?.closest('.video-area') || document.querySelector('.video-area');
  if (!area) return;
  const player = document.createElement('iframe');
  player.className = 'video-iframe';
  player.title = 'Videoaula do assunto';
  player.src = fonte;
  player.loading = 'lazy';
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  player.setAttribute('allowfullscreen', '');
  const aviso = document.createElement('p');
  aviso.className = 'video-redirect-hint';
  aviso.textContent = 'Vídeo do YouTube incorporado. Se o proprietário bloquear a reprodução externa, não será possível reproduzir aqui.';
  area.replaceChildren(player, aviso);
}

function renderQuestion() {
  const quiz = currentQuiz;
  if(currentQuizIdx >= quiz.questions.length) {
    showQuizResult();
    return;
  }
  answered = false;
  const q = quiz.questions[currentQuizIdx];
  const letters = ['A','B','C','D','E'];
  const quizArea = document.getElementById('quiz-area') || document.getElementById('aula-content');

  // Update progress text
  const pt = document.querySelector('.quiz-progress-text');
  if(pt) pt.textContent = `${currentQuizIdx} / ${quiz.questions.length} questões`;

  quizArea.innerHTML = `
    <div class="question-card">
      <div class="question-text">${q.q}</div>
      <div class="options-list" id="options-list">
        ${q.ordem.map((original, i) => `
          <button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">
            <span class="option-letter">${letters[i]}</span><span>${q.opts[original]}</span>
          </button>
        `).join('')}
      </div>
      <div class="feedback-box" id="feedback-box"></div>
      <button class="next-q-btn" id="next-btn" onclick="nextQuestion()">
        ${currentQuizIdx + 1 < quiz.questions.length ? 'Próxima questão →' : 'Ver resultado 🎯'}
      </button>
    </div>
  `;
}

async function selectOption(idx) {
  if(answered) return;
  answered = true;
  const quiz = currentQuiz;
  const q = quiz.questions[currentQuizIdx];
  const feedback = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');
  const opts = document.querySelectorAll('#options-list .option-btn');
  opts.forEach(b=>b.disabled=true);
  feedback.className='feedback-box show voa-busy-status';
  feedback.textContent='Conferindo resposta…';
  feedback.setAttribute('role', 'status');
  const qid = isSimulado ? idQuestaoSimulado(q)
      : `quiz:${currentQuizTopicContext.quizId}:${q.indiceOriginal}`;
  const consulta = avaliarRespostaServidor(qid, q.ordem[idx]);
  quiz.respostaPendente = consulta;
  try {
    const r = await consulta;
    if (currentQuiz?.questions[currentQuizIdx] !== q) return;
    if (quiz.tentativa) quiz.tentativa.respostas.push(r.resposta_id);
    const correct = q.ordem.indexOf(r.correta);
    quizXpGanho += Number(r.xp_ganho)||0;
    opts[correct]?.classList.add('correct');
    if (r.acertou) {
      quizCorrect++;
      feedback.className='feedback-box correct show';
      feedback.textContent='Correto! '+(r.explicacao||'');
      spawnStars();
    } else {
      opts[idx]?.classList.add('wrong');
      feedback.className='feedback-box wrong show';
      feedback.textContent=`Resposta incorreta. Alternativa correta: ${'ABCDE'[correct]}. ${r.explicacao||''}`;
    }
    nextBtn.classList.add('show');
  } catch(e) {
    if (currentQuiz?.questions[currentQuizIdx] !== q) return;
    answered=false;
    opts.forEach(b=>b.disabled=false);
    feedback.className='feedback-box wrong show';
    feedback.textContent='Não foi possível corrigir no servidor: '+e.message;
  } finally {
    if (quiz.respostaPendente === consulta) quiz.respostaPendente = null;
  }
}

function nextQuestion() {
  currentQuizIdx++;
  renderQuestion();
}

async function showQuizResult() {
  const quiz = currentQuiz;
  if (isSimulado) {
    if (quizResultadoRegistrado) return;
    quizResultadoRegistrado = true;
    pararCronometro();
    if (quiz.respostaPendente) {
      await quiz.respostaPendente.catch(() => {});
      if (currentQuiz !== quiz || !document.getElementById('aula-view').classList.contains('open')) return;
    }
  }
  const total = quiz.questions.length;
  const pct = Math.round((quizCorrect/total)*100);
  let emoji, title, insight;

  if(pct >= 80) {
    emoji = '🏆'; title = 'Mandou muito bem!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Excelente domínio do conteúdo! Avance para o próximo tópico.`;
  } else if(pct >= 50) {
    emoji = '💪'; title = 'Quase lá!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Revise os conceitos das questões que errou e tente novamente.`;
  } else {
    emoji = '📖'; title = 'Continue estudando!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Assista à videoaula novamente antes de tentar o quiz. Você consegue!`;
  }

  document.getElementById('aula-content').innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${emoji}</div>
      <div class="result-title">${title}</div>
      <div class="result-score">${pct}%</div>
      <div class="result-sub">${quizCorrect} de ${total} acertos</div>
      <div class="result-stats-row">
        <div class="rstat">
          <div class="rstat-val" style="color:var(--green)">${quizCorrect}</div>
          <div class="rstat-lbl">Acertos</div>
        </div>
        <div class="rstat">
          <div class="rstat-val" style="color:var(--red)">${total-quizCorrect}</div>
          <div class="rstat-lbl">Erros</div>
        </div>
        <div class="rstat">
          <div class="rstat-val" style="color:var(--gold)">${quizXpGanho}</div>
          <div class="rstat-lbl">XP ganho</div>
        </div>
      </div>
      <div class="result-insight">💡 <strong>Insight:</strong> ${insight}</div>
      ${quiz.tentativa ? `<p id="sim-salvar-nota-status" class="sim-salvar-nota-status" role="status"></p>
        <button type="button" id="sim-salvar-nota" class="btn-secondary" hidden>Tentar salvar nota novamente</button>` : ''}
      <div class="result-btns">
        <button class="btn-primary" onclick="retryQuiz()">🔄 Tentar novamente</button>
        <button class="btn-secondary" onclick="closeAula()">← Voltar à lista</button>
      </div>
    </div>
  `;
  if (pct >= 80) {
    setTimeout(() => showAchievement('🎓', 'Quiz Concluído!'), 500);
  }

  if (quiz.tentativa) {
    const status = document.getElementById('sim-salvar-nota-status');
    const tentar = document.getElementById('sim-salvar-nota');
    const salvar = async () => {
      if (quiz.contaId !== authConta?.id) return;
      tentar.hidden = true;
      status.textContent = 'Salvando nota…';
      try {
        await authRequisicao('/api/praticar/simulados/notas', {
          method: 'POST',
          body: JSON.stringify(quiz.tentativa),
          signal: AbortSignal.timeout(15000),
        });
        status.textContent = 'Nota salva.';
        simAtualizarNotas();
      } catch {
        status.textContent = 'Não foi possível salvar a nota.';
        tentar.hidden = false;
      }
    };
    tentar.onclick = salvar;
    salvar();
  }

  // O tópico só é marcado como concluído depois de responder a todas as questões.
  if (!quizResultadoRegistrado && currentQuizTopicContext && !isSimulado) {
    quizResultadoRegistrado = true;
    if (typeof registrarConclusaoTopico === 'function') {
      registrarConclusaoTopico(currentQuizTopicContext, total, quizCorrect).catch(erro => {
        console.warn('[VoaAM] Falha ao registrar conclusão do tópico:', erro);
      });
    }
  }
}

function retryQuiz() {
  if (isSimulado) {
    voaAMAbrirSimulado(currentQuiz, currentQuiz.tempoSegundos);
    return;
  }
  currentQuiz = sortearQuiz(currentQuiz);
  currentQuizIdx = 0;
  quizCorrect = 0;
  quizXpGanho = 0;
  quizResultadoRegistrado = false;
  renderAulaContent();
}

function closeAula() {
  document.getElementById('aula-view').classList.remove('open');
  pararCronometro();
}

// API pública para iniciar simulados vindos de praticar.js. Mantém o estado do quiz
// dentro deste módulo e evita que o botão dependa diretamente de variáveis lexicais.
function voaAMAbrirSimulado(quiz, tempoSegundos) {
  const overlay = document.getElementById('aula-view');
  const titleEl = document.getElementById('aula-title');
  const contentEl = document.getElementById('aula-content');
  if (!overlay || !titleEl || !contentEl) {
    console.error('[VoaAM] Não foi possível abrir o simulado: overlay ausente.');
    if (typeof showXPToast === 'function') showXPToast('Não foi possível abrir o simulado. Atualize a página.');
    return false;
  }
  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    if (typeof showXPToast === 'function') showXPToast('Não há questões disponíveis para este simulado.');
    return false;
  }

  currentQuiz = sortearQuiz(quiz);
  currentQuiz.tempoSegundos = tempoSegundos;
  currentQuiz.respostaPendente = null;
  if (quiz.chaveSimulado) {
    currentQuiz.contaId = authConta?.id;
    currentQuiz.tentativa = {
      tentativa: novaTentativaSimulado(), modo: 'simples', chave: quiz.chaveSimulado,
      questoes: currentQuiz.questions.map(idQuestaoSimulado), respostas: [],
    };
  }
  currentQuizIdx = 0;
  quizCorrect = 0;
  quizXpGanho = 0;
  answered = false;
  isSimulado = true;
  currentQuizTopicContext = null;
  quizResultadoRegistrado = false;
  titleEl.textContent = quiz.title || 'Simulado';
  contentEl.innerHTML = `
    <div class="topic-desc">${quiz.desc || 'Simulado cronometrado.'}</div>
    <div class="quiz-title-bar">
      <span class="quiz-badge">🎯 Simulado</span>
      <span class="quiz-progress-text">0 / ${quiz.questions.length} questões</span>
    </div>
    <div id="quiz-area"></div>`;
  overlay.classList.add('open');

  if (typeof pararCronometro === 'function') pararCronometro();
  if (Number.isFinite(tempoSegundos) && tempoSegundos > 0 && typeof iniciarCronometro === 'function') {
    iniciarCronometro(tempoSegundos);
  }
  renderQuestion();
  return true;
}

window.openAula = openAula;
window.voaAMAbrirSimulado = voaAMAbrirSimulado;

