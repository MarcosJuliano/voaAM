const form = document.querySelector("#esqueciSenhaForm");

const novaSenha = document.querySelector("#novaSenha");
const confirmarNovaSenha = document.querySelector("#confirmarNovaSenha");

const toggleNovaSenha = document.querySelector("#toggleNovaSenha");
const toggleConfirmarNovaSenha = document.querySelector("#toggleConfirmarNovaSenha");

const mensagemSenha = document.querySelector("#mensagemSenha");


// MOSTRAR / OCULTAR SENHA
function configurarToggleSenha(botao, campo) {

    if (!botao || !campo) return;

    botao.addEventListener("click", function () {

        const mostrando = campo.type === "text";

        campo.type = mostrando ? "password" : "text";

        this.classList.toggle("fa-eye", !mostrando);
        this.classList.toggle("fa-eye-slash", mostrando);

    });
}


configurarToggleSenha(toggleNovaSenha, novaSenha);

configurarToggleSenha(
    toggleConfirmarNovaSenha,
    confirmarNovaSenha
);


// VERIFICAR SENHAS
form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Limpa mensagem anterior
    mensagemSenha.style.display = "none";
    mensagemSenha.textContent = "";

    // Verifica se as senhas são diferentes
    if (novaSenha.value !== confirmarNovaSenha.value) {

        mensagemSenha.textContent =
            "As senhas não coincidem. Por favor, repita a confirmação.";

        mensagemSenha.style.display = "block";

        confirmarNovaSenha.value = "";

        confirmarNovaSenha.focus();

        return;
    }


    // Senhas iguais
    alert("Senha redefinida com sucesso!");

});