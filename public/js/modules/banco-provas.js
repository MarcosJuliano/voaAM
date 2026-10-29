// Banco de Provas — somente referências oficiais, cadastradas no SQLite.
// Sem HEAD em PDF local, sem gerar links falsos para arquivos inexistentes.
function toggleVest(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}
function bpAno(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}
function bpEscapar(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
const BP_IDS = ['ENEM','PSC','MACRO','SIS'];
function bpBlocoAno(vest, doc) {
  const nome = doc.ano === 0 ? 'Acervo' : doc.ano;
  const chave = `bpa-${vest.toLowerCase()}-${doc.ano}`;
  const onlineKey = (vest === 'ENEM' || vest === 'MACRO') && doc.ano > 0
    ? `${vest}${doc.ano}` : null;
  const onlineDisponivel = onlineKey && typeof scGetQuestoes === 'function'
    && scGetQuestoes(onlineKey).length > 0;
  const etapas = (vest === 'SIS' || vest === 'PSC') ? [1,2,3].filter(i => typeof scGetQuestoes === 'function' && scGetQuestoes(`${vest}${i}`).length > 0).map(i => `<button type="button" class="bp-btn bp-btn-g" onclick="bpIniciarSimulado('${vest}${i}')">Etapa ${i} · Simulado online</button>`).join('') : '';
  const online = onlineDisponivel
    ? `<button type="button" class="bp-btn bp-btn-g" onclick="bpIniciarSimulado('${onlineKey}')">Simulado online</button>`
    : '';
  return `<div class="bp-ano" id="${chave}">
    <button type="button" class="bp-ano-hdr" onclick="bpAno('${chave}')" aria-label="Expandir ${bpEscapar(nome)}">
      <span class="bp-ano-hdr-txt">${bpEscapar(nome)}</span>
      <span class="bp-chev" aria-hidden="true">▾</span>
    </button>
    <div class="bp-ano-body">
      <div class="bp-row">
        <div style="flex:1;min-width:0">
          <div class="bp-row-nome">${bpEscapar(doc.titulo)}</div>
          <div class="bp-note">${bpEscapar(doc.observacao)}</div>
          <div class="bp-note">Fonte: ${bpEscapar(doc.instituicao)}</div>
        </div>
        <div class="bp-row-btns">${online}${etapas}
          <a class="bp-btn bp-btn-p" href="${bpEscapar(doc.url_oficial)}" target="_blank" rel="noopener noreferrer">Portal oficial</a>
        </div>
      </div>
    </div>
  </div>`;
}
function bpIniciarSimulado(key) {
  const grupo = key.startsWith('ENEM') ? 'ENEM' : key.startsWith('MACRO') ? 'MACRO' : key;
  if (typeof goTo !== 'function' || typeof simModoAba !== 'function' ||
      typeof scMostrarConfirmacao !== 'function') {
    console.error('[VoaAM] Módulos do simulado não disponíveis.');
    if (typeof showXPToast === 'function') showXPToast('O simulado ainda não carregou. Atualize a página.');
    return;
  }
  goTo('praticar');
  simModoAba('completo');
  scMostrarConfirmacao(key, grupo);
}
async function initBancoProvas() {
  const containers = Object.fromEntries(BP_IDS.map(v => [v, document.getElementById(`bp-${v.toLowerCase()}-anos`)]));
  for (const el of Object.values(containers)) if (el) el.innerHTML = '<p class="bp-loading">Carregando referências oficiais…</p>';
  try {
    const res = await fetch('/api/provas-oficiais', {headers:{Accept:'application/json'}});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const {documentos} = await res.json();
    if (!Array.isArray(documentos)) throw new Error('Formato de catálogo inválido');
    for (const vest of BP_IDS) {
      const destino = containers[vest];
      if (!destino) continue;
      const docs = documentos.filter(d => d.vestibular === vest);
      destino.innerHTML = docs.length ? docs.map(d => bpBlocoAno(vest,d)).join('')
        : '<p class="bp-loading">Nenhuma referência oficial cadastrada neste momento.</p>';
    }
  } catch (erro) {
    console.warn('[VoaAM] API de provas indisponível; carregando acervo estático:', erro);
    try {
      const resposta = await fetch('/data/provas-oficiais.json', {cache:'no-store'});
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const docs = await resposta.json();
      for (const vest of BP_IDS) {
        const destino = containers[vest];
        if (!destino) continue;
        const filtrados = docs.filter(d => d.vestibular === vest);
        destino.innerHTML = filtrados.length ? filtrados.map(d => bpBlocoAno(vest,d)).join('')
          : '<p class="bp-loading">Nenhuma referência oficial cadastrada.</p>';
      }
    } catch(falha) {
      console.error('[VoaAM] Catálogo oficial indisponível:', falha);
      for (const destino of Object.values(containers)) if (destino)
        destino.innerHTML = '<p class="bp-loading">Não foi possível abrir o acervo. <button type="button" onclick="initBancoProvas()">Tentar novamente</button></p>';
    }
  }
}
