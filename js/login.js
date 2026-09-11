document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailOrInscricao = document.getElementById('emailOrInscricao').value;
            const senha = document.getElementById('senha').value;
            const lembrar = document.getElementById('lembrar')?.checked || false;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ emailOrInscricao, senha, lembrar })
                });

                const data = await response.json();

                if (response.ok) {
                    // Redireciona para o painel ou página principal após o login bem-sucedido
                    window.location.href = data.redirectUrl || '/dashboard.html';
                } else {
                    alert(data.message || 'Erro ao realizar login. Verifique suas credenciais.');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro de conexão com o servidor. Tente novamente mais tarde.');
            }
        });
    }
});