// =============================================================
// Login, cadastro e sessão via API Flask.
// O localStorage guarda apenas o perfil usado pela interface; nunca a senha.
// =============================================================

var authVestsSelecionados = [];

function authMostrarTela(tela) {
  document.querySelectorAll('.auth-screen').forEach(function (s) {
    s.classList.remove('auth-active');
  });
  const destino = document.getElementById('auth-' + tela);
  if (destino) destino.classList.add('auth-active');
  const wrapper = document.getElementById('auth-wrapper');
  if (wrapper) wrapper.scrollTop = 0;
}

function authTogglePwd(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  if (btn) btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

function authToggleVest(el, vest) {
  el.classList.toggle('vest-selected');
  const idx = authVestsSelecionados.indexOf(vest);
  if (idx > -1) authVestsSelecionados.splice(idx, 1);
  else authVestsSelecionados.push(vest);
}

function authMostrarErro(id, mensagem) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = mensagem;
  el.style.display = 'block';
}

function authOcultarErro(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

async function authRequisicao(url, opcoes) {
  const resposta = await fetch(url, {
    credentials: 'same-origin',
    ...opcoes,
    headers: {
      ...(opcoes?.body instanceof FormData ? {} : {'Content-Type': 'application/json'}),
      ...opcoes?.headers,
    },
  });
  let dados = {};
  try { dados = await resposta.json(); } catch (_) { /* resposta sem JSON */ }
  if (!resposta.ok) {
    const erro = new Error(dados.message || dados.resultado || 'Não foi possível concluir a operação.');
    erro.status = resposta.status;
    throw erro;
  }
  return dados;
}

function authGuardarPerfil(perfilRecebido, usuarioRecebido) {
  if (!perfilRecebido) return;
  if (usuarioRecebido) authConta = usuarioRecebido;
  perfil = perfilRecebido;
  localStorage.setItem('voaam_perfil', JSON.stringify(perfilRecebido));
  if (usuarioRecebido && usuarioRecebido.id != null) {
    const anterior=localStorage.getItem('voaam_usuario_id');
    const novo=String(usuarioRecebido.id);
    if (anterior === novo) {
      // Migra rascunhos antigos somente para a mesma conta confirmada na sessão.
      const prefixo = 'voaam_red_rascunho_';
      for (const chave of Object.keys(localStorage)) {
        if (!chave.startsWith(prefixo) || chave.includes(':')) continue;
        const destino = prefixo + novo + ':' + chave.slice(prefixo.length);
        if (localStorage.getItem(destino) === null) localStorage.setItem(destino, localStorage.getItem(chave));
        localStorage.removeItem(chave);
      }
    }
    localStorage.setItem('voaam_usuario_id', novo);
    if(anterior !== novo && typeof trocarStateUsuario === 'function') trocarStateUsuario();
  }
  if (typeof state !== 'undefined') {
    const chave = `voaam_serie:${localStorage.getItem('voaam_usuario_id') || 'local'}`;
    const salvo = Number(localStorage.getItem(chave));
    state.currentSerie = [1,2,3].includes(salvo) ? salvo : (perfilRecebido.serie <= 3 ? perfilRecebido.serie : 1);
    if (typeof renderTopics === 'function') renderTopics();
  }
  if (typeof aplicarPerfil === 'function') aplicarPerfil();
}

function authFinalizarLogin(dados) {
  authGuardarPerfil(dados.perfil, dados.usuario);
  location.reload();
}

async function authEntrar() {
  const email = document.getElementById('login-email')?.value.trim() || '';
  const senha = document.getElementById('login-senha')?.value || '';
  authOcultarErro('auth-login-error');
  if (!email || !senha) {
    authMostrarErro('auth-login-error', 'Informe seu e-mail e sua senha.');
    return;
  }

  try {
    const dados = await authRequisicao('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
    authFinalizarLogin(dados);
  } catch (erro) {
    authMostrarErro('auth-login-error', erro.message || 'Não foi possível entrar. Tente novamente.');
  }
}

async function authCadastrar() {
  const nome = document.getElementById('cad-nome')?.value.trim() || '';
  const email = document.getElementById('cad-email')?.value.trim() || '';
  const senha = document.getElementById('cad-senha')?.value || '';
  const confirmar = document.getElementById('cad-confirmar-senha')?.value || '';
  const serie = parseInt(document.getElementById('cad-serie')?.value, 10) || 0;
  authOcultarErro('auth-cad-error');

  const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!nome || !emailValido || senha.length < 6 || !serie) {
    const mensagem = email && !emailValido
      ? 'E-mail inválido.'
      : 'Preencha todos os campos. A senha deve ter pelo menos 6 caracteres.';
    authMostrarErro('auth-cad-error', mensagem);
    return;
  }

  if (senha !== confirmar) {
    authMostrarErro('auth-cad-error', 'As senhas não são iguais. Confira a confirmação.');
    return;
  }
  const vests = authVestsSelecionados.length ? [...authVestsSelecionados] : ['SIS'];
  try {
    const dados = await authRequisicao('/api/cadastro', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha, confirmar_senha: confirmar, serie, vests, dific: 'ambos' }),
    });
    authFinalizarLogin(dados);
  } catch (erro) {
    authMostrarErro('auth-cad-error', erro.message || 'Não foi possível criar a conta. Tente novamente.');
  }
}

let authConta = null;
let authGoogleConfig = null;
let authGoogleSDK = null;

async function authPrepararGoogle(finalidade, callback) {
  if (!authGoogleConfig?.google_configurado) throw new Error('Conexão com o Google indisponível no servidor.');
  if (!window.google?.accounts?.id) {
    authGoogleSDK ??= new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        reject(new Error('Não foi possível carregar a conexão com o Google.'));
      };
      document.head.append(script);
    }).catch(erro => { authGoogleSDK = null; throw erro; });
    await authGoogleSDK;
  }
  const {nonce} = await authRequisicao('/api/auth/google/desafio', {
    method: 'POST', body: JSON.stringify({finalidade}),
  });
  const google = window.google.accounts.id;
  google.initialize({
    client_id: authGoogleConfig.google_client_id,
    ux_mode: 'popup',
    nonce,
    callback,
  });
  return google;
}

async function authGoogleInit() {
  const slots = [...document.querySelectorAll('.google-login-slot')];
  try {
    authGoogleConfig = await authRequisicao('/api/config-publica');
    if (authConta) return;
    if (!authGoogleConfig.google_configurado) {
      slots.forEach(s => { s.textContent = 'Acesso com Google indisponível.'; });
      return;
    }
    const google = await authPrepararGoogle('acesso', async resposta => {
      const cadastrar = resposta?.state === 'cadastro';
      const erroId = cadastrar ? 'auth-cad-error' : 'auth-login-error';
      try {
        await authRequisicao('/api/auth/google', {
          method: 'POST',
          body: JSON.stringify({credential: resposta?.credential, cadastrar}),
        });
        location.reload();
      } catch (erro) {
        authMostrarErro(erroId, erro.message);
        authGoogleInit();
      }
    });
    for (const slot of slots) {
      const cadastro = Boolean(slot.closest('#auth-cadastro'));
      slot.replaceChildren();
      google.renderButton(slot, {
        size: 'large', width: Math.min(270, innerWidth - 56), locale: 'pt-BR',
        text: cadastro ? 'signup_with' : 'signin_with', state: cadastro ? 'cadastro' : 'login',
      });
    }
  } catch {
    slots.forEach(s => { s.textContent = 'Não foi possível carregar a conexão com o Google.'; });
  } finally {
    if (typeof renderContaPerfil === 'function') renderContaPerfil();
  }
}

function authLimparSessaoLocal() {
  localStorage.removeItem('voaam_perfil');
  localStorage.removeItem('voaam_usuario_id');
  localStorage.removeItem('voaam_ultima_atividade');
  window.google?.accounts?.id?.disableAutoSelect?.();
}

function authLogout() {
  confirmarAcao({
    titulo: 'Sair da conta?',
    mensagem: 'Você quer encerrar a sessão no voaAM?',
    acao: 'Sair',
    destrutiva: false,
    executar: async () => {
      await authRequisicao('/api/logout', {method: 'POST', body: '{}'});
      authDefinirVista(false);
      authLimparSessaoLocal();
      location.reload();
    },
  });
}

function authDefinirVista(autenticado) {
  const app = document.getElementById('app-wrapper');
  const login = document.getElementById('auth-wrapper');
  app.hidden = !autenticado;
  app.inert = !autenticado;
  login.hidden = autenticado;
}

async function authInit() {
  try {
    const resposta = await fetch('/api/me', { credentials: 'same-origin' });
    if (!resposta.ok) throw new Error('Servidor indisponível.');
    const dados = await resposta.json();

    if (dados.autenticado && dados.perfil) {
      authGuardarPerfil(dados.perfil, dados.usuario);
      authDefinirVista(true);
      if (dados.boas_vindas_google && typeof showXPToast === 'function') {
        showXPToast(dados.boas_vindas_google);
      }
      if (typeof iniciarPreferencias === 'function') iniciarPreferencias();
      if (typeof registrarVisita === 'function') await registrarVisita();
      if (typeof atualizarProgresso === 'function') await atualizarProgresso();
      if (typeof atualizarNivel === 'function') atualizarNivel();
      if (typeof sincronizarVidas === 'function') await sincronizarVidas();
      if (typeof reiniciarProgressoTopicos === 'function') {
        reiniciarProgressoTopicos().catch(e => console.warn('[VoaAM] Não foi possível recarregar o progresso:', e));
      }
    } else {
      authLimparSessaoLocal();
      perfil = null;
      if (typeof reiniciarProgressoTopicos === 'function') {
        reiniciarProgressoTopicos().catch(e => console.warn('[VoaAM] Progresso:', e));
      }
      authDefinirVista(false);
    }
  } catch (erro) {
    authDefinirVista(false);
    authMostrarErro('auth-login-error', 'Não foi possível conectar ao servidor. Atualize a página ou verifique o Flask.');
    console.warn('[VoaAM] Falha ao consultar a sessão:', erro);
  } finally {
    // Renderiza após definir visibilidade da tela de autenticação.
    await authGoogleInit();
  }
}
