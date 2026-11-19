const rankingEl = id => document.getElementById('ranking-' + id);
const rankingNumero = new Intl.NumberFormat('pt-BR');
let rankingPagina = 1;
let rankingPedido = 0;
let rankingMinhaPagina = 1;

async function carregarRanking(pagina = 1) {
  const pedido = ++rankingPedido;
  const status = rankingEl('status');
  const lista = rankingEl('lista');
  const posicao = rankingEl('posicao');
  rankingEl('paginacao').hidden = true;
  rankingEl('tentar').hidden = true;
  rankingEl('ir-minha-posicao').hidden = true;
  status.textContent = 'Carregando ranking…';
  posicao.hidden = true;
  lista.replaceChildren();
  try {
    const dados = await authRequisicao('/api/ranking?pagina=' + pagina);
    if (pedido !== rankingPedido) return;
    const totalPaginas = Math.ceil(dados.total / dados.por_pagina);
    if (totalPaginas && pagina > totalPaginas) {
      return carregarRanking(totalPaginas);
    }
    rankingPagina = dados.pagina;
    if (dados.minha_posicao) {
      const {posicao: lugar, xp, pagina: minhaPagina} = dados.minha_posicao;
      rankingMinhaPagina = minhaPagina;
      aplicarXpTotal(xp);
      posicao.textContent = `Sua posição: ${lugar}º · ${rankingNumero.format(xp)} XP`;
      posicao.hidden = false;
      rankingEl('ir-minha-posicao').hidden = false;
    }
    if (dados.total === 0) {
      status.textContent = 'Nenhum estudante no ranking.';
      return;
    }
    status.textContent = `${rankingNumero.format(dados.total)} estudante${dados.total === 1 ? '' : 's'} · Página ${pagina} de ${totalPaginas}`;
    for (const aluno of dados.alunos) {
      const linha = document.createElement('li');
      linha.classList.toggle('ranking-voce', aluno.voce);
      const abrirPerfil = () => rankingAbrirPerfil(aluno.id);
      linha.addEventListener('click', abrirPerfil);
      linha.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        abrirPerfil();
      });
      linha.tabIndex = 0;
      linha.setAttribute('role', 'button');
      linha.setAttribute('aria-label', `Ver perfil público de ${aluno.nome}`);
      const lugar = document.createElement('strong');
      lugar.textContent = aluno.posicao + 'º';
      const nome = rankingNo('span', 'ranking-nome');
      nome.textContent = aluno.voce ? aluno.nome + ' (você)' : aluno.nome;
      const xp = document.createElement('strong');
      xp.textContent = rankingNumero.format(aluno.xp) + ' XP';
      const avatar = rankingNo('span', 'ranking-foto', [...aluno.nome][0]?.toLocaleUpperCase('pt-BR') || '•');
      avatar.setAttribute('aria-hidden', 'true');
      if (aluno.foto_url) {
        const foto = new Image(34, 34);
        foto.alt = '';
        foto.loading = 'lazy';
        foto.decoding = 'async';
        foto.addEventListener('error', () => foto.remove(), {once: true});
        foto.src = aluno.foto_url;
        avatar.append(foto);
      }
      linha.append(lugar, avatar, nome, xp);
      lista.append(linha);
    }
    rankingEl('paginacao').hidden = totalPaginas <= 1;
    rankingEl('anterior').disabled = pagina <= 1;
    rankingEl('proxima').disabled = pagina >= totalPaginas;
  } catch (e) {
    if (pedido !== rankingPedido) return;
    status.textContent = 'Não foi possível carregar a classificação. ' + e.message;
    const retry = rankingEl('tentar');
    retry.hidden = false;
    retry.onclick = () => carregarRanking(pagina);
  }
}

rankingEl('anterior').addEventListener('click', () => carregarRanking(rankingPagina - 1));
rankingEl('proxima').addEventListener('click', () => carregarRanking(rankingPagina + 1));
rankingEl('ir-minha-posicao').addEventListener('click', async () => {
  const lista = rankingEl('lista');
  if (!lista.querySelector('.ranking-voce')) await carregarRanking(rankingMinhaPagina);
  const linha = lista.querySelector('.ranking-voce');
  if (!linha) return;
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
  linha.focus({preventScroll: true});
  linha.scrollIntoView({block: 'nearest', behavior});
});
const rankingDialogo = rankingEl('perfil-publico');
rankingEl('publico-fechar').onclick = () => rankingDialogo.close();
const rankingFotoPublica = rankingEl('publico-foto');
const rankingFotoPreview = rankingEl('publico-foto-preview');
const rankingBannerPublico = rankingEl('publico-banner-imagem');
const rankingBannerPreview = rankingEl('publico-banner');
let pedidoPerfilRanking = 0;
const rankingMidias = [
  {tipo: 'foto', imagem: rankingFotoPublica, rota: 'fotos', nome: 'Foto'},
  {tipo: 'banner', imagem: rankingBannerPublico, rota: 'banners', nome: 'Banner'},
].map(midia => {
  const el = nome => rankingEl(`publico-${midia.tipo}-${nome}`);
  const status = el('status');
  const moderacao = el('moderacao');
  const aprovar = el('aprovar');
  const rejeitar = el('rejeitar');
  midia.imagem.addEventListener('load', () => {
    if (!moderacao.hidden && midia.imagem.currentSrc === midia.imagem.src) {
      aprovar.disabled = rejeitar.disabled = false;
    }
  });
  midia.imagem.addEventListener('error', () => {
    midia.imagem.hidden = true;
    if (midia.tipo === 'foto') rankingFotoPreview.disabled = true;
    if (!moderacao.hidden) {
      moderacao.hidden = true;
      status.textContent = 'A imagem não carregou. Abra o perfil novamente para revisar.';
    }
  });
  return {...midia, status, moderacao, aprovar, rejeitar};
});

rankingFotoPreview.onclick = () => ampliarImagemPerfil('Foto do perfil', rankingFotoPublica.getAttribute('src'));

async function rankingAbrirPerfil(id) {
  const pedido = ++pedidoPerfilRanking;
  try {
    const dados = await authRequisicao(`/api/alunos/${id}/perfil-publico`);
    if (pedido !== pedidoPerfilRanking) return;
    rankingEl('publico-nome').textContent = dados.nome;
    rankingEl('publico-xp').textContent = rankingNumero.format(dados.xp) + ' XP';
    rankingEl('publico-tentativas').textContent = rankingNumero.format(dados.questoes);
    rankingEl('publico-acertos').textContent = rankingNumero.format(dados.acertos);
    rankingEl('publico-precisao').textContent = dados.questoes
      ? rankingNumero.format(Math.round(dados.acertos / dados.questoes * 100)) + '%' : '—';
    const destaque = dados.destaque;
    rankingEl('publico-destaque-linha').hidden = !destaque;
    if (destaque) {
      rankingEl('publico-destaque').textContent = destaque.nome;
      const precisao = rankingNumero.format(Math.round(100 * destaque.acertos / destaque.respondidas));
      rankingEl('publico-destaque-dados').textContent =
        `${precisao}% de acertos em ${rankingNumero.format(destaque.respondidas)} questões`;
    }
    const praticada = dados.mais_praticada;
    rankingEl('publico-praticada-linha').hidden = !praticada || praticada.nome === destaque?.nome;
    rankingEl('publico-praticada').textContent = praticada?.nome || '';
    rankingEl('publico-distintas').textContent = rankingNumero.format(dados.questoes_distintas ?? 0);
    const etapas = ['','1º ano','2º ano','3º ano','Ensino Médio completo'];
    const etapa = etapas[dados.serie] || '';
    const vests = (dados.vests || []).join(' · ');
    rankingEl('publico-etapa').textContent = etapa;
    rankingEl('publico-vests').textContent = vests;
    rankingEl('publico-etapa-linha').hidden = !etapa;
    rankingEl('publico-vests-linha').hidden = !vests;
    rankingEl('publico-estudo').hidden = !etapa && !vests;

    const temaPadrao = ['oceano','aurora','floresta','noite'].includes(dados.banner) ? dados.banner : 'oceano';
    const tema = dados.banner_url ? 'personalizado' : temaPadrao;
    rankingBannerPreview.className = 'ranking-publico-banner perfil-imagem-preview banner-' + tema;
    const editarMeuBanner = Number(authConta?.id) === Number(id) ? () => {
      rankingDialogo.close();
      goTo('perfil');
      abrirEditorBanner();
    } : undefined;
    rankingBannerPreview.onclick = () => ampliarImagemPerfil(
      'Banner do perfil', rankingBannerPublico.hidden ? null : rankingBannerPublico.getAttribute('src'),
      tema, editarMeuBanner,
    );
    for (const midia of rankingMidias) {
      const {tipo, imagem, status, moderacao, aprovar, rejeitar, nome} = midia;
      const revisao = dados[`${tipo}_revisao`];
      const url = dados[`${tipo}_url`];
      status.hidden = dados[`${tipo}_status`] !== 'pendente';
      status.textContent = revisao
        ? `${nome} em revisão. Aprove para publicar no Ranking.`
        : `${nome} pendente de aprovação para os demais estudantes.`;
      moderacao.hidden = !revisao;
      aprovar.disabled = rejeitar.disabled = true;
      aprovar.onclick = () => rankingModerarImagem(id, midia, revisao, 'aprovar');
      rejeitar.onclick = () => rankingModerarImagem(id, midia, revisao, 'rejeitar');
      imagem.hidden = !url;
      if (url) imagem.src = url;
      else imagem.removeAttribute('src');
      if (revisao && imagem.complete && imagem.naturalWidth && imagem.currentSrc === imagem.src) {
        aprovar.disabled = rejeitar.disabled = false;
      }
    }
    rankingFotoPreview.disabled = !dados.foto_url;
    if (!rankingDialogo.open) rankingDialogo.showModal();
  } catch (erro) {
    if (typeof showXPToast === 'function') showXPToast(erro.message);
  }
}

async function rankingModerarImagem(id, midia, versao, decisao) {
  const {aprovar, rejeitar, status, moderacao, rota, tipo, nome} = midia;
  if (!versao || aprovar.disabled) return;
  aprovar.disabled = rejeitar.disabled = true;
  const pedido = pedidoPerfilRanking;
  try {
    await authRequisicao(`/api/moderacao/${rota}/${id}`, {
      method: 'POST', body: JSON.stringify({decisao, versao}),
    });
    if (Number(authConta?.id) === Number(id)) {
      authConta[`tem_${tipo}`] = decisao === 'aprovar';
      authConta[`estado_${tipo}`] = decisao === 'aprovar' ? 'aprovada' : null;
      if (tipo === 'banner' && decisao === 'rejeitar' && perfil) {
        perfil.banner_modo = 'padrao';
      }
    }
    if (pedido !== pedidoPerfilRanking || !rankingDialogo.open) return;
    await rankingAbrirPerfil(id);
    if (typeof showXPToast === 'function') {
      showXPToast(decisao === 'aprovar' ? `${nome} no Ranking.` : 'Imagem rejeitada.');
    }
    carregarRanking(rankingPagina);
  } catch (erro) {
    if (pedido !== pedidoPerfilRanking) return;
    status.textContent = erro.message;
    if ([403, 404, 409].includes(erro.status)) moderacao.hidden = true;
    else aprovar.disabled = rejeitar.disabled = false;
  }
}

function rankingNo(tag, classe, texto) {
  const no = document.createElement(tag);
  if (classe) no.className = classe;
  if (texto !== undefined) no.textContent = texto;
  return no;
}

function rankingBarra(nome, legenda, segmentos) {
  const item = rankingNo('li', 'ranking-barra-item');
  item.append(rankingNo('strong', '', nome), rankingNo('span', '', legenda));
  const barra = rankingNo('div', 'ranking-barra');
  barra.setAttribute('aria-hidden', 'true');
  for (const [classe, proporcao] of segmentos) {
    const parte = rankingNo('span', classe);
    parte.style.width = proporcao + '%';
    barra.append(parte);
  }
  item.append(barra);
  return item;
}

function rankingRenderGraficos(dados) {
  const {disciplinas, revisao, ultima_atividade: ultima} = dados;
  const pct = (parte, total) => total ? 100 * parte / total : 0;
  const percentual = (parte, total) => rankingNumero.format(Math.round(pct(parte, total))) + '%';
  const afinidade = rankingEl('afinidade');
  const estudadas = disciplinas.filter(m => m.respondidas)
    .sort((a, b) => b.acertos / b.respondidas - a.acertos / a.respondidas || b.respondidas - a.respondidas);
  afinidade.replaceChildren(...estudadas.map(m => rankingBarra(
    m.nome, `${percentual(m.acertos, m.respondidas)} · ${m.acertos}/${m.respondidas} questões`,
    [['barra-acertos', pct(m.acertos, m.respondidas)]],
  )));
  if (!estudadas.length) afinidade.append(rankingNo('li', '', 'Responda a questões para ver sua afinidade.'));

  const estudar = rankingEl('estudar');
  const pendentes = disciplinas.filter(m => m.total > m.acertos)
    .sort((a, b) => (b.respondidas - b.acertos) - (a.respondidas - a.acertos));
  estudar.replaceChildren(...pendentes.map(m => {
    const erros = m.respondidas - m.acertos;
    const restantes = m.total - m.respondidas;
    return rankingBarra(
      m.nome, `${rankingNumero.format(erros)} para revisar · ${rankingNumero.format(restantes)} sem resposta`,
      [['barra-erros', pct(erros, m.total)], ['barra-pendentes', pct(restantes, m.total)]],
    );
  }));
  if (!pendentes.length) estudar.append(rankingNo('li', '', 'Nenhuma questão pendente no acervo.'));

  const total = disciplinas.reduce((n, m) => n + m.total, 0);
  const respondidas = disciplinas.reduce((n, m) => n + m.respondidas, 0);
  const acertos = disciplinas.reduce((n, m) => n + m.acertos, 0);
  rankingEl('anel').style.setProperty('--pct-acertos', pct(acertos, total) + '%');
  rankingEl('anel').style.setProperty('--pct-respondidas', pct(respondidas, total) + '%');
  rankingEl('percentual').textContent = percentual(acertos, total);
  rankingEl('legenda').replaceChildren(
    rankingNo('li', 'barra-acertos', `${rankingNumero.format(acertos)} com acerto (${percentual(acertos, total)})`),
    rankingNo('li', 'barra-erros', `${rankingNumero.format(respondidas - acertos)} para revisar`),
    rankingNo('li', 'barra-pendentes', `${rankingNumero.format(total - respondidas)} sem resposta`),
  );
  rankingEl('conhecimentos').hidden = total === 0;
  const dificuldades = document.getElementById('perfil-dificuldades');
  dificuldades.replaceChildren();
  for (const {nome, erros} of revisao) {
    const linha = rankingNo('div', 'perfil-recomendacao');
    linha.append(rankingNo('span', '', nome), rankingNo('strong', '', `${erros} erro${erros === 1 ? '' : 's'}`));
    dificuldades.append(linha);
  }
  if (!revisao.length) dificuldades.textContent = 'Nenhum assunto com erro na última tentativa.';
  document.getElementById('perfil-ultima-atividade').textContent = ultima
    ? ultima.slice(0, 10).split('-').reverse().join('/') : 'Sem visita registrada';
}

let rankingDesempenhoPedido = 0;
async function carregarDesempenhoRanking() {
  const pedido = ++rankingDesempenhoPedido;
  const status = rankingEl('desempenho-status');
  status.textContent = 'Carregando desempenho…';
  try {
    const progressoPedido = authRequisicao('/api/progresso', {cache: 'no-store'}).then(progresso => {
      if (pedido === rankingDesempenhoPedido) aplicarXpTotal(progresso.xp);
      return progresso;
    });
    const [disciplina, estatisticas, vidas, nivel] = await Promise.allSettled([
      authRequisicao('/api/progresso/disciplinas'),
      progressoPedido,
      authRequisicao('/api/vidas'),
      atualizarNivel(),
    ]);
    if (pedido !== rankingDesempenhoPedido) return;
    if (estatisticas.status === 'fulfilled') {
      const progresso = estatisticas.value;
      const valores = {
        xp: rankingNumero.format(progresso.xp),
        acertos: progresso.questoes_respondidas
          ? Math.round(100 * progresso.acertos / progresso.questoes_respondidas) + '%' : '—',
        streak: progresso.sequencia_dias,
        respondidas: progresso.questoes_respondidas,
        corretas: progresso.acertos,
        aulas: progresso.aulas_concluidas,
      };
      for (const [id, valor] of Object.entries(valores)) {
        document.getElementById('perfil-' + id).textContent = valor;
      }
    }
    if (vidas.status === 'fulfilled') document.getElementById('perfil-vidas').textContent = `${vidas.value.quantidade}/3`;
    if (disciplina.status === 'fulfilled') {
      const dados = disciplina.value;
      for (const [campo, valor] of Object.entries(dados.redacoes || {})) {
        const nota = campo === 'media' || campo === 'maior' || campo === 'menor';
        const el = rankingEl('redacao-' + campo);
        if (el) el.textContent = valor === null ? '—' : rankingNumero.format(valor) + (nota ? '/1.000' : '');
      }
      rankingRenderGraficos(dados);
    }
    const parcial = [disciplina, estatisticas, vidas, nivel].some(resultado => resultado.status === 'rejected');
    status.textContent = parcial ? 'Parte do desempenho está indisponível. Abra o Ranking para tentar novamente.' : '';
  } catch (erro) {
    console.warn('[VoaAM] Falha ao mostrar o desempenho:', erro);
    if (pedido === rankingDesempenhoPedido) {
      status.textContent = 'Não foi possível atualizar seu desempenho. Abra o Ranking novamente para tentar.';
    }
  }
}
