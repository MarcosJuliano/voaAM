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

const editorBanner = document.getElementById('perfil-banner-editor');
const statusEditorBanner = document.getElementById('perfil-banner-editor-status');

function abrirEditorBanner() {
  if (editorBanner.open) return;
  statusEditorBanner.textContent = '';
  editorBanner.showModal();
}

document.getElementById('perfil-banner-alterar').addEventListener('click', () => abrirEditorBanner());
document.getElementById('perfil-banner-concluir').addEventListener('click', () => editorBanner.close());

const perfilImagens = ['foto', 'banner'].map(tipo => {
  const el = sufixo => document.getElementById(`perfil-${tipo}${sufixo}`);
  const item = {
    tipo, imagem: el(''), preview: el('-preview'), input: el('-arquivo'),
    remover: el('-remover'), desfazer: el('-desfazer'), status: el('-status'),
    pendente: undefined, urlLocal: '',
  };
  const statusPrevia = tipo === 'banner' ? statusEditorBanner : item.status;
  item.input.addEventListener('change', () => {
    const arquivo = item.input.files[0];
    if (!arquivo) return;
    const tipoAceito = arquivo.type ? ['image/jpeg', 'image/png', 'image/webp'].includes(arquivo.type)
      : /\.(jpe?g|png|webp)$/i.test(arquivo.name);
    if (arquivo.size > 950_000 || !tipoAceito) {
      statusPrevia.textContent = 'Escolha um JPEG, PNG ou WebP de até 950 KB.';
      item.input.value = '';
      return;
    }
    if (tipo === 'banner') {
      item.input.value = '';
      abrirRecorteBanner(arquivo, imagem => {
        formularioPerfil.elements['banner-modo'].value = 'personalizado';
        editarImagemPerfil(item, imagem);
        item.status.textContent = 'Use Salvar alterações para gravar o novo banner.';
        editorBanner.close();
      }, erro => { statusPrevia.textContent = erro; });
      return;
    }
    editarImagemPerfil(item, arquivo);
    item.status.textContent = 'Prévia da nova foto. Use Salvar alterações para gravar.';
  });
  item.remover.addEventListener('click', () => {
    if (tipo === 'banner') formularioPerfil.elements['banner-modo'].value = 'padrao';
    const temImagem = authConta?.[`tem_${tipo}`];
    editarImagemPerfil(item, temImagem ? null : undefined);
    item.status.textContent = temImagem ? 'Remoção pendente. Use Salvar alterações para confirmar.' : '';
    if (tipo === 'banner') editorBanner.close();
  });
  item.desfazer?.addEventListener('click', () => {
    editarImagemPerfil(item, undefined);
    item.status.textContent = statusPrevia.textContent = '';
  });
  item.preview.addEventListener('click', () => {
    const titulo = tipo === 'foto' ? 'Foto do perfil' : 'Banner do perfil';
    const dados = dadosEditadosPerfil();
    const tema = dados.banner_modo === 'personalizado' ? 'personalizado' : dados.banner;
    ampliarImagemPerfil(titulo, item.imagem.getAttribute('src'), tema,
      tipo === 'banner' ? abrirEditorBanner : undefined);
  });
  return item;
});

function editarImagemPerfil(item, arquivo) {
  if (item.urlLocal) URL.revokeObjectURL(item.urlLocal);
  item.pendente = arquivo;
  item.urlLocal = arquivo ? URL.createObjectURL(arquivo) : '';
  item.input.value = '';
  atualizarSalvarPerfil();
}

function renderImagensPerfil(modoBanner, temaBanner) {
  for (const item of perfilImagens) {
    const temImagem = authConta?.[`tem_${item.tipo}`];
    const token = authConta?.[`${item.tipo}_versao`];
    const versao = token ? `?v=${encodeURIComponent(token)}` : '';
    let src = item.pendente === undefined ? (temImagem ? `/api/perfil/${item.tipo}${versao}` : '') : item.urlLocal;
    if (item.tipo === 'banner' && modoBanner === 'padrao') src = '';
    if (item.tipo === 'banner') {
      const tema = modoBanner === 'personalizado' ? 'personalizado' : temaBanner;
      item.preview.className = 'ranking-publico-banner perfil-imagem-preview banner-' + tema;
      const previaEditor = document.getElementById('perfil-banner-editor-previa');
      previaEditor.className = 'ranking-publico-banner banner-' + tema;
      const imagemEditor = document.getElementById('perfil-banner-editor-imagem');
      renderImagemPerfil(imagemEditor, src);
    }
    renderImagemPerfil(item.imagem, src);
    item.remover.hidden = !temImagem || item.pendente === null ||
      (item.tipo === 'foto' && Boolean(item.pendente));
    if (item.desfazer) item.desfazer.hidden = !item.pendente;
    if (item.tipo === 'foto') {
      item.preview.disabled = !src;
      document.getElementById('perfil-foto-padrao').hidden = Boolean(src);
    }
  }
}

function renderImagemPerfil(imagem, src) {
  imagem.hidden = !src;
  if (src && imagem.getAttribute('src') !== src) imagem.src = src;
  if (!src) imagem.removeAttribute('src');
}
