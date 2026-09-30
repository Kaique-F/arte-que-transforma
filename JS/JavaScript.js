import { projetos, criarProjeto } from "./projetos.js";
import { carregarApoiar } from "./Formulário.js";

// ======================================================
// ELEMENTO PRINCIPAL DO DOM
// ======================================================

const conteudo = document.getElementById("conteudo");


// ======================================================
// HOME
// ======================================================

function carregarHome() {

conteudo.innerHTML = `
    <article>

        <h2>Bem-vindo à nossa Organização</h2>

        <p>
            O Arte que Transforma é uma iniciativa dedicada
            a promover a arte como uma ferramenta de transformação social.
        </p>

        <p>
            Nossa missão é promover a arte como ferramenta de
            transformação social. Acreditamos que a arte tem o poder
            de inspirar, educar e unir comunidades.
        </p>

        <p>
            Junte-se a nós em nossa jornada para criar um mundo
            mais inclusivo e acessível através da arte.
        </p>

        <img
            src="../Imagens/Imagem Arte Que Transforma.png"
            alt="Imagem de arte representando transformação social"
        >

    </article>
`;

}

// ======================================================
// PROJETOS
// ======================================================

function carregarProjetos() {

// Percorre os dados e cria os projetos automaticamente
const projetosHTML = projetos.map(function(projeto) {

    return criarProjeto(projeto);

}).join("");


// Insere os projetos gerados dentro do DOM
conteudo.innerHTML = `

    <article>

        <h2>Nossos projetos</h2>

        <div class="alert alert-info" role="status">

            <strong>Informação:</strong>
            Conheça nossos projetos de arte e transformação social.

        </div>


        <table>

            <thead>

                <tr>
                    <th>Projeto</th>
                    <th>Descrição</th>
                </tr>

            </thead>


            <tbody>

                ${projetosHTML}

            </tbody>

        </table>


        <div class="caixa-doacao">

            <h3>Apoie nossos projetos</h3>

            <p>
                Sua contribuição ajuda a manter nossas ações
                de transformação através da arte.
            </p>


            <div class="amounts">

                <button type="button">
                    R$ 10
                </button>

                <button type="button" class="active">
                    R$ 25
                </button>

                <button type="button">
                    R$ 50
                </button>

            </div>


            <label for="custom-amount">
                Outro valor
            </label>


            <input
                type="number"
                id="custom-amount"
                class="custom-amount"
                placeholder="Outro valor (R$)"
                min="1"
            >


            <p>
                <a href="Apoiar.html">
                    Apoiar Agora
                </a>
            </p>

        </div>

    </article>
`;

}


// ======================================================
// SPA — INTERCEPTAÇÃO DA NAVEGAÇÃO
// ======================================================

document.addEventListener("click", function(event) {

    // Identifica o link clicado
    const link = event.target.closest("a");

    // Se não for um link, não faz nada
    if (!link) {
        return;
    }


    // Obtém o endereço do link
    const destino = link.getAttribute("href");


    // ==================================================
    // HOME
    // ==================================================

    if (destino && destino.includes("index.html")) {

        event.preventDefault();

        console.log("O usuário escolheu Home!");

        carregarHome();

        return;
    }


    // ==================================================
    // PROJETOS
    // ==================================================

    if (destino && destino.includes("projetos.html")) {

        event.preventDefault();

        console.log("O usuário escolheu Projetos!");

        carregarProjetos();

        return;
    }


    // ==================================================
    // APOIAR
    // ==================================================

    if (destino && destino.includes("Apoiar.html")) {

        event.preventDefault();

        console.log("O usuário escolheu Apoiar!");

        carregarApoiar();

        return;
    }

});