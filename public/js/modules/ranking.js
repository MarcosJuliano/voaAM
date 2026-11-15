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
      const nome = document.createElement('span');
      nome.textContent = aluno.voce ? aluno.nome + ' (você)' : aluno.nome;
      const xp = document.createElement('strong');
      xp.textContent = rankingNumero.format(aluno.xp) + ' XP';
      linha.append(lugar, nome, xp);
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
