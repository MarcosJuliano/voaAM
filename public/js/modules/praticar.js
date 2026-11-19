// js/modules/praticar.js
// Abas de praticar: simulados e exercícios (fluxo assunto→nível→questões)

// ─── PRATICAR — ABAS ───
let pratAbaAtual = 'sim';
let simVestAtual = 'ENEM';
let exVestAtual = 'ENEM';
let simModoAtual = null; // 'simples' or 'completo'

function novaTentativaSimulado() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
}

function simCartaoNotas(modo, chave) {
  return `<section class="pratica-notas sim-notas" data-modo="${modo}" data-chave="${chave}" aria-label="Notas do simulado">
    <div class="sim-notas-grade">
      <div>Última nota <strong data-nota="ultima">—</strong></div>
      <div>Maior nota <strong data-nota="maxima">—</strong></div>
      <div>Menor nota <strong data-nota="minima">—</strong></div>
    </div>
    <p role="status">Carregando notas…</p>
  </section>`;
}

async function simAtualizarNotas() {
  const cartao = document.querySelector('#sim-cards-container .sim-notas');
  if (!cartao) return;
  const contaId = authConta?.id;
  const pedido = Symbol();
  cartao.pedido = pedido;
  const status = cartao.querySelector('[role="status"]');
  const params = new URLSearchParams({modo: cartao.dataset.modo, chave: cartao.dataset.chave});
  try {
    const {notas} = await authRequisicao('/api/praticar/simulados/notas?' + params);
    if (!cartao.isConnected || cartao.pedido !== pedido || contaId !== authConta?.id) return;
    for (const campo of cartao.querySelectorAll('[data-nota]')) {
      const valor = notas?.[campo.dataset.nota];
      campo.textContent = valor == null ? '—' : valor + '%';
    }
    status.textContent = notas ? '' : 'Nenhuma tentativa registrada para este simulado.';
  } catch {
    if (cartao.isConnected && cartao.pedido === pedido && contaId === authConta?.id) {
      status.textContent = 'Não foi possível carregar as notas.';
    }
  }
}

// Config dos vestibulares: questões e tempo completos
const simConfig = {
  ENEM:  { label:'ENEM',         emoji:'🌿', qs:45, horas:5, cor:'rgba(34,197,94,0.12)',  corBorda:'rgba(34,197,94,0.3)',  corNum:'#22c55e' },
  MACRO: { label:'MACRO',        emoji:'🔥', qs:20, horas:4, cor:'rgba(239,68,68,0.12)',  corBorda:'rgba(239,68,68,0.3)',  corNum:'var(--red)' },
  PSC1:  { label:'PSC 1ª Etapa', emoji:'🎓', qs:10, horas:2, cor:'rgba(59,130,246,0.12)', corBorda:'rgba(59,130,246,0.3)', corNum:'var(--accent2)' },
  PSC2:  { label:'PSC 2ª Etapa', emoji:'🎓', qs:12, horas:2, cor:'rgba(59,130,246,0.12)', corBorda:'rgba(59,130,246,0.3)', corNum:'var(--accent2)' },
  PSC3:  { label:'PSC 3ª Etapa', emoji:'🎓', qs:15, horas:2, cor:'rgba(59,130,246,0.12)', corBorda:'rgba(59,130,246,0.3)', corNum:'var(--accent2)' },
  SIS1:  { label:'SIS 1ª Etapa', emoji:'⭐', qs:10, horas:2, cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)' },
  SIS2:  { label:'SIS 2ª Etapa', emoji:'⭐', qs:12, horas:2, cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)' },
  SIS3:  { label:'SIS 3ª Etapa', emoji:'⭐', qs:15, horas:2, cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)' },
};

// ─── CATÁLOGO CENTRALIZADO DE PROVAS OFICIAIS ────────────────
const provasOficiaisCatalogo = {
  'ENEM': {
    emoji: '🇧🇷', label: 'ENEM',
    sub: 'Exame Nacional do Ensino Médio',
    cor: 'rgba(34,197,94,0.08)', corBorda: 'rgba(34,197,94,0.25)', corNum: '#22c55e',
    anos: [
      {
        key: 'ENEM2025_MAT', ano: '2025', qs: 45, horas: '5h',
        temas: ['Álgebra','Funções','Geometria Plana','Geometria Espacial','Estatística','Probabilidade','Trigonometria','Combinatória','Logaritmos','Análise Dimensional'],
        getData: () => typeof ENEM2025_MAT !== 'undefined' ? ENEM2025_MAT : null,
      },
      {
        key: 'ENEM2024_MAT', ano: '2024', qs: 45, horas: '5h',
        temas: ['Álgebra','Funções','Geometria Plana','Geometria Espacial','Estatística','Probabilidade','Trigonometria','Combinatória','Logaritmos','Análise Dimensional'],
        getData: () => typeof ENEM2024_MAT !== 'undefined' ? ENEM2024_MAT : null,
      },
      {
        key: 'ENEM2023_MAT', ano: '2023', qs: 45, horas: '5h',
        temas: ['Álgebra','Funções','Geometria Plana','Geometria Espacial','Estatística','Probabilidade','Trigonometria','Combinatória','Logaritmos','Análise Dimensional'],
        getData: () => typeof ENEM2023_MAT !== 'undefined' ? ENEM2023_MAT : null,
      },
    ],
  },
};

function simModoAba(modo) {
  simModoAtual = modo;
  document.getElementById('simtab-simples')?.setAttribute('aria-pressed', String(modo === 'simples'));
  document.getElementById('simtab-completo')?.setAttribute('aria-pressed', String(modo === 'completo'));

  const picker       = document.getElementById('sim-vest-picker');
  const label        = document.getElementById('sim-vest-picker-label');
  const grid         = document.getElementById('sim-vest-picker-grid');
  const cardsContainer = document.getElementById('sim-cards-container');
  if (!picker || !grid) return;
  picker.style.display = 'block';
  if (cardsContainer) cardsContainer.innerHTML = '';

  // ── MODO COMPLETO: grid igual ao simples, dados do SC_PROVAS ─
  if (modo === 'completo') {
    if (label) label.textContent = '🏆 Escolha o vestibular';
    const ordemVestCompleto = ['PSC1','SIS1','PSC2','SIS2','PSC3','SIS3','ENEM','MACRO'];
    grid.innerHTML = ordemVestCompleto.map(key => {
      const cfg = simConfig[key];
      if (!cfg) return '';
      // Info de questões via SC_PROVAS (quando disponível)
      let sub = `${cfg.qs} questões`;
      if (typeof SC_GRUPOS !== 'undefined' && typeof SC_PROVAS !== 'undefined') {
        const chaves = SC_GRUPOS[key] || [];
        const nProvas = chaves.filter(k => scGetQuestoes(k).length > 0).length;
        if (nProvas > 0)
          sub = chaves.length > 1
            ? `${nProvas} ano${nProvas > 1 ? 's' : ''} disponível${nProvas > 1 ? 'veis' : ''}`
            : `${scGetQuestoes(chaves[0]).length} questões`;
      }
      return `<button type="button" class="pratica-opcao" onclick="scMostrarAnos('${key}')" style="
        padding:14px 12px;border-radius:14px;border:1px solid ${cfg.corBorda};
        --fundo-cartao:${cfg.cor};color:var(--text);font-family:var(--font);
        cursor:pointer;text-align:left;display:flex;flex-direction:column;gap:4px">
        <div style="font-size:20px">${cfg.emoji}</div>
        <div style="font-size:13px;font-weight:700;color:${cfg.corNum}">${cfg.label}</div>
        <div style="font-size:10px;color:var(--text2)">${sub}</div>
      </button>`;
    }).join('');
    return;
  }

  // ── MODO SIMPLES: picker de vestibular original ────────────
  if (label) label.textContent = '⚡ Escolha o vestibular — Modo Simples';
  const ordemVest = ['PSC1','SIS1','PSC2','SIS2','PSC3','SIS3','ENEM','MACRO'];
  grid.innerHTML = ordemVest.map(key => {
    const cfg  = simConfig[key];
    if (!cfg) return '';
    const qs      = Math.ceil(cfg.qs / 2);
    const mins    = Math.ceil(cfg.horas * 60 / 2);
    const horasStr = mins >= 60 ? (mins/60).toFixed(1).replace('.0','')+'h' : mins+'min';
    return `<button type="button" class="pratica-opcao" onclick="simSelecionarVestibular('${key}')" style="
      padding:14px 12px;border-radius:14px;border:1px solid ${cfg.corBorda};
      --fundo-cartao:${cfg.cor};color:var(--text);font-family:var(--font);
      cursor:pointer;text-align:left;display:flex;flex-direction:column;gap:4px">
      <div style="font-size:20px">${cfg.emoji}</div>
      <div style="font-size:13px;font-weight:700;color:${cfg.corNum}">${cfg.label}</div>
      <div style="font-size:10px;color:var(--text2)">${qs} questões • ${horasStr}</div>
    </button>`;
  }).join('');
}

// ─── COMPLETO: passo 1 → escolheu vestibular, mostra anos ────
function scSelecionarVestibularCompleto(vestKey) {
  const v = provasOficiaisCatalogo[vestKey];
  if (!v) return;
  const picker = document.getElementById('sim-vest-picker');
  if (picker) picker.style.display = 'none';
  const container = document.getElementById('sim-cards-container');
  if (!container) return;

  container.innerHTML = `
    <div style="margin-bottom:12px;display:flex;align-items:center;gap:8px">
      <button type="button" class="pratica-acao" onclick="voltarParaModos()" style="
        padding:7px 12px;border-radius:8px;border:1px solid var(--border);
        background:transparent;color:var(--text2);font-family:var(--font);font-size:12px;cursor:pointer">
        ← Voltar
      </button>
      <span style="font-size:13px;font-weight:700;color:var(--text)">${v.emoji} ${v.label} — Escolha o ano</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${v.anos.map(p => {
        const disponivel = p.getData() !== null;
        return `
        <button type="button" class="pratica-opcao" ${disponivel ? '' : 'disabled'} onclick="${disponivel ? `scSelecionarAnoCompleto('${vestKey}','${p.key}')` : ''}" style="
          padding:16px;border-radius:14px;border:1px solid ${disponivel ? v.corBorda : 'var(--border)'};
          --fundo-cartao:${disponivel ? v.cor : 'var(--vidro-base)'};color:var(--text);font-family:var(--font);
          cursor:${disponivel ? 'pointer' : 'not-allowed'};text-align:left;
          opacity:${disponivel ? '1' : '0.5'};display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:15px;font-weight:800;color:${disponivel ? v.corNum : 'var(--text2)'}">${v.label} ${p.ano}</div>
            <div style="font-size:11px;color:var(--text2);margin-top:3px">${p.qs} questões · ${p.horas} · Gabarito oficial</div>
          </div>
          <div style="font-size:20px;color:${disponivel ? v.corNum : 'var(--text2)'}">${disponivel ? '›' : '🔒'}</div>
        </button>`;
      }).join('')}
    </div>`;
}

// ─── COMPLETO: passo 2 → escolheu ano, mostra card de confirmação ──
function scSelecionarAnoCompleto(vestKey, provaKey) {
  const v = provasOficiaisCatalogo[vestKey];
  const p = v?.anos.find(a => a.key === provaKey);
  if (!v || !p) return;
  const container = document.getElementById('sim-cards-container');
  if (!container) return;

  container.innerHTML = `
    <div class="pratica-cartao" style="--fundo-cartao:${v.cor};border-color:${v.corBorda}">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="font-size:32px">${v.emoji}</div>
        <div>
          <div style="font-size:16px;font-weight:800;color:${v.corNum}">${v.label} ${p.ano}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">Matemática e suas Tecnologias</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${v.corNum}">${p.qs}</div>
          <div style="font-size:10px;color:var(--text2)">Questões</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${v.corNum}">${p.horas}</div>
          <div style="font-size:10px;color:var(--text2)">Tempo</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${v.corNum}">Oficial</div>
          <div style="font-size:10px;color:var(--text2)">Gabarito</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text2);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Conteúdos abordados</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px">
        ${p.temas.map(t => `<span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--text2);font-weight:600">${t}</span>`).join('')}
      </div>
      ${simCartaoNotas('completo', provaKey.replace('_MAT', ''))}
      <button type="button" class="pratica-acao" onclick="scIniciarDireto('${provaKey.replace('_MAT', '')}')" style="
        width:100%;padding:15px;border-radius:12px;border:none;
        background:${v.corNum};color:#fff;font-family:var(--font);font-size:15px;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px">
        🏆 Iniciar Simulado Completo
      </button>
      <button type="button" class="pratica-acao" onclick="scSelecionarVestibularCompleto('${vestKey}')" style="
        width:100%;padding:11px;margin-top:8px;border-radius:12px;border:1px solid var(--border);
        background:transparent;color:var(--text2);font-family:var(--font);font-size:13px;cursor:pointer">
        ← Trocar ano
      </button>
    </div>`;
  simAtualizarNotas();
}

function simSelecionarVestibular(vestKey) {
  simVestAtual = vestKey;
  const picker = document.getElementById('sim-vest-picker');
  if (picker) picker.style.display = 'none';
  renderSimCardsNovo(vestKey, simModoAtual);
}

function renderSimCardsNovo(vestKey, modo) {
  const container = document.getElementById('sim-cards-container');
  if (!container) return;
  const cfg = simConfig[vestKey];
  if (!cfg) return;
  const qs   = modo === 'simples' ? Math.ceil(cfg.qs / 2) : cfg.qs;
  const mins = modo === 'simples' ? Math.ceil(cfg.horas * 60 / 2) : cfg.horas * 60;
  const horasStr = mins >= 60 ? (mins/60).toFixed(1).replace('.0','')+'h' : mins+'min';
  const modoLabel = modo === 'simples' ? 'Simples' : 'Completo';
  const modeIcon  = modo === 'simples' ? '⚡' : '🏆';

  const temasMap = {
    ENEM:  ['Álgebra & Funções','Geometria','Estatística','Probabilidade','Trigonometria','Mat. Financeira','Combinatória'],
    MACRO: ['Logaritmos & Exp.','Geometria Espacial','Probabilidade','Álgebra Avançada','Combinatória'],
    PSC1:  ['Conjuntos','Função Afim','Função Quadrática','Geometria Plana','PA e PG'],
    PSC2:  ['Trigonometria','Geometria Espacial','Matrizes','Sistemas Lineares','Combinatória'],
    PSC3:  ['Logaritmos','Probabilidade','Geo. Analítica','Números Complexos','Cônicas'],
    SIS1:  ['Funções','Equações','Geometria Plana','Progressões','Trigonometria'],
    SIS2:  ['Matrizes','Probabilidade','Geo. Espacial','Trigonometria Avançada','Logaritmos'],
    SIS3:  ['Combinatória','Estatística','Geo. Analítica','Mat. Financeira','Funções Avançadas'],
  };
  const temas = temasMap[vestKey] || [];
  const temasSel = modo === 'simples' ? temas.slice(0, Math.ceil(temas.length / 2)) : temas;

  // Resolve cor do botão principal
  const btnBg = cfg.corNum === 'var(--accent2)' ? 'var(--accent)'
    : cfg.corNum === '#22c55e' ? '#22c55e'
    : cfg.corNum === 'var(--amber)' ? 'var(--amber)'
    : cfg.corNum === 'var(--gold)'  ? 'var(--gold)'
    : 'var(--red)';

  container.innerHTML = `
    <div class="pratica-cartao" style="--fundo-cartao:${cfg.cor};border-color:${cfg.corBorda}">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="font-size:32px">${cfg.emoji}</div>
        <div>
          <div style="font-size:16px;font-weight:800;color:${cfg.corNum}">${cfg.label}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">${modeIcon} Modo ${modoLabel} • ${qs} questões • ${horasStr}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${cfg.corNum}">${qs}</div>
          <div style="font-size:10px;color:var(--text2)">Questões</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${cfg.corNum}">${horasStr}</div>
          <div style="font-size:10px;color:var(--text2)">Tempo</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${cfg.corNum}">${modo === 'simples' ? 'Médio' : 'Alto'}</div>
          <div style="font-size:10px;color:var(--text2)">Nível</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text2);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Conteúdos abordados</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px">
        ${temasSel.map(t => `<span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--text2);font-weight:600">${t}</span>`).join('')}
      </div>
      ${simCartaoNotas('simples', vestKey)}
      <button type="button" class="pratica-acao" onclick="iniciarSimuladoNovo('${vestKey}','${modo}')" style="
        width:100%;padding:15px;border-radius:12px;border:none;
        background:${btnBg};color:#fff;font-family:var(--font);font-size:15px;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px">
        ${modeIcon} Iniciar Simulado ${modoLabel}
      </button>
      <button type="button" class="pratica-acao" onclick="voltarParaModos()" style="
        width:100%;padding:11px;margin-top:8px;border-radius:12px;border:1px solid var(--border);
        background:transparent;color:var(--text2);font-family:var(--font);font-size:13px;cursor:pointer">
        ← Trocar vestibular
      </button>
    </div>`;
  simAtualizarNotas();
}

function voltarParaModos() {
  const container = document.getElementById('sim-cards-container');
  if (container) container.innerHTML = '';
  if (simModoAtual) simModoAba(simModoAtual);
}

function iniciarSimuladoNovo(vestKey, modo) {
  try {
    const cfg = simConfig[vestKey];
    if (!cfg) {
      console.error('[VoaAM] Vestibular desconhecido:', vestKey);
      if (typeof showXPToast === 'function') showXPToast('Vestibular inválido. Escolha novamente.');
      return;
    }

    const quantidadeSolicitada = modo === 'simples' ? Math.ceil(cfg.qs / 2) : cfg.qs;
    const minutos = modo === 'simples' ? Math.ceil(cfg.horas * 60 / 2) : cfg.horas * 60;
    const vestMap = { ENEM: 'ENEM', MACRO: 'MACRO', PSC1: 'PSC', PSC2: 'PSC', PSC3: 'PSC', SIS1: 'SIS', SIS2: 'SIS', SIS3: 'SIS' };
    const etapaMap = { PSC1: 1, PSC2: 2, PSC3: 3, SIS1: 1, SIS2: 2, SIS3: 3 };
    const vestNome = vestMap[vestKey];
    const etapa = etapaMap[vestKey];

    const banco = window.VOAAM_BANCO || (typeof bancoDB !== 'undefined' ? bancoDB : null);
    if (!Array.isArray(banco)) {
      console.error('[VoaAM] Banco de questões não foi carregado.');
      if (typeof showXPToast === 'function') showXPToast('O banco de questões não carregou. Atualize a página.');
      return;
    }

    let pool = banco.filter(q => q && q.vest === vestNome && Array.isArray(q.opcoes) && q.opcoes.length > 1);
    if (etapa) pool = pool.filter(q => !q.etapa || Number(q.etapa) === etapa);
    // O gabarito não é mais publicado: filtra apenas conteúdo acessível.
    pool = pool.filter(q => String(q.enunciado || '').trim().length > 0 && q.opcoes.every(o=>String(o||'').trim()));

    const selecionadas = embaralhar(pool).slice(0, quantidadeSolicitada);
    if (!selecionadas.length) {
      console.warn('[VoaAM] Nenhuma questão disponível para o simulado:', { vestKey, vestNome, etapa, banco: banco.length });
      if (typeof showXPToast === 'function') showXPToast('Não há questões cadastradas para este simulado.');
      return;
    }

    const questoes = selecionadas.map(q => ({
      q: q.enunciado,
      opts: q.opcoes,
      correct: null,
      explanation: "",
      materia: q.materia,
      id: q.id
    }));
    const modoLabel = modo === 'simples' ? 'Simples' : 'Completo';
    const descricao = `${modo === 'simples' ? '⚡' : '🏆'} Simulado ${modoLabel} • ${questoes.length} questões • ${minutos >= 60 ? (minutos / 60).toFixed(1).replace('.0', '') + 'h' : minutos + 'min'} cronometrado`;

    if (typeof window.voaAMAbrirSimulado !== 'function') {
      console.error('[VoaAM] O módulo de aula não expôs voaAMAbrirSimulado.');
      if (typeof showXPToast === 'function') showXPToast('O módulo do simulado não carregou. Atualize a página.');
      return;
    }
    window.voaAMAbrirSimulado({
      title: `${cfg.label} — Simulado ${modoLabel}`,
      desc: descricao,
      video: null,
      chaveSimulado: vestKey,
      questions: questoes
    }, minutos * 60);
  } catch (erro) {
    console.error('[VoaAM] Falha ao iniciar simulado:', erro);
    if (typeof showXPToast === 'function') showXPToast('O simulado não pôde ser iniciado. Veja o Console para detalhes.');
  }
}

function pratAba(aba, filtrosTreino) {
  pratAbaAtual = aba;
  const btnSim = document.getElementById('pratab-sim');
  const btnEx = document.getElementById('pratab-ex');
  const panelSim = document.getElementById('prat-sim-panel');
  const panelEx = document.getElementById('prat-ex-panel');
  const panelCustom = document.getElementById('prat-custom-panel');
  const btnCustom = document.getElementById('pratab-custom');
  if (!btnSim) return;

  const isSim = aba === 'sim';
  const isCustom = aba === 'personalizado';
  if (panelCustom) panelCustom.style.display = isCustom ? 'block' : 'none';
  [[btnSim, isSim], [btnCustom, isCustom], [btnEx, aba === 'ex']].forEach(([botao, ativo]) => {
    botao?.classList.toggle('active', ativo);
    botao?.setAttribute('aria-pressed', String(ativo));
  });
  if (panelSim) panelSim.style.display = isSim ? 'block' : 'none';
  if (panelEx)  panelEx.style.display  = aba === 'ex' ? 'block' : 'none';

  if (isCustom) {
    return treinoCarregarFiltros(filtrosTreino);
  }
  if (isSim) {
    simModoAba('simples');
  } else {
    // Reset exercise sub-panels — always show Assuntos first
    exAssuntoAtual = null;
    exNivelAtual   = null;
    const assPanel   = document.getElementById('ex-assuntos-panel');
    const nivelPanel = document.getElementById('ex-nivel-panel');
    const questPanel = document.getElementById('ex-questoes-panel');
    if (assPanel)   assPanel.style.display   = 'block';
    if (nivelPanel) nivelPanel.style.display  = 'none';
    if (questPanel) questPanel.style.display  = 'none';
    renderListaEx();
  }
}

function simVestAba(vest, el) {
  simVestAtual = vest;
  document.querySelectorAll('#sim-vest-tabs .sim-vest-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSimCards();
}

function renderSimCards() {
  const container = document.getElementById('sim-cards-container');
  if (!container) return;
  const lista = catalogoSimulados[simVestAtual] || [];
  container.innerHTML = lista.map((s, idx) => {
    const pool = bancoDB.filter(s.filtro);
    const n = pool.length;
    const disponivel = n >= s.qs;
    const dificLabel = idx === 0 ? '🟢 Fácil' : idx === 1 ? '🟡 Médio' : idx === 2 ? '🟠 Difícil' : '🔴 Completo';
    return `<div class="sim-card" onclick="${disponivel ? `iniciarSimuladoCatalogo('${s.id}')` : "showXPToast('⚠️ Poucas questões para este simulado')"}"
      style="border-color:${s.corBorda};${!disponivel?'opacity:0.6':''}">
      <div class="sim-card-header">
        <div class="sim-card-num" style="background:${s.cor};color:${s.corNum}">${s.emoji}</div>
        <div>
          <div class="sim-card-title">${s.titulo}</div>
          <div class="sim-card-sub">${s.sub}</div>
        </div>
        <div style="margin-left:auto;color:var(--text2);font-size:20px">›</div>
      </div>
      <div class="sim-card-tags">
        ${s.tags.map(t=>`<span class="sim-tag" style="background:${t.c};color:${t.tc}">${t.txt}</span>`).join('')}
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">⏱️ ${s.tempo}min</span>
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">${s.qs} questões</span>
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">${dificLabel}</span>
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">📚 ${n} no banco</span>
      </div>
    </div>`;
  }).join('');
}

function iniciarSimuladoCatalogo(id) {
  const vest = simVestAtual;
  const sim = (catalogoSimulados[vest]||[]).find(s => s.id === id);
  if (!sim) return;
  const pool = bancoDB.filter(sim.filtro);
  if (pool.length < 1) { showXPToast('⚠️ Sem questões disponíveis'); return; }
  const qs = embaralhar(pool).slice(0, sim.qs).map(q => ({
    q: q.enunciado, opts: q.opcoes, correct: null,
    explanation: "", materia: q.materia, id: q.id
  }));
  voaAMAbrirSimulado({
    title: `${vest} — ${sim.titulo}`,
    desc: `Simulado cronometrado. ${sim.tempo} minutos. ${sim.sub}.`,
    questions: qs,
  }, sim.tempo * 60);
}

// Manter compatibilidade com chamadas antigas
function abrirModalSimulado() { goTo('praticar'); pratAba('sim'); }
function fecharModalSimulado() {}



// Abre os simulados disponíveis ao clicar no cartão do vestibular na página inicial.
// Não usa a rota antiga 'vestibulares', que não existe nesta SPA.
function abrirVestibularDoInicio(vestibular) {
  const codigo = String(vestibular || 'ENEM').trim().toUpperCase();
  const grupos = {
    ENEM: 'ENEM',
    MACRO: 'MACRO',
    PSC: 'PSC1',
    PSC1: 'PSC1',
    PSC2: 'PSC2',
    PSC3: 'PSC3',
    SIS: 'SIS1',
    SIS1: 'SIS1',
    SIS2: 'SIS2',
    SIS3: 'SIS3',
  };
  const grupo = grupos[codigo] || 'ENEM';

  if (typeof goTo === 'function') goTo('praticar');
  if (typeof pratAba === 'function') pratAba('sim');
  if (typeof simModoAba === 'function') simModoAba('completo');

  if (typeof scMostrarAnos === 'function' && typeof SC_GRUPOS !== 'undefined' && SC_GRUPOS[grupo]) {
    scMostrarAnos(grupo);
  } else {
    console.error('[VoaAM] Não foi possível abrir as provas para:', grupo);
    if (typeof showXPToast === 'function') {
      showXPToast('Não foi possível abrir as provas. Atualize a página e tente novamente.');
    }
  }
}

window.iniciarSimuladoNovo = iniciarSimuladoNovo;
if (typeof abrirVestibularDoInicio === 'function') window.abrirVestibularDoInicio = abrirVestibularDoInicio;
