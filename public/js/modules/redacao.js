// =============================================================
// js/modules/redacao.js
// Redação: abas, filtros, editor, contadores, rascunhos e histórico
// VoaAM · Vestibulares do Amazonas
// =============================================================

// ─── CHAVE DO localStorage ───────────────────────────────────
const RED_HISTORICO_KEY = 'voaam_red_historico'; // array de redações concluídas
const RED_RASCUNHO_KEY  = 'voaam_red_rascunho_';  // prefixo + tema-id

// ID da redação aberta no modal (para excluir/retomar)
let redModalId = null;
let redHistorico = [];
let redHistoricoVersao = 0;
let redAvaliando = false;
let redSalvando = false;

// ─── HELPERS localStorage ────────────────────────────────────
function redGetHistoricoLegado() {
  try {
    const historico = JSON.parse(localStorage.getItem(RED_HISTORICO_KEY + ':' + (localStorage.getItem('voaam_usuario_id') || 'local')) || '[]');
    return Array.isArray(historico) ? historico.filter(r => r && typeof r.texto === 'string') : [];
  }
  catch { return []; }
}
function redSaveHistoricoLegado(lista) {
  localStorage.setItem(RED_HISTORICO_KEY + ':' + (localStorage.getItem('voaam_usuario_id') || 'local'), JSON.stringify(lista));
}

function chaveRascunho(temaId) {
  const uid = localStorage.getItem('voaam_usuario_id') || 'local';
  return RED_RASCUNHO_KEY + uid + ':' + temaId;
}

// Catálogo com referência da fonte. Sem inventar textos motivadores.
async function redCarregarTemas() {
  const container=document.getElementById('red-temas-lista');
  if(!container)return;
  try {
    const r=await fetch('/api/temas-redacao',{credentials:'same-origin'});
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const {temas}=await r.json();
    const sel=document.getElementById('red-seletor-tema');
    if(sel){
      const anterior=sel.value;
      sel.replaceChildren(new Option('Selecione um tema',''));
      temas.forEach(t=>sel.add(new Option(`${t.vestibular} ${t.ano} — ${t.tema}`,t.id)));
      if([...sel.options].some(o=>o.value===anterior))sel.value=anterior;
    }
    const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    container.innerHTML=temas.map(t=>`<article class="red-tema-card" data-vest="${esc(t.vestibular)}" data-tema-id="${esc(t.id)}" onclick="redSelecionarTema(this)">
      <div class="red-tema-cab"><span class="red-vest-badge">${esc(t.vestibular)} ${t.ano}${t.etapa?' · Etapa '+t.etapa:''}</span>
      <h2 class="red-tema-titulo" style="font-weight:700;color:var(--text);font-size:15px;margin-top:7px">${esc(t.tema)}</h2>
      <p style="font-size:12px;color:var(--text2)">${esc(t.modalidade)}</p></div>
      <div class="red-motivadores" style="display:none;margin-top:12px">
        <p>Para ler a coletânea original, consulte a página da fonte. O voaAM não reproduz textos de apoio não fornecidos.</p>
        <div class="red-tema-actions">
          <a class="btn-secondary red-fonte-link" href="${esc(t.fonte)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Consultar fonte do tema</a>
          <button type="button" class="btn-primary red-escrever-tema" onclick="redEscreverTema(event,this)">Escrever sobre este tema</button>
        </div>
      </div>
      <button type="button" class="red-expand-btn" aria-expanded="false" onclick="redExpandirTema(event,this)"><span>Ver proposta e fonte</span><span class="red-expand-icon">▾</span></button>
    </article>`).join('');
  } catch(e) {
    console.warn('Temas indisponíveis:',e);
    container.innerHTML='<p>Não foi possível carregar os temas. Atualize a página e tente novamente.</p>';
  }
}

async function redConfigurarAvaliacao() {
  try {
    const config = await authRequisicao('/api/config-publica');
    const seletor = document.getElementById('red-modo-avaliacao');
    const rotulos = {gemini: 'IA Gemini — cinco competências', ollama: 'IA do servidor (Ollama) — cinco competências'};
    const provedores = (config.provedores_redacao || []).filter(modo => Object.hasOwn(rotulos, modo));
    for (const provedor of provedores) seletor.add(new Option(rotulos[provedor], provedor));
    if (provedores.length) seletor.value = provedores[0];
  } catch {
    // A opção local continua disponível quando a configuração não carrega.
  }
}
function redEditorTemaSelecionar(id){
  const card=[...document.querySelectorAll('.red-tema-card')].find(c=>c.dataset.temaId===id);
  if(card){
    const b=card.querySelector('.red-escrever-tema');
    if(b)redEscreverTema({stopPropagation(){}},b);
  }
}

// ─── ABAS ────────────────────────────────────────────────────
function redAba(aba) {
  const paineis = {
    temas:     document.getElementById('red-temas-panel'),
    editor:    document.getElementById('red-editor-panel'),
    historico: document.getElementById('red-historico-panel'),
  };
  const btns = {
    temas:     document.getElementById('redtab-temas'),
    editor:    document.getElementById('redtab-editor'),
    historico: document.getElementById('redtab-historico'),
  };

  if (!paineis.temas) return;

  Object.entries(paineis).forEach(([nome, el]) => {
    if (el) el.style.display = nome === aba ? 'block' : 'none';
  });
  Object.entries(btns).forEach(([nome, el]) => {
    el?.classList.toggle('active', nome === aba);
    el?.setAttribute('aria-pressed', String(nome === aba));
  });

  document.getElementById('slot-page-redacao').scrollTop = 0;
  if (aba === 'historico') redCarregarHistorico();
}

// ─── FILTROS POR VESTIBULAR ──────────────────────────────────
function redFiltrar(vest, btn) {
  document.querySelectorAll('.red-filtro-btn').forEach(b => b.classList.remove('red-filtro-active'));
  if (btn) btn.classList.add('red-filtro-active');

  document.querySelectorAll('.red-tema-card:not(.red-tema-locked)').forEach(card => {
    const cardVest = card.getAttribute('data-vest') || '';
    card.style.display = (vest === 'todos' || cardVest === vest) ? 'block' : 'none';
  });
}

// ─── EXPANDIR / COLAPSAR MOTIVADORES ─────────────────────────
function redExpandirTema(event, btn) {
  event.stopPropagation();
  const card        = btn.closest('.red-tema-card');
  const motivadores = card.querySelector('.red-motivadores');
  const icon        = btn.querySelector('.red-expand-icon');
  const label       = btn.querySelector('span:first-child');
  const aberto      = motivadores.style.display !== 'none';

  motivadores.style.display = aberto ? 'none' : 'block';
  icon.textContent           = aberto ? '▾' : '▴';
  label.textContent = aberto ? 'Ver proposta e fonte' : 'Ocultar proposta';
  btn.setAttribute('aria-expanded', String(!aberto));
}

// ─── CLIQUE NO CARD (abre motivadores) ───────────────────────
function redSelecionarTema(card) {
  const motivadores = card.querySelector('.red-motivadores');
  const btn         = card.querySelector('.red-expand-btn');
  if (motivadores && motivadores.style.display === 'none') {
    motivadores.style.display = 'block';
    if (btn) {
      btn.querySelector('.red-expand-icon').textContent = '▴';
      btn.querySelector('span:first-child').textContent = 'Ocultar proposta';
      btn.setAttribute('aria-expanded', 'true');
    }
  }
}

// ─── IR PARA O EDITOR COM O TEMA ─────────────────────────────
function redEscreverTema(event, btn) {
  event.stopPropagation();
  const card    = btn.closest('.red-tema-card');
  const temaId  = card.getAttribute('data-tema-id') || 'sem_tema';
  const titulo = card.querySelector('.red-tema-titulo')?.textContent.trim() || '';
  const badge   = card.querySelector('.red-vest-badge')?.textContent?.trim() || '';

  // Preenche header do editor
  const badgeEl  = document.getElementById('red-editor-vest-badge');
  const tituloEl = document.getElementById('red-editor-tema-titulo');
  if (badgeEl)  badgeEl.textContent  = badge;
  if (tituloEl) tituloEl.textContent = titulo;

  // Guarda meta no textarea para uso posterior
  const textarea = document.getElementById('red-editor-textarea');
  if (textarea) {
    textarea.setAttribute('data-tema-id',  temaId);
    textarea.setAttribute('data-badge',    badge);
    textarea.setAttribute('data-titulo',   titulo);

    // Restaura rascunho (se houver)
    const rascunho = localStorage.getItem(chaveRascunho(temaId)) || '';
    textarea.value = rascunho;
    redLimparAvaliacao();
    redAtualizarContadores(textarea);
  }

  const seletor=document.getElementById('red-seletor-tema');if(seletor)seletor.value=temaId;
  redAba('editor');
}

// ─── CONTADORES ──────────────────────────────────────────────
function redAtualizarContadores(textarea) {
  const texto   = textarea.value;
  const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
  const linhas   = texto === '' ? 0 : texto.split('\n').reduce((acc, l) => {
    return acc + Math.max(1, Math.ceil((l.length || 1) / 68));
  }, 0);

  const elPal = document.getElementById('red-contador-palavras');
  const elLin = document.getElementById('red-contador-linhas');
  if (elPal) elPal.textContent = palavras;
  if (elLin) elLin.textContent = linhas;

  const progress = Math.min(100, (linhas / 30) * 100);
  const bar      = document.getElementById('red-progress-bar');
  if (bar) {
    bar.style.width      = progress + '%';
    bar.style.background = linhas < 7 ? '#ef4444' : linhas < 25 ? '#f59e0b' : '#10b981';
  }
}

// ─── SALVAR RASCUNHO ─────────────────────────────────────────
function redSalvarRascunho() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea || !textarea.value.trim()) return;

  const temaId = textarea.getAttribute('data-tema-id') || 'sem_tema';
  localStorage.setItem(chaveRascunho(temaId), textarea.value);

  redMostrarFeedback('red-save-feedback');
}

// ─── CONCLUIR → ENVIA AO HISTÓRICO ───────────────────────────
async function redEnviarHistorico() {
  if (redSalvando || redAvaliando) return;
  const editor = document.getElementById('red-editor-textarea');
  const { temaId } = editor.dataset;
  const texto = editor.value.trim();
  if (!temaId || !texto) {
    redMostrarFeedbackErro('Escolha um tema e escreva a redação.');
    return;
  }

  redSalvando = true;
  const botao = document.getElementById('red-concluir');
  botao.disabled = true;
  try {
    await authRequisicao('/api/redacoes', {
      method: 'POST', body: JSON.stringify({tema_id: temaId, texto}),
    });
    if (localStorage.getItem(chaveRascunho(temaId))?.trim() === texto) {
      localStorage.removeItem(chaveRascunho(temaId));
    }
    redCarregarHistorico();
    atualizarNivel();
    redMostrarFeedback('red-concluir-feedback');
  } catch (e) {
    redMostrarFeedbackErro(e.message);
  } finally {
    redSalvando = false;
    botao.disabled = redAvaliando;
  }
}

// ─── LIMPAR EDITOR ───────────────────────────────────────────
function redLimpar() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea) return;
  if (!textarea.value.trim()) return;
  confirmarAcao({
    titulo: 'Limpar texto?',
    mensagem: 'O texto atual será removido do editor. Você ainda pode abrir redações salvas no Histórico.',
    acao: 'Limpar texto',
    executar: () => {
      textarea.value = '';
      redLimparAvaliacao();
      redAtualizarContadores(textarea);
    },
  });
}

// ─── CORREÇÃO PEDAGÓGICA (GEMINI OU MODO LOCAL) ───────────────────
// Toda saída externa é renderizada por textContent para impedir HTML não confiável.
function redAiNo(tag, classe, texto) {
  const el=document.createElement(tag);
  if(classe)el.className=classe;
  if(texto!==undefined)el.textContent=texto;
  return el;
}
function redRenderAvaliacaoGemini(painel, dados) {
  const a=dados.avaliacao;
  if(!a || !Array.isArray(a.competencias))throw new Error('A resposta da IA está incompleta.');
  painel.replaceChildren();
  painel.classList.add('red-ai-relatorio');
  painel.append(redAiNo('h3','red-ai-titulo','Avaliação pedagógica por competências'));
  painel.append(redAiNo('p','red-ai-disclaimer',a.aviso||'Estimativa pedagógica; não é nota oficial.'));
  painel.append(redAiNo('p','red-ai-resumo',a.resumo||''));
  painel.append(redAiNo('p','red-ai-adequacao','Adequação ao tema: '+(a.adequacao_tema||'Não informada.')));
  if(Number.isFinite(a.nota_estimada)) {
    painel.append(redAiNo('p','red-ai-nota','Nota estimada: '+a.nota_estimada+'/1000 (não oficial)'));
  }
  for(const c of a.competencias){
    const sec=redAiNo('section','red-ai-competencia');
    sec.append(redAiNo('h4','',`Competência ${c.numero} — ${c.titulo||''} (${c.nota_estimada??'–'}/200)`));
    sec.append(redAiNo('p','red-ai-justificativa',c.justificativa||''));
    if(Array.isArray(c.pontos_fortes) && c.pontos_fortes.length){
      sec.append(redAiNo('h5','','Pontos fortes'));
      const lista=redAiNo('ul','');
      for(const item of c.pontos_fortes)lista.append(redAiNo('li','',item));
      sec.append(lista);
    }
    if(Array.isArray(c.ajustes) && c.ajustes.length){
      sec.append(redAiNo('h5','','Pontos específicos para corrigir'));
      for(const aj of c.ajustes){
        const div=redAiNo('div','red-ai-ajuste');
        div.append(redAiNo('small','','Parágrafo '+aj.paragrafo));
        div.append(redAiNo('blockquote','',aj.trecho||''));
        div.append(redAiNo('p','','Problema: '+(aj.diagnostico||'')));
        div.append(redAiNo('p','','Como melhorar: '+(aj.sugestao||'')));
        if(aj.exemplo)div.append(redAiNo('p','','Exemplo de reescrita: '+aj.exemplo));
        sec.append(div);
      }
    }else sec.append(redAiNo('p','red-ai-sem-ajustes','Nenhum erro pontual com citação verificável identificado nesta competência.'));
    painel.append(sec);
  }
  if(Array.isArray(a.prioridades)&&a.prioridades.length){
    painel.append(redAiNo('h4','red-ai-prioridades-titulo','Prioridades de revisão'));
    const lista=redAiNo('ol','red-ai-prioridades');
    for(const item of a.prioridades)lista.append(redAiNo('li','',item));
    painel.append(lista);
  }
}
function redSelecionarModoLocal() {
  const modo = document.getElementById('red-modo-avaliacao');
  modo.value = 'gratis';
  modo.scrollIntoView({block: 'center'});
  modo.focus();
  redLimparAvaliacao();
}

function redLimparAvaliacao() {
  if (redAvaliando) return;
  document.getElementById('red-ai-status').hidden = true;
  document.getElementById('red-ai-modo-local').hidden = true;
  document.getElementById('red-resultado-ia').hidden = true;
}

async function redCorrigir() {
  if (redAvaliando || redSalvando) return;
  const editor = document.getElementById('red-editor-textarea');
  const { temaId, titulo: tema, badge } = editor.dataset;
  const texto = editor.value.trim();
  if (!temaId || texto.length < 100 || texto.length > 10000) {
    redMostrarFeedbackErro('Escolha um tema e escreva entre 100 e 10.000 caracteres.');
    return;
  }

  const provedor = document.getElementById('red-modo-avaliacao').value;
  const porIA = provedor !== 'gratis';
  const btn = document.getElementById('red-analisar');
  const concluir = document.getElementById('red-concluir');
  const painel = document.getElementById('red-resultado-ia');
  const status = document.getElementById('red-ai-status');
  const mensagem = document.getElementById('red-ai-mensagem');
  const spinner = document.getElementById('red-ai-spinner');
  redAvaliando = true;
  btn.disabled = concluir.disabled = true;
  painel.hidden = true;
  painel.setAttribute('aria-busy', 'true');
  status.hidden = spinner.hidden = false;
  status.classList.remove('red-ai-erro');
  const modoLocal = document.getElementById('red-ai-modo-local');
  modoLocal.hidden = true;
  mensagem.textContent = porIA
    ? 'A IA está analisando sua redação. Isso pode levar alguns segundos.'
    : 'Analisando a estrutura da redação…';
  let mostrarResultado = false;
  try {
    const resposta = await fetch(porIA ? '/api/corrigir-redacao' : '/api/redacao/avaliar-gratis', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({provedor, tema_id: temaId, tema, texto, vestibular: badge?.split(' ')[0]}),
      signal: AbortSignal.timeout(90000),
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      const erro = new Error(dados.message || 'Falha na análise.');
      erro.status = resposta.status;
      throw erro;
    }

    const mesmaVersao = editor.dataset.temaId === temaId && editor.value.trim() === texto;
    if (porIA) {
      redRenderAvaliacaoGemini(painel, dados);
      mensagem.textContent = mesmaVersao
        ? 'Análise concluída. A nota e o feedback foram salvos no Histórico.'
        : 'Avaliação da versão enviada salva no Histórico.';
      redCarregarHistorico();
      atualizarNivel();
    } else {
      painel.replaceChildren(redAiNo('p', 'red-ai-texto-local', dados.resultado || 'Análise indisponível.'));
      mensagem.textContent = mesmaVersao ? 'Análise local concluída.' : 'Análise local concluída para a versão enviada.';
    }
    mostrarResultado = mesmaVersao;
  } catch (e) {
    status.classList.add('red-ai-erro');
    modoLocal.hidden = !porIA || !(e.status >= 500 || e.status === 429 || e.name === 'TimeoutError');
    mensagem.textContent = e.name === 'TimeoutError'
      ? 'A análise ultrapassou o tempo de espera. Confira o Histórico ou tente novamente.'
      : 'Não foi possível avaliar. ' + e.message;
  } finally {
    redAvaliando = false;
    btn.disabled = concluir.disabled = false;
    spinner.hidden = true;
    painel.setAttribute('aria-busy', 'false');
    painel.hidden = !mostrarResultado;
  }
}

function redModeloHistorico(doc) {
  const data = new Date(doc.atualizada_em.replace(' ', 'T') + 'Z');
  let avaliacao = null;
  try { avaliacao = JSON.parse(doc.resultado_ia); } catch { /* registros anteriores sem relatório JSON */ }
  return {
    chave: 'servidor:' + doc.id,
    id: doc.id,
    servidor: true,
    temaId: doc.tema_id,
    badge: doc.badge,
    titulo: doc.tema,
    texto: doc.texto,
    palavras: doc.texto.trim().split(/\s+/).length,
    linhas: doc.texto.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / 68)), 0),
    nota: doc.nota,
    avaliacao,
    quando: data.toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'}),
  };
}

async function redCarregarHistorico() {
  const versao = ++redHistoricoVersao;
  const status = document.getElementById('red-hist-contador');
  const legado = redGetHistoricoLegado().map(r => ({
    ...r, chave: 'local:' + r.id, quando: r.data + ' · ' + r.hora,
  }));
  try {
    const {redacoes} = await authRequisicao('/api/redacoes');
    if (versao !== redHistoricoVersao) return;
    const servidor = redacoes.map(redModeloHistorico);
    const versoes = new Set(servidor.map(r => JSON.stringify([r.temaId, r.texto.trim()])));
    redHistorico = servidor.concat(legado.filter(r => !versoes.has(JSON.stringify([r.temaId, r.texto.trim()]))));
    redRenderHistorico();
  } catch (e) {
    if (versao !== redHistoricoVersao) return;
    redHistorico = legado;
    redRenderHistorico();
    status.textContent = 'Não foi possível carregar o histórico da conta. Abra esta aba novamente para tentar.';
    document.getElementById('red-limpar-historico').disabled = true;
  }
}

function redRenderHistorico() {
  const container = document.getElementById('red-hist-lista');
  const n = redHistorico.length;
  document.getElementById('red-hist-contador').textContent = n
    ? `${n} redaç${n === 1 ? 'ão' : 'ões'} no histórico`
    : 'Nenhuma redação salva ainda';
  document.getElementById('red-hist-vazio').style.display = n ? 'none' : 'block';
  document.getElementById('red-limpar-historico').disabled = n === 0;
  const badge = document.getElementById('red-hist-badge');
  badge.textContent = n;
  badge.hidden = n === 0;
  container.replaceChildren();
  for (const r of redHistorico) {
    const card = redAiNo('button', 'red-hist-card');
    card.type = 'button';
    const previa = r.texto.replace(/\s+/g, ' ').trim();
    card.append(
      redAiNo('p', '', [r.badge, r.quando].filter(Boolean).join(' · ')),
      redAiNo('h3', '', r.titulo || 'Redação'),
      redAiNo('p', '', previa.slice(0, 120) + (previa.length > 120 ? '…' : '')),
    );
    if (Number.isFinite(r.nota)) card.append(redAiNo('strong', 'red-hist-nota', `Nota estimada · ${r.nota}/1000`));
    card.addEventListener('click', () => redAbrirModal(r.chave));
    container.append(card);
  }
}

function redAbrirModal(chave) {
  const r = redHistorico.find(item => item.chave === chave);
  if (!r) return;
  redModalId = chave;
  document.getElementById('modal-vest-badge').textContent = r.badge || '';
  document.getElementById('modal-tema-titulo').textContent = r.titulo || 'Redação';
  document.getElementById('modal-meta').textContent = r.quando;
  document.getElementById('modal-texto').textContent = r.texto;
  const stats = document.getElementById('modal-stats');
  stats.replaceChildren(
    redAiNo('span', '', `${r.palavras} palavras`),
    redAiNo('span', '', `${r.linhas}/30 linhas estimadas`),
  );
  if (Number.isFinite(r.nota)) stats.append(redAiNo('strong', '', `Nota estimada · ${r.nota}/1000`));
  const avaliacao = document.getElementById('modal-avaliacao');
  avaliacao.hidden = !Array.isArray(r.avaliacao?.competencias);
  if (!avaliacao.hidden) redRenderAvaliacaoGemini(avaliacao, {avaliacao: r.avaliacao});
  const modal = document.getElementById('red-modal');
  modal.showModal();
  modal.scrollTop = 0;
}

function redFecharModal() {
  document.getElementById('red-modal').close();
  redModalId = null;
}

function redRetomarDoModal() {
  const r = redHistorico.find(item => item.chave === redModalId);
  if (!r) return;
  redFecharModal();
  const editor = document.getElementById('red-editor-textarea');
  editor.value = r.texto;
  editor.dataset.temaId = r.temaId || '';
  editor.dataset.badge = r.badge || '';
  editor.dataset.titulo = r.titulo || '';
  document.getElementById('red-seletor-tema').value = editor.dataset.temaId;
  document.getElementById('red-editor-vest-badge').textContent = editor.dataset.badge;
  document.getElementById('red-editor-tema-titulo').textContent = editor.dataset.titulo;
  redAtualizarContadores(editor);
  redLimparAvaliacao();
  redAba('editor');
}

function redExcluirDoModal() {
  const r = redHistorico.find(item => item.chave === redModalId);
  if (!r) return;
  confirmarAcao({
    titulo: 'Excluir redação?',
    mensagem: 'O texto e a avaliação serão removidos do histórico.',
    acao: 'Excluir redação',
    executar: async () => {
      if (r.servidor) await authRequisicao('/api/redacoes/' + r.id, {method: 'DELETE'});
      redSaveHistoricoLegado(redGetHistoricoLegado().filter(x =>
        r.servidor ? x.temaId !== r.temaId || x.texto.trim() !== r.texto.trim() : x.id !== r.id,
      ));
      redFecharModal();
      await redCarregarHistorico();
      atualizarNivel();
    },
  });
}

function redLimparHistorico() {
  confirmarAcao({
    titulo: 'Excluir todo o histórico?',
    mensagem: 'Todas as redações e avaliações salvas serão excluídas permanentemente.',
    acao: 'Excluir histórico',
    executar: async () => {
      await authRequisicao('/api/redacoes', {method: 'DELETE'});
      redSaveHistoricoLegado([]);
      await redCarregarHistorico();
      atualizarNivel();
    },
  });
}

// ─── FEEDBACKS ───────────────────────────────────────────────
function redMostrarFeedback(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.display = 'none'; }, 3000);
}
function redMostrarFeedbackErro(msg) {
  // Usa toast em vez de alert() para não bloquear a interface
  showXPToast('⚠️ ' + msg);
}

const redModal = document.getElementById('red-modal');
redModal.addEventListener('click', e => { if (e.target === redModal) redFecharModal(); });
document.getElementById('red-editor-textarea').addEventListener('input', redLimparAvaliacao);
redCarregarTemas();
redConfigurarAvaliacao();
