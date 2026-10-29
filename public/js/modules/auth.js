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
    headers: { 'Content-Type': 'application/json', ...(opcoes && opcoes.headers || {}) },
  });
  let dados = {};
  try { dados = await resposta.json(); } catch (_) { /* resposta sem JSON */ }
  if (!resposta.ok) {
    throw new Error(dados.message || dados.resultado || 'Não foi possível concluir a operação.');
  }
  return dados;
}

function authGuardarPerfil(perfilRecebido, usuarioRecebido) {
  if (!perfilRecebido) return;
  perfil = perfilRecebido;
  localStorage.setItem('voaam_perfil', JSON.stringify(perfilRecebido));
  if (usuarioRecebido && usuarioRecebido.id != null) {
    const anterior=localStorage.getItem('voaam_usuario_id');
    const novo=String(usuarioRecebido.id);
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
  const wrapper = document.getElementById('auth-wrapper');
  if (wrapper) wrapper.style.display = 'none';
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

  const vests = authVestsSelecionados.length ? [...authVestsSelecionados] : ['SIS'];
  try {
    const dados = await authRequisicao('/api/cadastro', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha, serie, vests, dific: 'ambos' }),
    });
    authFinalizarLogin(dados);
  } catch (erro) {
    authMostrarErro('auth-cad-error', erro.message || 'Não foi possível criar a conta. Tente novamente.');
  }
}

async function authGoogleInit() {
  const slots=[...document.querySelectorAll('.google-login-slot, .google-vincular-slot')];
  if(!slots.length)return;
  try {
    const resposta=await fetch('/api/config-publica',{credentials:'same-origin'});
    if(!resposta.ok)throw new Error('Configuração do Google indisponível.');
    const config=await resposta.json();
    if(!config.google_configurado||!config.google_client_id){
      slots.forEach(s=>s.textContent=config.google_mensagem||'Configure um Client ID real do Google Cloud.');
      return;
    }
    if(!window.google?.accounts?.id){
      if(!window.voaGsiCarregando){
        window.voaGsiCarregando=new Promise((resolve,reject)=>{
          const script=document.createElement('script');
          script.src='https://accounts.google.com/gsi/client';
          script.async=true;script.defer=true;
          script.onload=resolve;
          script.onerror=()=>reject(new Error('Não foi possível carregar a biblioteca Google.'));
          document.head.appendChild(script);
        });
      }
      await window.voaGsiCarregando;
    }
    if(!window.google?.accounts?.id)throw new Error('SDK Google não está disponível.');
    // O GSI envia um ID token no callback; só o Flask verifica assinatura, audience e issuer.
    window.google.accounts.id.initialize({
      client_id:config.google_client_id,
      ux_mode:'popup',
      callback:async respostaGoogle=>{
        if(!respostaGoogle?.credential){
          authMostrarErro('auth-login-error','O Google não retornou uma credencial.');
          return;
        }
        const vinculando=document.getElementById('auth-wrapper')?.style.display==='none';
        try{
          await authRequisicao(vinculando?'/api/auth/google/vincular':'/api/auth/google',{
            method:'POST',body:JSON.stringify({credential:respostaGoogle.credential})
          });
          if(vinculando){
            if(typeof showXPToast==='function')showXPToast('Conta Google vinculada.');
          }else location.reload();
        }catch(erro){
          const id=document.getElementById('auth-cadastro')?.classList.contains('auth-active')
            ?'auth-cad-error':'auth-login-error';
          authMostrarErro(id,erro.message||'Não foi possível validar o login Google.');
          if(vinculando && typeof showXPToast==='function')showXPToast(erro.message);
        }
      }
    });
    for(const s of slots){
      s.replaceChildren();
      window.google.accounts.id.renderButton(s,{
        type:'standard',theme:'outline',size:'large',width:270,text:'signin_with',locale:'pt-BR'
      });
    }
  }catch(erro){
    console.warn('[voaAM] Google Identity Services:',erro);
    slots.forEach(s=>s.textContent='Não foi possível carregar o login Google. Use e-mail e senha.');
  }
}

async function authLogout() {
  try {
    await authRequisicao('/api/logout', { method: 'POST', body: '{}' });
    localStorage.removeItem('voaam_perfil');
    localStorage.removeItem('voaam_usuario_id');
    window.google?.accounts?.id?.disableAutoSelect?.();
    location.reload();
  } catch (erro) {
    console.warn('[VoaAM] Logout não confirmado no servidor:', erro);
    if(typeof showXPToast==='function') showXPToast('Não foi possível sair da conta. Tente novamente.');
    else alert('Não foi possível sair: '+erro.message);
  }
}

async function authInit() {
  const wrapper = document.getElementById('auth-wrapper');
  if (!wrapper) return;

  try {
    const resposta = await fetch('/api/me', { credentials: 'same-origin' });
    if (!resposta.ok) throw new Error('Servidor indisponível.');
    const dados = await resposta.json();

    if (dados.autenticado && dados.perfil) {
      authGuardarPerfil(dados.perfil, dados.usuario);
      wrapper.style.display = 'none';
      if (typeof registrarVisita === 'function') await registrarVisita();
      if (typeof atualizarProgresso === 'function') await atualizarProgresso();
      if (typeof atualizarNivel === 'function') atualizarNivel();
      if (typeof sincronizarVidas === 'function') await sincronizarVidas();
      if (typeof reiniciarProgressoTopicos === 'function') {
        reiniciarProgressoTopicos().catch(e => console.warn('[VoaAM] Não foi possível recarregar o progresso:', e));
      }
    } else {
      localStorage.removeItem('voaam_perfil');
      localStorage.removeItem('voaam_usuario_id');
      perfil = null;
      if (typeof reiniciarProgressoTopicos === 'function') {
        reiniciarProgressoTopicos().catch(e => console.warn('[VoaAM] Progresso:', e));
      }
      wrapper.style.display = window.innerWidth >= 768 ? 'flex' : 'block';
    }
  } catch (erro) {
    wrapper.style.display = window.innerWidth >= 768 ? 'flex' : 'block';
    authMostrarErro('auth-login-error', 'Não foi possível conectar ao servidor. Atualize a página ou verifique o Flask.');
    console.warn('[VoaAM] Falha ao consultar a sessão:', erro);
  } finally {
    // Renderiza após definir visibilidade da tela de autenticação.
    await authGoogleInit();
  }
}

authInit();
