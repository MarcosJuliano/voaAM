// js/modules/nav.js
// Navegação entre telas, renderPerfil, toggleTheme e inicialização

// ─── NAVIGATION ───
const SLOT_MAP = {
  home:              'slot-page-home',
  materia:           'slot-page-materia',
  praticar:          'slot-page-praticar',
  redacao:           'slot-page-redacao',
  perfil:            'slot-page-perfil',
  ranking:           'slot-page-ranking',
  'banco-de-provas': 'slot-page-banco-de-provas',
};

function goTo(screen, abaPratica = 'sim', filtrosTreino) {
  // Compatibilidade: a tela 'vestibulares' foi removida; abre os anos de prova no Praticar.
  if (screen === 'vestibulares') {
    if (typeof abrirVestibularDoInicio === 'function') abrirVestibularDoInicio('ENEM');
    return;
  }
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  document.getElementById('screen-' + screen)?.classList.add('active');
  const nav = document.getElementById('nav-' + screen);
  nav?.classList.add('active');
  nav?.setAttribute('aria-current', 'page');
  atualizarLuzNavegacao();
  if (document.getElementById('vidas-toggle')?.getAttribute('aria-expanded') === 'true') abrirInfoVidas();
  const slot = document.getElementById(SLOT_MAP[screen]);
  if (slot) slot.scrollTop = 0;
  if (screen === 'ranking') { carregarRanking(); carregarDesempenhoRanking(); }
  if (screen === 'materia')       renderTopics();
  if (screen === 'perfil')        renderPerfil();
  if (screen === 'praticar') return pratAba(abaPratica, filtrosTreino);
  if (screen === 'redacao') { redAba('temas'); redCarregarHistorico(); }
  if (screen === 'banco-de-provas') { if (typeof initBancoProvas === 'function') initBancoProvas(); }
}

const barraNavegacao = document.querySelector('.bottom-nav');
const luzNavegacao = barraNavegacao.querySelector('.nav-luz');

function atualizarLuzNavegacao() {
  const item = barraNavegacao.querySelector('.nav-btn.active');
  if (!item?.offsetWidth) {
    luzNavegacao.classList.remove('nav-luz-visivel');
    return;
  }
  luzNavegacao.style.setProperty('--nav-x', item.offsetLeft + 'px');
  luzNavegacao.style.setProperty('--nav-y', item.offsetTop + 'px');
  luzNavegacao.style.width = item.offsetWidth + 'px';
  luzNavegacao.style.height = item.offsetHeight + 'px';
  luzNavegacao.classList.add('nav-luz-visivel');
}

const observarNavegacao = new ResizeObserver(atualizarLuzNavegacao);
observarNavegacao.observe(barraNavegacao);
for (const item of barraNavegacao.querySelectorAll('.nav-btn')) observarNavegacao.observe(item);
atualizarLuzNavegacao();

// ─── MODAL SIMULADO (compatibilidade) ───
// já redefinido acima no bloco PRATICAR — ABAS

// ─── PERFIL ───
function renderPerfil() {
  if (!perfil || formularioPerfil.inert) return;
  renderContaPerfil();
  document.getElementById('editar-nome').value = perfil.nome || '';
  document.getElementById('editar-serie').value = String(perfil.serie || 1);
  const opcoesBanner = formularioPerfil.elements['editar-banner'];
  opcoesBanner.value = perfil.banner || 'oceano';
  if (!opcoesBanner.value) opcoesBanner.value = 'oceano';
  const foto = perfilImagens.find(item => item.tipo === 'foto');
  if (foto.pendente === undefined) {
    foto.status.textContent = authConta?.estado_foto === 'pendente'
      ? 'Foto salva. Aguardando aprovação para os demais estudantes.'
      : '';
  }
  const banner = perfilImagens.find(item => item.tipo === 'banner');
  formularioPerfil.elements['banner-modo'].value = banner.pendente === undefined
    ? perfil.banner_modo || 'padrao'
    : banner.pendente ? 'personalizado' : 'padrao';
  if (banner.pendente === undefined) {
    banner.status.textContent =
      perfil.banner_modo === 'personalizado' && authConta?.estado_banner === 'pendente'
        ? 'Banner salvo. Aguardando aprovação para os demais estudantes.'
        : '';
  }
  for (const item of document.querySelectorAll('input[name="editar-vest"]')) {
    item.checked = (perfil.vests || []).includes(item.value);
  }
  document.getElementById('editar-erro').textContent = '';
  document.getElementById('perfil-email').textContent = authConta?.email || '—';
  atualizarSalvarPerfil();
}

const formularioPerfil = document.getElementById('perfil-form');

function dadosEditadosPerfil() {
  const selecionados = new Set([...formularioPerfil.querySelectorAll('input[name="editar-vest"]:checked')].map(el => el.value));
  const ordem = [...(perfil?.vests || []), ...selecionados];
  return {
    banner: formularioPerfil.elements['editar-banner'].value,
    banner_modo: formularioPerfil.elements['banner-modo'].value,
    nome: document.getElementById('editar-nome').value.trim(),
    serie: Number(document.getElementById('editar-serie').value),
    vests: [...new Set(ordem)].filter(vest => selecionados.has(vest)),
  };
}

function perfilFoiAlterado(dados) {
  return Boolean(perfil && (
    dados.banner !== (perfil.banner || 'oceano') ||
    dados.banner_modo !== (perfil.banner_modo || 'padrao') ||
    dados.nome !== (perfil.nome || '').trim() ||
    dados.serie !== Number(perfil.serie || 1) ||
    dados.vests.join(',') !== (perfil.vests || []).join(',')
  ));
}

function atualizarSalvarPerfil() {
  const dados = dadosEditadosPerfil();
  renderImagensPerfil(dados.banner_modo, dados.banner);
  document.getElementById('editar-acoes').hidden =
    !perfilFoiAlterado(dados) && !imagensEditadasPerfil().length;
}

function imagensEditadasPerfil() {
  return perfilImagens.filter(item => item.pendente !== undefined);
}

formularioPerfil.addEventListener('input', atualizarSalvarPerfil);
formularioPerfil.addEventListener('change', atualizarSalvarPerfil);

async function salvarEdicaoPerfil(event) {
  event.preventDefault();
  const botao = document.getElementById('editar-salvar');
  const erro = document.getElementById('editar-erro');
  const dados = dadosEditadosPerfil();
  const imagens = imagensEditadasPerfil();
  if (formularioPerfil.inert || (!imagens.length && !perfilFoiAlterado(dados))) return;
  if (!dados.nome || !dados.vests.length) {
    erro.textContent = 'Informe seu nome e selecione pelo menos um vestibular.';
    return;
  }
  const banner = perfilImagens.find(item => item.tipo === 'banner');
  const temBanner = banner.pendente === undefined ? authConta?.tem_banner : Boolean(banner.pendente);
  if (dados.banner_modo === 'personalizado' && !temBanner) {
    erro.textContent = 'Escolha e ajuste uma imagem para o banner personalizado.';
    abrirEditorBanner();
    statusEditorBanner.textContent = erro.textContent;
    banner.input.focus();
    return;
  }
  botao.disabled = true;
  botao.textContent = 'Salvando alterações…';
  formularioPerfil.inert = true;
  erro.textContent = '';
  let salvo = false;
  try {
    let body = JSON.stringify(dados);
    if (imagens.length) {
      body = new FormData();
      body.append('dados', JSON.stringify(dados));
      for (const item of imagens) {
        if (item.pendente) body.append(item.tipo, item.pendente);
        else body.append(`remover_${item.tipo}`, '1');
      }
    }
    const data = await authRequisicao('/api/perfil', {method: 'PUT', body});
    const midiasSalvas = data.imagens_salvas || {};
    if (!data.ok || !data.perfil || !data.usuario || imagens.some(item => {
      const versao = midiasSalvas[item.tipo];
      return item.pendente ? typeof versao !== 'string' || !data.usuario[`tem_${item.tipo}`] : versao !== null;
    })) {
      throw new Error('O servidor não confirmou todas as alterações. Tente salvar novamente.');
    }
    authGuardarPerfil(data.perfil, data.usuario);
    for (const item of imagens) {
      item.status.textContent = 'Imagem removida.';
      if (item.pendente) {
        const nome = item.tipo === 'banner' ? 'Banner' : 'Foto';
        if (item.tipo === 'banner' && data.perfil.banner_modo === 'padrao') {
          item.status.textContent = 'Imagem personalizada guardada. O banner padrão está ativo.';
        } else if (data.usuario[`estado_${item.tipo}`] === 'pendente') {
          item.status.textContent = `${nome}: aguardando aprovação para os demais estudantes.`;
        } else {
          item.status.textContent = `${nome} no Ranking.`;
        }
      }
      editarImagemPerfil(item, undefined);
    }
    salvo = true;
    if (typeof showXPToast === 'function') showXPToast('Perfil atualizado com sucesso.');
  } catch (e) {
    erro.textContent = e.message;
  } finally {
    formularioPerfil.inert = false;
    atualizarSalvarPerfil();
    botao.disabled = false;
    botao.textContent = 'Salvar alterações';
    if (document.getElementById('screen-perfil').classList.contains('active')) {
      (salvo ? document.getElementById('editar-nome') : botao).focus({preventScroll: true});
    }
  }
}

// authLogout() definido em auth.js

// ─── THEME TOGGLE ───
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('voaam_theme', next);
}
(function() {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('voaam_theme') || 'dark');
})();

// ─── INIT ───
if (perfil) {
  aplicarPerfil();
}
renderTopics();


