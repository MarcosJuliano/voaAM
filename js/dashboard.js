// =====================================================
// VESTIBULARES
// =====================================================

const vestibulares = [

    {
        nome: "SIS",
        instituicao: "UEA",
        periodo: "Jul – Jan",
        categoria: "ESTRATÉGICO",
        classe: "sis"
    },

    {
        nome: "ENEM",
        instituicao: "MEC/INEP",
        periodo: "Nov",
        categoria: "NACIONAL",
        classe: "enem"
    }

];


// =====================================================
// LOCAL ONDE OS CARDS SERÃO INSERIDOS
// =====================================================

const vestibularGrid =
    document.getElementById("vestibularGrid");


// =====================================================
// CRIAÇÃO DOS CARDS
// =====================================================

vestibulares.forEach(vestibular => {

    const card = document.createElement("div");

    card.className =
        `vestibular-card ${vestibular.classe}`;


    card.innerHTML = `

        <div class="vestibular-content">

            <span class="badge">

                ${vestibular.categoria}

            </span>


            <h3>

                ${vestibular.nome}

            </h3>


            <p>

                ${vestibular.instituicao}

            </p>


            <div class="date">

                <i class="fa-regular fa-calendar"></i>

                ${vestibular.periodo}

            </div>

        </div>


        <!-- LOGO DO VOAAM -->

        <div class="vestibular-watermark">

            <img
                src="/img/logo.png"
                alt=""
            >

        </div>

    `;


    vestibularGrid.appendChild(card);

});