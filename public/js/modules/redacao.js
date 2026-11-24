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
let redAvaliacoes = [];
let redPolling = null;
let redAvaliacaoVersao = 0;
let redRascunhoEmRevisao = null;
let redRascunhoEditor = null;
const redEnviosEditor = new Map();
let redEnvioVisivel = null;
let redEnvioPolling = null;
let redRequisicaoStatus = null;

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
    if (redHistorico.length) redRenderHistorico();
    if (document.getElementById('redtab-rascunhos').classList.contains('active') && !redRascunhoEmRevisao) redRenderRascunhos();
  } catch(e) {
    console.warn('Temas indisponíveis:',e);
    container.innerHTML='<p>Não foi possível carregar os temas. Atualize a página e tente novamente.</p>';
  }
}

async function redConfigurarAvaliacao() {
  try {
    const config = await authRequisicao('/api/config-publica');
    const seletor = document.getElementById('red-modo-avaliacao');
    const rotulos = {cloudflare: 'Cloudflare Workers AI (franquia gratuita)', openai: 'OpenAI (API paga)', gemini: 'Gemini (Google)', ollama: 'Ollama (servidor do voaAM)'};
    const provedores = config.provedores_redacao || [];
    const limite = Number(config.cloudflare_limite_diario_usuario);
    const descricaoLimite = document.getElementById('red-limite-usuario');
    if (descricaoLimite) descricaoLimite.textContent = Number.isInteger(limite) && limite >= 1
      ? `Cada aluno pode solicitar até ${limite} ${limite === 1 ? 'correção' : 'correções'} com Cloudflare nas últimas 24 horas.`
      : 'O limite por aluno é definido pelo administrador.';
    for (const opcao of seletor.options) {
      if (opcao.value === 'gratis') continue;
      opcao.disabled = !provedores.includes(opcao.value);
      opcao.textContent = rotulos[opcao.value] + (opcao.disabled ? ' · indisponível' : '');
    }
    if (provedores.includes('cloudflare')) seletor.value = 'cloudflare';
    else if (provedores.includes('openai')) seletor.value = 'openai';
    else if (provedores.includes('ollama')) seletor.value = 'ollama';
    const aviso = document.getElementById('red-gemini-config');
    aviso.textContent = config.gemini_redacao_mensagem || '';
    aviso.hidden = !aviso.textContent;
  } catch {
    // A opção local continua disponível quando a configuração não carrega.
  }
  redAtualizarProvedor();
}

function redAtualizarProvedor() {
  const modo = document.getElementById('red-modo-avaliacao').value;
  document.getElementById('red-detalhe-ollama').hidden = modo !== 'ollama';
  const avisoFranquia = document.getElementById('red-aviso-franquia');
  if (avisoFranquia) avisoFranquia.hidden = modo !== 'cloudflare';
  redLimparAvaliacao();
}

function redEditorTemaSelecionar(id){
  const card=[...document.querySelectorAll('.red-tema-card')].find(c=>c.dataset.temaId===id);
  if (!card) return;
  const editor = document.getElementById('red-editor-textarea');
  const textoSemTema = editor.dataset.temaId ? '' : editor.value;
  const botao = card.querySelector('.red-escrever-tema');
  redEscreverTema({stopPropagation() {}}, botao);
  if (textoSemTema.trim()) {
    editor.value = textoSemTema;
    redAtualizarContadores(editor);
    redLimparAvaliacao();
  }
}

// ─── ABAS ────────────────────────────────────────────────────
function redAba(aba) {
  const paineis = {
    temas:     document.getElementById('red-temas-panel'),
    editor:    document.getElementById('red-editor-panel'),
    historico: document.getElementById('red-historico-panel'),
    rascunhos: document.getElementById('red-rascunhos-panel'),
  };
  const btns = {
    temas:     document.getElementById('redtab-temas'),
    editor:    document.getElementById('redtab-editor'),
    historico: document.getElementById('redtab-historico'),
    rascunhos: document.getElementById('redtab-rascunhos'),
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
  else clearTimeout(redPolling);
  if (aba === 'rascunhos') redMostrarListaRascunhos();
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

  redPreencherEditor({temaId, titulo, badge, texto: localStorage.getItem(chaveRascunho(temaId)) || ''});
}

function redPreencherEditor({temaId, titulo, badge, texto, chaveRascunhoOriginal = null}) {
  redRascunhoEditor = chaveRascunhoOriginal;
  const editor = document.getElementById('red-editor-textarea');
  editor.dataset.temaId = temaId || '';
  editor.dataset.badge = badge || '';
  editor.dataset.titulo = titulo || '';
  editor.value = texto;
  document.getElementById('red-seletor-tema').value = editor.dataset.temaId;
  document.getElementById('red-editor-vest-badge').textContent = editor.dataset.badge || 'Escreva sua redação';
  document.getElementById('red-editor-tema-titulo').textContent = editor.dataset.titulo || 'Escolha um tema para continuar';
  redAtualizarContadores(editor);
  redLimparAvaliacao();
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

  const chave = redChaveRascunhoEditor(textarea);
  try {
    localStorage.setItem(chave, textarea.value);
    redAtualizarBotaoRascunho();
  } catch {
    redMostrarFeedbackErro('Não foi possível salvar o rascunho neste navegador.');
  }
}

function redChaveRascunhoEditor(editor) {
  return redRascunhoEditor || chaveRascunho(editor.dataset.temaId || 'sem_tema');
}

function redAtualizarBotaoRascunho() {
  const editor = document.getElementById('red-editor-textarea');
  const botao = document.getElementById('red-salvar-rascunho');
  const salvo = Boolean(editor.value.trim()) && localStorage.getItem(redChaveRascunhoEditor(editor)) === editor.value;
  botao.classList.toggle('red-rascunho-salvo', salvo);
  botao.textContent = salvo ? 'Rascunho salvo' : 'Salvar rascunho';
}

function redMostrarListaRascunhos(chave = null, restaurarFoco = false) {
  redRascunhoEmRevisao = null;
  document.getElementById('red-rascunho-revisao').hidden = true;
  const lista = document.getElementById('red-rascunhos-lista');
  lista.hidden = false;
  redRenderRascunhos();
  const cartao = [...lista.children].find(el => el.dataset.chave === chave);
  if (cartao) cartao.open = true;
  if (restaurarFoco) {
    const destino = cartao?.querySelector('summary') || document.getElementById('red-rascunhos-titulo');
    destino.focus();
  }
}

function redRevisarRascunho(rascunho) {
  redRascunhoEmRevisao = rascunho;
  document.getElementById('red-rascunhos-lista').hidden = true;
  document.getElementById('red-rascunhos-vazio').hidden = true;
  document.getElementById('red-rascunho-revisao').hidden = false;
  const titulo = document.getElementById('red-rascunho-tema');
  titulo.textContent = rascunho.titulo;
  const badge = document.getElementById('red-rascunho-badge');
  badge.textContent = rascunho.badge;
  badge.hidden = !rascunho.badge;
  const texto = document.getElementById('red-rascunho-texto');
  texto.textContent = rascunho.texto;
  texto.scrollTop = 0;
  titulo.focus();
}

function redRenderRascunhos() {
  const prefixo = chaveRascunho('');
  const lista = document.getElementById('red-rascunhos-lista');
  const temas = new Map([...document.querySelectorAll('.red-tema-card')].map(card => [card.dataset.temaId, card]));
  const abertos = new Set([...lista.querySelectorAll('details[open]')].map(el => el.dataset.chave));
  lista.replaceChildren();
  for (const chave of Object.keys(localStorage).sort()) {
    if (!chave.startsWith(prefixo)) continue;
    const texto = localStorage.getItem(chave);
    if (!texto?.trim()) continue;
    const temaId = chave.slice(prefixo.length);
    const card = temas.get(temaId);
    const titulo = card?.querySelector('.red-tema-titulo')?.textContent || (temaId === 'sem_tema' ? 'Rascunho sem tema' : temaId);
    const badge = card?.querySelector('.red-vest-badge')?.textContent || '';
    const rascunho = {temaId: card ? temaId : '', titulo, badge, texto, chaveRascunhoOriginal: chave};
    const cartao = redAiNo('details', 'red-hist-item red-rascunho-cartao');
    cartao.dataset.chave = chave;
    cartao.open = abertos.has(chave);
    const resumo = redAiNo('summary', 'red-hist-card');
    resumo.append(redAiNo('strong', '', titulo), redAiNo('span', 'red-rascunho-previa', redPrevia(texto)));
    const acoes = redAiNo('div', 'red-hist-envios red-editor-secondary-actions');
    const revisar = redAiNo('button', 'btn-primary', 'Revisar redação');
    revisar.type = 'button';
    revisar.addEventListener('click', () => redRevisarRascunho(rascunho));
    const excluir = redAiNo('button', 'btn-secondary', 'Excluir');
    excluir.type = 'button';
    excluir.setAttribute('aria-label', 'Excluir rascunho: ' + titulo);
    excluir.addEventListener('click', () => confirmarAcao({
      titulo: 'Excluir rascunho?',
      mensagem: 'Este rascunho será removido deste navegador.',
      acao: 'Excluir rascunho',
      executar: () => {
        localStorage.removeItem(chave);
        redAtualizarBotaoRascunho();
        redMostrarListaRascunhos(null, true);
      },
    }));
    acoes.append(revisar, excluir);
    cartao.append(resumo, acoes);
    lista.append(cartao);
  }
  document.getElementById('red-rascunhos-vazio').hidden = lista.childElementCount !== 0;
}

function redPrevia(texto) {
  const previa = texto.replace(/\s+/g, ' ').trim();
  return previa.slice(0, 120) + (previa.length > 120 ? '…' : '');
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
function redRenderAvaliacao(painel, dados) {
  const a=dados.avaliacao;
  if(!a || !Array.isArray(a.competencias))throw new Error('A resposta da IA está incompleta.');
  painel.replaceChildren();
  painel.classList.add('red-ai-relatorio');
  painel.append(redAiNo('h3','red-ai-titulo','Avaliação pedagógica por competências'));
  painel.append(redAiNo('p','red-ai-disclaimer',a.aviso||'Estimativa pedagógica; não é nota oficial.'));
  if (a.resumo) painel.append(redAiNo('p','red-ai-resumo',a.resumo));
  const adequacao = typeof a.adequacao_tema === 'string' ? a.adequacao_tema.trim() : '';
  const comentarioTema = /\p{L}/u.test(adequacao) ? adequacao : 'Não informada pela IA.';
  painel.append(redAiNo('p', 'red-ai-adequacao', 'Adequação ao tema: ' + comentarioTema));
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
    } else if (a.modo !== 'ollama' || a.detalhe === 'detalhado') sec.append(redAiNo('p','red-ai-sem-ajustes','Nenhum erro pontual com citação verificável identificado nesta competência.'));
    painel.append(sec);
  }
  if(Array.isArray(a.prioridades)&&a.prioridades.length){
    painel.append(redAiNo('h4','red-ai-prioridades-titulo','Prioridades de revisão'));
    const lista=redAiNo('ol','red-ai-prioridades');
    for(const item of a.prioridades)lista.append(redAiNo('li','',item));
    painel.append(lista);
  }
}
function redDadosEditor() {
  const editor = document.getElementById('red-editor-textarea');
  const provedor = document.getElementById('red-modo-avaliacao').value;
  return {
    provedor,
    detalhe: provedor === 'ollama' ? document.getElementById('red-detalhe-avaliacao').value : 'detalhado',
    tema_id: editor.dataset.temaId,
    tema: editor.dataset.titulo,
    texto: editor.value.trim(),
    vestibular: editor.dataset.badge?.split(' ')[0],
  };
}

function redChaveEnvio({provedor, detalhe, tema_id, texto}) {
  return JSON.stringify([provedor, detalhe, tema_id, texto]);
}

function redLimparAvaliacao() {
  redAtualizarBotaoRascunho();
  const envio = redEnviosEditor.get(redChaveEnvio(redDadosEditor())) || null;
  if (envio !== redEnvioVisivel) {
    clearTimeout(redEnvioPolling);
    redRequisicaoStatus?.abort();
    redEnvioVisivel = envio;
    if (envio?.id && redPendente(envio)) redAcompanharEnvio(envio);
  }
  redRenderEstadoEditor();
}

function redRenderEstadoEditor() {
  const envio = redEnvioVisivel;
  const porIA = document.getElementById('red-modo-avaliacao').value !== 'gratis';
  const rotulos = {
    enviando: 'Enviando…',
    fila: 'Aguardando na fila…',
    processando: envio?.provedor === 'gratis' ? 'Analisando…' : 'IA analisando…',
    concluida: porIA ? 'Correção concluída' : 'Análise concluída',
    falhou: porIA ? 'Correção falhou · Tentar novamente' : 'Análise falhou · Tentar novamente',
  };
  const botao = document.getElementById('red-analisar');
  const ocupado = Boolean(envio && (envio.estado === 'enviando' || redPendente(envio)));
  const texto = envio?.atualizando && ocupado ? 'Reconectando à correção…'
    : rotulos[envio?.estado] || (porIA ? 'Enviar para correção' : 'Analisar por regras');
  botao.disabled = ocupado || envio?.estado === 'concluida';
  // Estado visual único para correção por IA e análise gratuita.
  // Só exibe sucesso após a API confirmar estado="concluida".
  const estadoVisual = envio?.estado === 'concluida' ? 'sucesso'
    : envio?.estado === 'falhou' ? 'erro'
    : ocupado ? 'aguardando' : 'padrao';
  botao.dataset.estado = estadoVisual;
  delete botao.dataset.estadoIa; // Remove o seletor legado exclusivo de IA.
  botao.setAttribute('aria-busy', String(ocupado));
  document.getElementById('red-analisar-texto').textContent = texto;
  document.getElementById('red-ai-spinner').hidden = !ocupado;
  const aviso = document.getElementById('red-ai-progresso');
  let mensagem = botao.disabled ? texto : '';
  if (envio?.estado === 'concluida' && porIA) mensagem = 'Correção concluída e salva no Histórico.';
  if (aviso.textContent !== mensagem) aviso.textContent = mensagem;

  const erro = document.getElementById('red-ai-erro');
  const painel = document.getElementById('red-resultado-ia');
  painel.hidden = !envio || envio.estado !== 'concluida';
  let mensagemErro = envio?.erro || '';
  if (!painel.hidden && painel.envioRenderizado !== envio) {
    try {
      if (porIA) redRenderAvaliacao(painel, {avaliacao: JSON.parse(envio.resultado_ia)});
      else painel.replaceChildren(redAiNo('p', 'red-ai-texto-local', envio.resultado || 'Análise indisponível.'));
      painel.envioRenderizado = envio;
    } catch {
      painel.hidden = true;
      mensagemErro = 'Não foi possível exibir o relatório salvo. Consulte o Histórico.';
    }
  }
  if (erro.textContent !== mensagemErro) erro.textContent = mensagemErro;
  erro.hidden = !mensagemErro;
}

async function redAcompanharEnvio(envio) {
  const controle = new AbortController();
  redRequisicaoStatus = controle;
  try {
    const status = await authRequisicao('/api/redacao/avaliacoes/' + envio.id, {
      signal: AbortSignal.any([controle.signal, AbortSignal.timeout(10000)]),
    });
    if (controle.signal.aborted) return;
    Object.assign(envio, status, {atualizando: false});
    if (envio.estado === 'concluida') {
      atualizarNivel();
      if (redEnvioVisivel === envio && document.getElementById('red-analisar').getClientRects().length) {
        spawnStars();
      }
    }
  } catch (erro) {
    if (controle.signal.aborted) return;
    if ([401, 403, 404].includes(erro.status)) {
      Object.assign(envio, {estado: 'falhou', erro: erro.message});
    } else {
      envio.atualizando = true;
    }
  }
  if (redEnvioVisivel !== envio) return;
  redRenderEstadoEditor();
  if (redPendente(envio)) redEnvioPolling = setTimeout(() => redAcompanharEnvio(envio), 3000);
}

function redCorrigir() {
  if (document.getElementById('red-analisar').disabled) return;
  const dados = redDadosEditor();
  if (!dados.tema_id || dados.texto.length < 100 || dados.texto.length > 10000) {
    redMostrarFeedbackErro('Escolha um tema e escreva entre 100 e 10.000 caracteres.');
    return;
  }
  if (dados.provedor === 'gratis') {
    redEnviarCorrecao(dados);
    return;
  }
  const mensagem = ['openai', 'cloudflare'].includes(dados.provedor)
    ? 'A redação será enviada a um provedor de IA na nuvem. A nota é estimativa pedagógica, não oficial; o relatório ficará salvo no Histórico.'
    : dados.provedor === 'gemini'
      ? 'Esta versão será enviada ao Gemini (Google) e a correção ficará salva no Histórico.'
      : 'O Ollama vai analisar esta versão e a correção ficará salva no Histórico.';
  confirmarAcao({
    titulo: 'Enviar redação para correção?',
    mensagem,
    acao: 'Enviar para correção',
    cancelarTexto: 'Continuar editando',
    destrutiva: false,
    executar: () => { redEnviarCorrecao(dados); },
  });
}

async function redEnviarCorrecao(dados) {
  const porIA = dados.provedor !== 'gratis';
  const envio = {provedor: dados.provedor, estado: porIA ? 'enviando' : 'processando'};
  redEnviosEditor.set(redChaveEnvio(dados), envio);
  redLimparAvaliacao();
  try {
    const resposta = await authRequisicao(porIA ? '/api/redacao/avaliacoes' : '/api/redacao/avaliar-gratis', {
      method: 'POST',
      body: JSON.stringify(dados),
      signal: AbortSignal.timeout(15000),
    });
    Object.assign(envio, resposta, porIA ? {} : {estado: 'concluida'});
  } catch (erro) {
    envio.estado = 'falhou';
    envio.erro = erro.name === 'TimeoutError'
      ? 'O envio demorou. Confira o Histórico antes de tentar novamente.'
      : 'Não foi possível avaliar. ' + erro.message;
  }
  if (redEnvioVisivel !== envio) return;
  redRenderEstadoEditor();
  if (!porIA && envio.estado === 'concluida' && document.getElementById('red-analisar').getClientRects().length) {
    spawnStars();
  }
  if (envio.id && redPendente(envio)) redAcompanharEnvio(envio);
}

function redData(data) {
  return new Date(data.replace(' ', 'T') + 'Z').toLocaleString('pt-BR', {
    dateStyle: 'short', timeStyle: 'short',
  });
}

function redModeloHistorico(doc) {
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
    menorNota: doc.menor_nota,
    maiorNota: doc.maior_nota,
    avaliacao,
    quando: redData(doc.atualizada_em),
    criadaEm: doc.criada_em,
  };
}

function redPendente(envio) {
  return envio.estado === 'fila' || envio.estado === 'processando';
}

async function redCarregarHistorico(emFundo = false) {
  clearTimeout(redPolling);
  const versao = ++redHistoricoVersao;
  const legado = redGetHistoricoLegado().map(r => ({
    ...r, chave: 'local:' + r.id, quando: r.data + ' · ' + r.hora,
  }));
  try {
    const {redacoes, avaliacoes} = await authRequisicao('/api/redacoes', {signal: AbortSignal.timeout(10000)});
    if (versao !== redHistoricoVersao) return;
    const servidor = redacoes.map(redModeloHistorico);
    const versoes = new Set(servidor.map(r => JSON.stringify([r.temaId, r.texto.trim()])));
    const historico = servidor.concat(legado.filter(r => !versoes.has(JSON.stringify([r.temaId, r.texto.trim()]))));
    const mudouHistorico = JSON.stringify(historico) !== JSON.stringify(redHistorico);
    const mudouEnvios = JSON.stringify(avaliacoes) !== JSON.stringify(redAvaliacoes);
    if (!emFundo || mudouHistorico || mudouEnvios) {
      redHistorico = historico;
      redAvaliacoes = avaliacoes;
      redRenderHistorico();

    }
  } catch {
    if (versao !== redHistoricoVersao) return;
    if (!emFundo) {
      if (!redHistorico.length) redHistorico = legado;
      redRenderHistorico();
      document.getElementById('red-hist-contador').textContent = 'Não foi possível atualizar o histórico. Abra esta aba novamente para tentar.';
      document.getElementById('red-limpar-historico').disabled = true;
    }
  }
  if (redAvaliacoes.some(redPendente) && document.getElementById('screen-redacao').classList.contains('active')
      && document.getElementById('redtab-historico').classList.contains('active')) {
    redPolling = setTimeout(() => redCarregarHistorico(true), 4000);
  }
}

function redAgruparHistorico() {
  const temasPorTitulo = new Map();
  for (const card of document.querySelectorAll('.red-tema-card')) {
    const titulo = redNormalizarTitulo(card.querySelector('.red-tema-titulo').textContent);
    const ids = temasPorTitulo.get(titulo) || [];
    ids.push(card.dataset.temaId);
    temasPorTitulo.set(titulo, ids);
  }
  const grupos = new Map();
  for (const redacao of redHistorico) {
    const titulo = redNormalizarTitulo(redacao.titulo);
    const ids = temasPorTitulo.get(titulo) || [];
    const id = redacao.temaId || (ids.length === 1 ? ids[0] : '');
    const chave = id ? 'tema:' + id : (titulo ? `titulo:${redacao.badge || ''}:${titulo}` : redacao.chave);
    if (!grupos.has(chave)) grupos.set(chave, {chave, versoes: []});
    grupos.get(chave).versoes.push(redacao);
  }
  return [...grupos.values()].map(grupo => {
    const atividade = grupo.versoes[0].quando;
    grupo.versoes.sort((a, b) => (b.criadaEm || '').localeCompare(a.criadaEm || '') || Number(b.id) - Number(a.id));
    const versaoPorId = new Map(grupo.versoes.filter(r => r.servidor).map(r => [r.id, r]));
    const envios = redAvaliacoes.filter(a => versaoPorId.has(a.redacao_id));
    const notas = envios
      .filter(e => e.estado === 'concluida' && Number.isFinite(e.nota))
      .sort((a, b) => b.nota - a.nota);
    const extremos = [
      ...grupo.versoes.flatMap(v => [v.menorNota, v.maiorNota, v.nota]),
      ...notas.map(e => e.nota),
    ].filter(Number.isFinite);
    return {
      ...grupo, recente: grupo.versoes[0], atividade, envios, versaoPorId, notas,
      maior: extremos.length ? Math.max(...extremos) : null,
      menor: extremos.length ? Math.min(...extremos) : null,
    };
  }).sort((a, b) => (b.maior ?? -1) - (a.maior ?? -1));
}

function redNormalizarTitulo(titulo) {
  return (titulo || '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR');
}

function redRotuloProvedor(envio) {
  if (envio.provedor === 'cloudflare') return 'Cloudflare Workers AI';
  if (envio.provedor === 'openai') return 'OpenAI';
  if (envio.provedor === 'gemini') return 'Gemini';
  if (envio.provedor !== 'ollama') return 'Avaliação anterior';
  const detalhe = (envio.detalhe_entregue || envio.detalhe) === 'detalhado' ? 'Detalhada' : 'Resumida';
  return 'Ollama · ' + detalhe;
}

function redSecaoEnvios(itens, textoVazio, grupo) {
  const secao = redAiNo('section', 'red-envios');
  if (!itens.length) {
    secao.append(redAiNo('p', '', textoVazio));
    return secao;
  }
  const lista = redAiNo('ul', 'red-envios-lista');
  for (const envio of itens) {
    const li = redAiNo('li', '');
    const redacao = grupo.versaoPorId.get(envio.redacao_id);
    const numero = grupo.versoes.length - grupo.versoes.indexOf(redacao);
    const versao = grupo.versoes.length > 1 ? ` · Versão ${numero}` : '';
    li.append(redAiNo('p', '', `${redData(envio.enviada_em)} · ${redRotuloProvedor(envio)}${versao}`));
    if (Number.isFinite(envio.nota)) {
      li.append(redAiNo('strong', '', `Nota estimada · ${envio.nota}/1000`));
    } else {
      li.append(redAiNo('p', '', envio.erro || 'Não foi possível concluir a avaliação.'));
    }
    if (envio.estado === 'concluida' && envio.tem_relatorio) {
      const botao = redAiNo('button', 'btn-secondary', 'Ver avaliação');
      botao.type = 'button';
      botao.dataset.envioId = envio.id;
      botao.addEventListener('click', () => redAbrirAvaliacao(redacao, envio));
      li.append(botao);
    }
    lista.append(li);
  }
  secao.append(lista);
  return secao;
}

function redMontarFiltroEnvios(card, detalhes, grupo, indice, notas, falhas, filtroInicial) {
  const opcoes = [
    {id: 'correcoes', rotulo: 'Correções', itens: notas, vazio: 'Nenhuma correção concluída.'},
    {id: 'erros', rotulo: 'Erros da IA', itens: falhas, vazio: 'Nenhum erro registrado.'},
  ];
  const seletor = redAiNo('div', 'red-envios-filtros');
  seletor.setAttribute('role', 'group');
  seletor.setAttribute('aria-label', 'Filtrar notas e envios');
  const paineis = opcoes.map(({id, rotulo, itens, vazio}) => {
    const botao = redAiNo('button', 'page-tab', `${rotulo} (${itens.length})`);
    botao.type = 'button';
    botao.dataset.filtroEnvios = id;
    const painel = redSecaoEnvios(itens, vazio, grupo);
    painel.id = `red-envios-${indice}-${id}`;
    painel.setAttribute('aria-label', rotulo);
    botao.setAttribute('aria-controls', painel.id);
    botao.addEventListener('click', () => selecionar(id));
    seletor.append(botao);
    return {id, botao, painel};
  });

  function selecionar(filtro) {
    card.dataset.filtroEnvios = filtro;
    for (const {id, botao, painel} of paineis) {
      const selecionado = id === filtro;
      botao.setAttribute('aria-pressed', String(selecionado));
      painel.hidden = !selecionado;
    }
  }

  detalhes.append(seletor, ...paineis.map(({painel}) => painel));
  selecionar(filtroInicial || 'correcoes');
}

async function redAbrirAvaliacao(redacao, envio) {
  const versao = ++redAvaliacaoVersao;
  const modal = document.getElementById('red-avaliacao-modal');
  const painel = document.getElementById('red-avaliacao-relatorio');
  const status = document.getElementById('red-avaliacao-status');
  document.getElementById('red-avaliacao-titulo').textContent = redacao.titulo || 'Avaliação da redação';
  document.getElementById('red-avaliacao-meta').textContent = `${redRotuloProvedor(envio)} · ${redData(envio.enviada_em)}`;
  painel.hidden = true;
  painel.replaceChildren();
  status.textContent = 'Carregando avaliação…';
  if (!modal.open) modal.showModal();
  modal.querySelector('.red-modal-body').scrollTop = 0;
  try {
    const dados = await authRequisicao('/api/redacao/avaliacoes/' + envio.id, {signal: AbortSignal.timeout(10000)});
    if (versao !== redAvaliacaoVersao || !modal.open) return;
    redRenderAvaliacao(painel, {avaliacao: JSON.parse(dados.resultado_ia)});
    status.textContent = '';
    painel.hidden = false;
  } catch {
    if (versao === redAvaliacaoVersao && modal.open) status.textContent = 'Não foi possível abrir esta avaliação.';
  }
}

function redRenderHistorico() {
  const container = document.getElementById('red-hist-lista');
  const grupos = redAgruparHistorico();
  const n = grupos.length;
  document.getElementById('red-hist-contador').textContent = n
    ? `${n} tema${n === 1 ? '' : 's'} · ${redHistorico.length} redaç${redHistorico.length === 1 ? 'ão' : 'ões'} salva${redHistorico.length === 1 ? '' : 's'}`
    : 'Nenhuma redação salva ainda';
  document.getElementById('red-hist-vazio').style.display = n ? 'none' : 'block';
  document.getElementById('red-limpar-historico').disabled = n === 0;
  const badge = document.getElementById('red-hist-badge');
  badge.textContent = n;
  badge.hidden = n === 0;
  const filtros = new Map([...container.children].map(card => [card.dataset.chave, card.dataset.filtroEnvios]));
  const expandidas = new Set([...container.querySelectorAll('details[open]')].map(el => el.parentElement.dataset.chave));
  const foco = document.activeElement;
  const chaveFoco = foco?.closest('article[data-chave]')?.dataset.chave;
  container.replaceChildren();
  for (const [indice, grupo] of grupos.entries()) {
    const {recente: r, chave, envios} = grupo;
    const card = redAiNo('article', 'red-hist-item');
    card.dataset.chave = chave;
    const abrir = redAiNo('button', 'red-hist-card');
    abrir.type = 'button';
    abrir.append(
      redAiNo('p', '', [r.badge, grupo.atividade, grupo.versoes.length > 1 ? `${grupo.versoes.length} versões` : ''].filter(Boolean).join(' · ')),
      redAiNo('h3', '', r.titulo || 'Redação'),
      redAiNo('p', '', redPrevia(r.texto)),
    );
    if (grupo.maior !== null) {
      const extremos = redAiNo('div', 'red-hist-extremos');
      extremos.append(
        redAiNo('strong', 'red-hist-nota', `Maior nota · ${grupo.maior}/1000`),
        redAiNo('strong', 'red-hist-nota', `Menor nota · ${grupo.menor}/1000`),
      );
      abrir.append(extremos);
    }
    abrir.addEventListener('click', () => redAbrirModal(r.chave, grupo.versoes));
    card.append(abrir);
    if (envios.length) {
      const detalhes = redAiNo('details', 'red-hist-envios');
      const ativas = envios.filter(redPendente).length;
      const rotulo = ativas ? `Notas e envios (${envios.length}) · ${ativas} em andamento` : `Notas e envios (${envios.length})`;
      detalhes.open = expandidas.has(chave);
      const falhas = envios.filter(e => e.estado === 'falhou');
      detalhes.append(redAiNo('summary', '', rotulo));
      redMontarFiltroEnvios(card, detalhes, grupo, indice, grupo.notas, falhas, filtros.get(chave));
      if (ativas) {
        const estados = {fila: 'Na fila', processando: 'Em análise'};
        const listaAtivas = redAiNo('ul', 'red-envios-lista red-envios-em-andamento');
        listaAtivas.setAttribute('aria-label', 'Envios em andamento');
        for (const envio of envios.filter(redPendente)) {
          listaAtivas.append(redAiNo('li', '', `${redRotuloProvedor(envio)} · ${estados[envio.estado]}`));
        }
        detalhes.append(listaAtivas);
      }
      card.append(detalhes);
    }
    container.append(card);
    if (chave === chaveFoco && !redModal.open && !document.getElementById('red-avaliacao-modal').open) {
      const destino = [...card.querySelectorAll('button, summary')].find(el =>
        el.tagName === foco.tagName && el.dataset.envioId === foco.dataset.envioId
        && el.dataset.filtroEnvios === foco.dataset.filtroEnvios);
      (destino || abrir).focus({preventScroll: true});
    }
  }
}

function redAbrirModal(chave, versoes) {
  const r = redHistorico.find(item => item.chave === chave);
  if (!r) return;
  redModalId = chave;
  document.getElementById('modal-vest-badge').textContent = r.badge || '';
  document.getElementById('modal-tema-titulo').textContent = r.titulo || 'Redação';
  document.getElementById('modal-meta').textContent = r.quando;
  const seletor = document.getElementById('modal-versao');
  document.getElementById('modal-versoes').hidden = versoes.length < 2;
  seletor.replaceChildren(...versoes.map((v, indice) => new Option(
    `Versão ${versoes.length - indice} · ${v.criadaEm ? redData(v.criadaEm) : v.quando}`, v.chave,
  )));
  seletor.value = chave;
  seletor.onchange = () => redAbrirModal(seletor.value, versoes);
  document.getElementById('modal-texto').textContent = r.texto;
  const stats = document.getElementById('modal-stats');
  stats.replaceChildren(
    redAiNo('span', '', `${r.palavras} palavras`),
    redAiNo('span', '', `${r.linhas}/30 linhas estimadas`),
  );
  if (Number.isFinite(r.nota)) stats.append(redAiNo('strong', '', `Nota estimada · ${r.nota}/1000`));
  const avaliacao = document.getElementById('modal-avaliacao');
  avaliacao.hidden = !Array.isArray(r.avaliacao?.competencias);
  if (!avaliacao.hidden) redRenderAvaliacao(avaliacao, {avaliacao: r.avaliacao});
  document.getElementById('modal-avaliacao-status').textContent = avaliacao.hidden ? '' : 'Avaliação mais recente desta versão';
  if (!redModal.open) redModal.showModal();
  redModal.querySelector('.red-modal-body').scrollTop = 0;
}

function redFecharModal() {
  document.getElementById('red-modal').close();
  redModalId = null;
}

function redRetomarDoModal() {
  const r = redHistorico.find(item => item.chave === redModalId);
  if (!r) return;
  redFecharModal();
  redPreencherEditor(r);
}

function redExcluirDoModal() {
  const r = redHistorico.find(item => item.chave === redModalId);
  if (!r) return;
  confirmarAcao({
    titulo: 'Excluir esta versão?',
    mensagem: 'O texto desta versão e suas avaliações serão removidos do histórico. Envios na fila ou em análise serão cancelados.',
    acao: 'Excluir versão',
    executar: async () => {
      if (r.servidor) {
        await authRequisicao('/api/redacoes/' + r.id, {method: 'DELETE'});
        for (const [chave, envio] of redEnviosEditor) {
          if (envio.redacao_id === r.id) redEnviosEditor.delete(chave);
        }
        redLimparAvaliacao();
      }
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
      for (const [chave, envio] of redEnviosEditor) {
        if (envio.redacao_id) redEnviosEditor.delete(chave);
      }
      redLimparAvaliacao();
      redSaveHistoricoLegado([]);
      await redCarregarHistorico();
      atualizarNivel();
    },
  });
}

// ─── FEEDBACKS ───────────────────────────────────────────────
function redMostrarFeedbackErro(msg) {
  // Usa toast em vez de alert() para não bloquear a interface
  showXPToast('⚠️ ' + msg);
}

const redModal = document.getElementById('red-modal');
redModal.addEventListener('click', e => { if (e.target === redModal) redFecharModal(); });
const redAvaliacaoModal = document.getElementById('red-avaliacao-modal');
redAvaliacaoModal.addEventListener('click', e => { if (e.target === redAvaliacaoModal) redAvaliacaoModal.close(); });
document.getElementById('red-rascunho-editar').addEventListener('click', () => {
  if (!redRascunhoEmRevisao) return;
  redPreencherEditor(redRascunhoEmRevisao);
  document.getElementById('red-editor-textarea').focus({preventScroll: true});
});
document.getElementById('red-rascunho-voltar').addEventListener('click', () =>
  redMostrarListaRascunhos(redRascunhoEmRevisao?.chaveRascunhoOriginal, true),
);
document.getElementById('red-editor-textarea').addEventListener('input', redLimparAvaliacao);
redCarregarTemas();
redConfigurarAvaliacao();
