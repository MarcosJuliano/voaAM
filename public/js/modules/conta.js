const contaEl = id => document.getElementById('acao-conta-' + id);
const contaDialogo = document.getElementById('acao-conta');
let contaAcao;
let contaMetodoGoogle = false;
let contaOcupada = false;
let contaAbertura = 0;
let contaConfirmacaoGoogle = null;

const contaTextos = {
  senha: ['Alterar ou definir senha', 'Confirme sua identidade. As outras sessões serão encerradas quando você salvar a nova senha.', 'Salvar senha'],
  vincular: ['Conectar Conta Google', 'Confirme a senha do voaAM e escolha a Conta Google que você quer usar para entrar.', 'Conectar'],
  desvincular: ['Desconectar Conta Google?', 'Você passará a entrar com o e-mail e a senha do voaAM. As outras sessões serão encerradas.', 'Desconectar'],
  excluir: ['Excluir conta voaAM?', 'A exclusão remove permanentemente seu perfil, progresso, notas, redações e posição no ranking.', 'Excluir minha conta'],
};

function renderContaPerfil() {
  if (!authConta) return;
  const google = authConta.google;
  const conectado = Boolean(google?.conectado);
  const disponivel = Boolean(authGoogleConfig?.google_configurado);
  document.getElementById('perfil-google-status').textContent = conectado
    ? 'Conta Google já conectada' + (google.email ? ' · ' + google.email : '.')
    : disponivel ? 'Conecte uma Conta Google para usá-la ao entrar.'
      : 'A conexão com o Google está indisponível no momento.';
  document.getElementById('perfil-google-conectar').hidden = conectado || !disponivel;
  document.getElementById('perfil-google-desconectar').hidden = !conectado;
  document.getElementById('perfil-excluir').disabled = false;
}

function abrirAcaoConta(acao) {
  if (!authConta || contaDialogo.open) return;
  contaAcao = acao;
  contaMetodoGoogle = acao === 'vincular';
  contaAbertura++;
  const [titulo, mensagem] = contaTextos[acao];
  contaEl('titulo').textContent = titulo;
  contaEl('mensagem').textContent = acao === 'desvincular'
    ? mensagem + ' E-mail de acesso: ' + authConta.email
    : mensagem;
  const destrutiva = acao === 'desvincular' || acao === 'excluir';
  contaEl('confirmar').classList.toggle('sc-dialog-danger', destrutiva);
  contaEl('confirmar').classList.toggle('sc-dialog-primary', !destrutiva);
  contaEl('form').reset();
  contaEl('erro').textContent = '';
  renderContaMetodo();
  contaDialogo.showModal();
  contaEl('cancelar').focus();
}

function renderContaMetodo() {
  contaConfirmacaoGoogle = null;
  const vincular = contaAcao === 'vincular';
  const desconectar = contaAcao === 'desvincular';
  const novaSenha = contaAcao === 'senha' || (desconectar && contaMetodoGoogle);
  const pedirSenha = vincular || !contaMetodoGoogle;
  contaEl('senha-atual').hidden = !pedirSenha;
  contaEl('senha').required = pedirSenha;
  contaEl('nova-senha').hidden = !novaSenha;
  contaEl('nova').required = novaSenha;
  contaEl('google').hidden = true;
  contaEl('google').replaceChildren();
  contaEl('confirmar').hidden = false;
  contaEl('confirmar').textContent = contaMetodoGoogle ? 'Abrir seletor do Google' : contaTextos[contaAcao][2];
  contaEl('alternar').hidden = vincular || !authConta.google?.conectado || !authGoogleConfig?.google_configurado;
  contaEl('alternar').textContent = contaMetodoGoogle ? 'Usar a senha do voaAM' : 'Confirmar com a Conta Google';
}

function contaLimparCache() {
  const uid = String(authConta.id);
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('voaam_red_rascunho_' + uid + ':') ||
        (key.startsWith('voaam_') && key.endsWith(':' + uid))) localStorage.removeItem(key);
  }
  authLimparSessaoLocal();
}

async function executarAcaoConta(dados) {
  contaOcupada = true;
  contaEl('cancelar').disabled = contaEl('confirmar').disabled = contaEl('alternar').disabled = true;
  contaEl('erro').textContent = '';
  try {
    const excluir = contaAcao === 'excluir';
    const vincular = contaAcao === 'vincular';
    if (contaAcao === 'senha') {
      await authRequisicao('/api/perfil/senha', {method: 'PUT', body: JSON.stringify(dados)});
      contaDialogo.close();
      document.getElementById('perfil-senha-status').textContent = 'Senha atualizada.';
      return;
    }
    const resultado = await authRequisicao(excluir ? '/api/perfil' : '/api/auth/google/vincular', {
      method: vincular ? 'POST' : 'DELETE',
      body: JSON.stringify(dados),
    });
    if (excluir) {
      contaLimparCache();
      location.reload();
      return;
    }
    authConta.google = vincular ? resultado.google : {conectado: false, email: null};
    if (!vincular) window.google?.accounts?.id?.disableAutoSelect?.();
    contaDialogo.close();
    renderContaPerfil();
    document.getElementById(vincular ? 'perfil-google-desconectar' : 'perfil-google-conectar').focus();
  } catch (erro) {
    contaEl('erro').textContent = erro.message;
    renderContaMetodo();
  } finally {
    contaOcupada = false;
    contaEl('cancelar').disabled = contaEl('confirmar').disabled = contaEl('alternar').disabled = false;
  }
}

contaEl('form').addEventListener('submit', async e => {
  e.preventDefault();
  if (contaOcupada) return;
  if (contaConfirmacaoGoogle) {
    await executarAcaoConta(contaConfirmacaoGoogle);
    return;
  }
  contaEl('erro').textContent = '';
  const dados = {senha: contaEl('senha').value};
  if (contaAcao === 'senha' || (contaAcao === 'desvincular' && contaMetodoGoogle)) {
    dados.nova_senha = contaEl('nova').value;
  }
  if (!contaMetodoGoogle) {
    await executarAcaoConta(dados);
    return;
  }

  const abertura = ++contaAbertura;
  contaEl('confirmar').disabled = contaEl('alternar').disabled = true;
  try {
    const google = await authPrepararGoogle(contaAcao === 'vincular' ? 'vinculo' : 'confirmacao', resposta => {
      if (!contaDialogo.open || abertura !== contaAbertura || contaOcupada) return;
      if (!resposta?.credential) {
        contaEl('erro').textContent = 'O Google não retornou uma confirmação. Tente novamente.';
        renderContaMetodo();
        return;
      }
      const credential = resposta.credential;
      if (contaAcao === 'vincular') {
        executarAcaoConta({...dados, credential});
        return;
      }
      contaConfirmacaoGoogle = {...dados, credential};
      contaEl('google').replaceChildren();
      contaEl('google').hidden = true;
      contaEl('confirmar').hidden = false;
      contaEl('confirmar').textContent = contaTextos[contaAcao][2];
      contaEl('senha-atual').hidden = contaEl('nova-senha').hidden = true;
      contaEl('senha').required = contaEl('nova').required = false;
      contaEl('cancelar').focus();
    });
    if (!contaDialogo.open || abertura !== contaAbertura) return;
    const slot = contaEl('google');
    slot.hidden = false;
    contaEl('confirmar').hidden = true;
    google.renderButton(slot, {
      size: 'large', width: Math.min(265, innerWidth - 88), text: 'continue_with', locale: 'pt-BR',
    });
    slot.scrollIntoView({block: 'nearest'});
  } catch (erro) {
    if (abertura === contaAbertura) contaEl('erro').textContent = erro.message;
  } finally {
    if (abertura === contaAbertura) contaEl('confirmar').disabled = contaEl('alternar').disabled = false;
  }
});

contaEl('alternar').onclick = () => {
  contaMetodoGoogle = !contaMetodoGoogle;
  contaAbertura++;
  contaEl('confirmar').disabled = false;
  contaEl('erro').textContent = '';
  renderContaMetodo();
};
contaEl('cancelar').onclick = () => contaDialogo.close();
contaDialogo.addEventListener('cancel', e => { if (contaOcupada) e.preventDefault(); });
contaDialogo.addEventListener('close', () => {
  contaAbertura++;
  contaConfirmacaoGoogle = null;
  contaEl('confirmar').disabled = contaEl('alternar').disabled = false;
  contaEl('form').reset();
  contaEl('google').replaceChildren();
});
renderContaPerfil();

function renderFotoPerfil() {
  const imagem = document.getElementById('perfil-foto');
  const temFoto = Boolean(authConta?.tem_foto);
  imagem.hidden = !temFoto;
  if (temFoto && !imagem.hasAttribute('src')) imagem.src = '/api/perfil/foto';
  if (!temFoto) imagem.removeAttribute('src');
  document.getElementById('perfil-foto-padrao').toggleAttribute('hidden', temFoto);
  document.getElementById('perfil-foto-remover').hidden = !temFoto;
}

const perfilFotoArquivo = document.getElementById('perfil-foto-arquivo');
const perfilFotoRemover = document.getElementById('perfil-foto-remover');
async function atualizarFotoPerfil(arquivo) {
  if (!authConta) return;
  const status = document.getElementById('perfil-foto-status');
  if (arquivo && arquivo.size > 950_000) {
    status.textContent = 'Escolha uma imagem de até 950 KB.';
    perfilFotoArquivo.value = '';
    return;
  }
  const corpo = new FormData();
  if (arquivo) corpo.append('foto', arquivo);
  perfilFotoArquivo.disabled = perfilFotoRemover.disabled = true;
  try {
    const resposta = await fetch('/api/perfil/foto', {
      method: arquivo ? 'PUT' : 'DELETE',
      body: arquivo ? corpo : undefined,
      credentials: 'same-origin',
    });
    if (!resposta.ok) {
      const dados = await resposta.json().catch(() => ({}));
      throw new Error(dados.message || 'Não foi possível atualizar sua foto.');
    }
    authConta.tem_foto = Boolean(arquivo);
    document.getElementById('perfil-foto').removeAttribute('src');
    renderFotoPerfil();
    status.textContent = arquivo ? 'Foto atualizada.' : 'Foto removida.';
  } catch (erro) {
    status.textContent = erro.message;
  } finally {
    perfilFotoArquivo.value = '';
    perfilFotoArquivo.disabled = perfilFotoRemover.disabled = false;
  }
}
perfilFotoArquivo.addEventListener('change', () => {
  const arquivo = perfilFotoArquivo.files[0];
  if (arquivo) atualizarFotoPerfil(arquivo);
});
perfilFotoRemover.addEventListener('click', () => atualizarFotoPerfil(null));
