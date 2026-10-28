document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".edit-button");
    const tabButtons = document.querySelectorAll(".tab-button");
    const personalSection = document.querySelector(".personal-section");
    const rankingCard = document.querySelector(".ranking-card");

    // ============================================================
    // EDITAR PERFIL
    // ============================================================
    if (editButton) {
        editButton.addEventListener("click", function () {
            alert("A edição do perfil será disponibilizada em breve.");
        });
    }

    // ============================================================
    // ABAS DO PERFIL
    // ============================================================
    tabButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            // Remove a classe active de todas as abas
            tabButtons.forEach(function (tab) {
                tab.classList.remove("active");
            });

            // Ativa a aba selecionada
            button.classList.add("active");

            // Identifica a aba selecionada
            const abaSelecionada = button.textContent.trim();
            console.log("Aba selecionada:", abaSelecionada);

            // ========================================================
            // DADOS PESSOAIS
            // ========================================================
            if (abaSelecionada === "Dados pessoais") {
                if (personalSection) {
                    personalSection.style.display = "grid";
                }
                if (rankingCard) {
                    rankingCard.style.display = "grid";
                }
            }

            // ========================================================
            // RANKING XP
            // ========================================================
            if (abaSelecionada === "Ranking XP") {
                if (rankingCard) {
                    rankingCard.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            }

            // ========================================================
            // PREFERÊNCIAS
            // ========================================================
            if (abaSelecionada === "Preferências") {
                alert("As preferências do aluno serão disponibilizadas em breve.");
            }
        });
    });
});