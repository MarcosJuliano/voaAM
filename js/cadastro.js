const cadastroForm = document.querySelector("#cadastroForm");

const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");
const confirmarSenha = document.querySelector("#confirmarSenha");

const toggleSenha = document.querySelector("#toggleSenha");
const toggleConfirmarSenha = document.querySelector("#toggleConfirmarSenha");


function configurarToggleSenha(botao, campo) {

    if (!botao || !campo) return;

    botao.addEventListener("click", function () {

        const mostrando = campo.getAttribute("type") === "text";

        campo.setAttribute(
            "type",
            mostrando ? "password" : "text"
        );

        this.classList.toggle(
            "fa-eye",
            !mostrando
        );

        this.classList.toggle(
            "fa-eye-slash",
            mostrando
        );

    });
}


configurarToggleSenha(toggleSenha, senha);

configurarToggleSenha(
    toggleConfirmarSenha,
    confirmarSenha
);


// =========================================================
// CADASTRO
// =========================================================

cadastroForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Verificar se as senhas são iguais
    if (senha.value !== confirmarSenha.value) {

        alert("As senhas não são iguais.");

        confirmarSenha.focus();

        return;
    }


    // Dados que serão enviados para o Flask
    const dados = {

        nome: nome.value.trim(),

        email: email.value.trim(),

        senha: senha.value

    };


    try {

        const resposta = await fetch("/api/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)

        });


        const resultado = await resposta.json();


        // Se o Flask retornar algum erro
        if (!resposta.ok) {

            alert(
                resultado.message ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // Cadastro realizado
        alert("Cadastro realizado com sucesso!");


        // Voltar para o login
        window.location.href = "/";


    } catch (erro) {

        console.error("Erro no cadastro:", erro);

        alert(
            "Não foi possível conectar ao servidor."
        );

    }

});