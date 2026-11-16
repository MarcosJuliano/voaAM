const rankingEl = id => document.getElementById('ranking-' + id);
const rankingNumero = new Intl.NumberFormat('pt-BR');
let rankingPagina = 1;
let rankingPedido = 0;

async function carregarRanking(pagina = 1) {
  const pedido = ++rankingPedido;
  const status = rankingEl('status');
  const lista = rankingEl('lista');
  const posicao = rankingEl('posicao');
  rankingEl('paginacao').hidden = true;
  rankingEl('tentar').hidden = true;
  status.textContent = 'Carregando ranking…';
  posicao.hidden = true;
  lista.replaceChildren();
  try {
    const dados = await authRequisicao('/api/ranking?pagina=' + pagina);
    if (pedido !== rankingPedido) return;
    const totalPaginas = Math.ceil(dados.total / dados.por_pagina);
    if (totalPaginas && pagina > totalPaginas) {
      carregarRanking(totalPaginas);
      return;
    }
    rankingPagina = dados.pagina;
    if (dados.minha_posicao) {
      const {posicao: lugar, xp} = dados.minha_posicao;
      posicao.textContent = `Sua posição: ${lugar}º · ${rankingNumero.format(xp)} XP`;
      posicao.hidden = false;
    }
    if (dados.total === 0) {
      status.textContent = 'Nenhum estudante no ranking.';
      return;
    }
    status.textContent = `${rankingNumero.format(dados.total)} estudante${dados.total === 1 ? '' : 's'} · Página ${pagina} de ${totalPaginas}`;
    for (const aluno of dados.alunos) {
      const linha = document.createElement('li');
      linha.classList.toggle('ranking-voce', aluno.voce);
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
    const [dados, progresso, vidas] = await Promise.all([
      authRequisicao('/api/progresso/disciplinas'),
      authRequisicao('/api/progresso'),
      authRequisicao('/api/vidas'),
      atualizarNivel(),
    ]);
    if (pedido !== rankingDesempenhoPedido) return;
    const valores = {
      xp: rankingNumero.format(progresso.xp),
      acertos: progresso.questoes_respondidas
        ? Math.round(100 * progresso.acertos / progresso.questoes_respondidas) + '%' : '—',
      streak: progresso.sequencia_dias,
      respondidas: progresso.questoes_respondidas,
      corretas: progresso.acertos,
      aulas: progresso.aulas_concluidas,
      vidas: `${vidas.quantidade}/3`,
    };
    for (const [id, valor] of Object.entries(valores)) {
      document.getElementById('perfil-' + id).textContent = valor;
    }
    const redacoes = dados.redacoes;
    for (const [campo, valor] of Object.entries(redacoes)) {
      const nota = campo === 'media' || campo === 'maior' || campo === 'menor';
      rankingEl('redacao-' + campo).textContent = valor === null
        ? '—' : rankingNumero.format(valor) + (nota ? '/1.000' : '');
    }
    rankingRenderGraficos(dados);
    status.textContent = '';
  } catch {
    if (pedido === rankingDesempenhoPedido) {
      status.textContent = 'Não foi possível atualizar seu desempenho. Abra o Ranking novamente para tentar.';
    }
  }
}
