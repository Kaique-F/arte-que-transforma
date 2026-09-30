// ======================================================
// STORAGE
// ======================================================

import {
    salvarDadosDoacao,
    restaurarDadosDoacao
} from "./storage.js";


// ======================================================
// APOIAR
// ======================================================

export function carregarApoiar() {

    const conteudo = document.getElementById("conteudo");


    conteudo.innerHTML = `

        <article>

            <h2>Cadastro para doação</h2>


            <div class="alert alert-info" role="status">

                <strong>Importante:</strong>
                Preencha os dados corretamente para continuar
                com sua doação.

            </div>


            <form>

                <fieldset>

                    <legend>Dados pessoais</legend>


                    <label for="nome">
                        Nome completo
                    </label>

                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                    >


                    <label for="cpf">
                        CPF
                    </label>

                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        required
                        pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"
                        inputmode="numeric"
                        maxlength="14"
                        title="Digite um CPF válido no formato XXX.XXX.XXX-XX"
                    >


                    <label for="cep">
                        CEP
                    </label>

                    <input
                        type="text"
                        id="cep"
                        name="cep"
                        required
                    >


                    <label for="endereco">
                        Endereço
                    </label>

                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        required
                    >


                    <label for="complemento">
                        Complemento
                    </label>

                    <input
                        type="text"
                        id="complemento"
                        name="complemento"
                    >


                    <label for="telefone">
                        Telefone
                    </label>

                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                    >


                    <label for="data">
                        Data
                    </label>

                    <input
                        type="date"
                        id="data"
                        name="data"
                        required
                    >

                </fieldset>


                <fieldset>

                    <legend>Dados da doação</legend>


                    <label for="valor">
                        Valor da doação
                    </label>

                    <input
                        type="number"
                        id="valor"
                        name="valor"
                        min="1"
                        required
                    >


                    <label for="forma">
                        Forma de pagamento
                    </label>

                    <select
                        id="forma"
                        name="forma"
                        required
                    >

                        <option value="">
                            Selecione
                        </option>

                        <option value="pix">
                            PIX
                        </option>

                        <option value="cartao">
                            Cartão
                        </option>

                        <option value="boleto">
                            Boleto
                        </option>

                    </select>

                </fieldset>


                <div class="alert alert-atencao" role="alert">

                    <strong>Atenção:</strong>
                    Confira seus dados antes de confirmar a doação.

                </div>


                <p>
                    <a href="termos.html">
                        Consulte os termos da doação.
                    </a>
                </p>


                <button type="submit">
                    Confirmar doação
                </button>

            </form>

        </article>
    `;


    // Recupera os dados salvos
    preencherDadosSalvos();
}


// ======================================================
// PREENCHER DADOS SALVOS
// ======================================================

function preencherDadosSalvos() {

    const dadosDoacao =
        restaurarDadosDoacao();


    // Se não houver dados salvos, não faz nada

    if (!dadosDoacao) {
        return;
    }


    // ==================================================
    // NOME
    // ==================================================

    document.getElementById("nome").value =
        dadosDoacao.nome || "";


    // ==================================================
    // CPF
    // ==================================================

    document.getElementById("cpf").value =
        dadosDoacao.cpf || "";


    // ==================================================
    // CEP
    // ==================================================

    document.getElementById("cep").value =
        dadosDoacao.cep || "";


    // ==================================================
    // ENDEREÇO
    // ==================================================

    document.getElementById("endereco").value =
        dadosDoacao.endereco || "";


    // ==================================================
    // COMPLEMENTO
    // ==================================================

    document.getElementById("complemento").value =
        dadosDoacao.complemento || "";


    // ==================================================
    // TELEFONE
    // ==================================================

    document.getElementById("telefone").value =
        dadosDoacao.telefone || "";


    // ==================================================
    // DATA
    // ==================================================

    document.getElementById("data").value =
        dadosDoacao.data || "";


    // ==================================================
    // VALOR
    // ==================================================

    const campoValor =
        document.getElementById("valor");


    if (campoValor) {

        campoValor.type = "text";

        campoValor.setAttribute(
            "inputmode",
            "numeric"
        );

        campoValor.value =
            dadosDoacao.valor || "";
    }


    // ==================================================
    // FORMA DE PAGAMENTO
    // ==================================================

    document.getElementById("forma").value =
        dadosDoacao.forma || "";


    console.log(
        "Dados recuperados do localStorage:",
        dadosDoacao
    );
}


// ======================================================
// MÁSCURAS DOS CAMPOS
// ======================================================

document.addEventListener("input", function(event) {

    const campo = event.target;


    // ==================================================
    // CPF
    // ==================================================

    if (campo.id === "cpf") {

        let valor =
            campo.value.replace(/\D/g, "");


        valor =
            valor.substring(0, 11);


        if (valor.length > 9) {

            valor = valor.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{0,2})$/,
                "$1.$2.$3-$4"
            );

        } else if (valor.length > 6) {

            valor = valor.replace(
                /^(\d{3})(\d{3})(\d{0,3})$/,
                "$1.$2.$3"
            );

        } else if (valor.length > 3) {

            valor = valor.replace(
                /^(\d{3})(\d{0,3})$/,
                "$1.$2"
            );
        }


        campo.value = valor;
    }


    // ==================================================
    // CEP
    // ==================================================

    if (campo.id === "cep") {

        let valor =
            campo.value.replace(/\D/g, "");


        valor =
            valor.substring(0, 8);


        if (valor.length > 5) {

            valor = valor.replace(
                /^(\d{5})(\d{0,3})$/,
                "$1-$2"
            );
        }


        campo.value = valor;
    }


    // ==================================================
    // TELEFONE
    // ==================================================

    if (campo.id === "telefone") {

        let valor =
            campo.value.replace(/\D/g, "");


        // Remove o código 55 caso seja digitado
        // ou colado pelo usuário.

        if (valor.startsWith("55")) {

            valor =
                valor.substring(2);
        }


        // DDD + 9 números

        valor =
            valor.substring(0, 11);


        // Código do Brasil fixo

        let telefone =
            "+55";


        // Adiciona o DDD

        if (valor.length > 0) {

            telefone +=
                " (" +
                valor.substring(0, 2);
        }


        // Fecha o DDD

        if (valor.length >= 2) {

            telefone +=
                ") ";
        }


        // Adiciona os 5 primeiros números

        if (valor.length > 2) {

            telefone +=
                valor.substring(2, 7);
        }


        // Adiciona os últimos 4 números

        if (valor.length >= 7) {

            telefone +=
                "-" +
                valor.substring(7, 11);
        }


        campo.value =
            telefone;
    }


    // ==================================================
    // DATA
    // ==================================================

    if (campo.id === "data") {

        const valor =
            campo.value;


        if (valor) {

            const partes =
                valor.split("-");


            if (partes[0].length > 4) {

                partes[0] =
                    partes[0].substring(0, 4);


                campo.value =
                    partes.join("-");
            }
        }
    }


    // ==================================================
    // VALOR DA DOAÇÃO
    // ==================================================

    if (campo.id === "valor") {

        let valor =
            campo.value.replace(/\D/g, "");


        if (valor === "") {

            campo.value = "";

            return;
        }


        // Limita o tamanho

        valor =
            valor.substring(0, 10);


        // Converte para número

        valor =
            parseInt(valor, 10);


        // Formata em moeda brasileira

        campo.value =
            "R$ " +
            valor.toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    }

});


// ======================================================
// CONFIGURAÇÃO DOS CAMPOS
// ======================================================

document.addEventListener(
    "focusin",
    function(event) {

        const campo =
            event.target;


        // ==================================================
        // CPF
        // ==================================================

        if (campo.id === "cpf") {

            campo.setAttribute(
                "maxlength",
                "14"
            );

            campo.setAttribute(
                "inputmode",
                "numeric"
            );

            campo.setAttribute(
                "pattern",
                "[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
            );

            campo.setAttribute(
                "title",
                "Digite um CPF válido no formato XXX.XXX.XXX-XX"
            );
        }


        // ==================================================
        // CEP
        // ==================================================

        if (campo.id === "cep") {

            campo.setAttribute(
                "maxlength",
                "9"
            );

            campo.setAttribute(
                "inputmode",
                "numeric"
            );

            campo.setAttribute(
                "pattern",
                "[0-9]{5}-[0-9]{3}"
            );

            campo.setAttribute(
                "title",
                "Digite um CEP válido no formato 12345-123"
            );
        }


        // ==================================================
        // TELEFONE
        // ==================================================

        if (campo.id === "telefone") {

            // +55 (11) 99999-9999
            // 19 caracteres

            if (campo.value === "") {

                campo.value =
                    "+55 ";
            }


            campo.setAttribute(
                "maxlength",
                "19"
            );

            campo.setAttribute(
                "inputmode",
                "numeric"
            );

            campo.setAttribute(
                "pattern",
                "\\+55 \\([0-9]{2}\\) [0-9]{5}-[0-9]{4}"
            );

            campo.setAttribute(
                "title",
                "Digite um telefone válido no formato +55 (11) 99999-9999"
            );
        }


        // ==================================================
        // DATA
        // ==================================================

        if (campo.id === "data") {

            campo.setAttribute(
                "max",
                "9999-12-31"
            );
        }


        // ==================================================
        // VALOR
        // ==================================================

        if (campo.id === "valor") {

            campo.type = "text";

            campo.setAttribute(
                "inputmode",
                "numeric"
            );

            campo.setAttribute(
                "minlength",
                "1"
            );
        }

    }
);


// ======================================================
// IMPEDIR CARACTERES NÃO NUMÉRICOS
// ======================================================

document.addEventListener(
    "keydown",
    function(event) {

        const camposNumericos = [
            "cpf",
            "cep",
            "telefone",
            "valor"
        ];


        if (
            !camposNumericos.includes(
                event.target.id
            )
        ) {
            return;
        }


        const teclasPermitidas = [

            "Backspace",
            "Delete",

            "ArrowLeft",
            "ArrowRight",

            "ArrowUp",
            "ArrowDown",

            "Tab",

            "Home",
            "End"
        ];


        if (
            teclasPermitidas.includes(
                event.key
            )
        ) {

            return;
        }


        // Permite Ctrl+C, Ctrl+V,
        // Ctrl+A etc.

        if (
            event.ctrlKey ||
            event.metaKey
        ) {

            return;
        }


        // Permite somente números

        if (
            !/^[0-9]$/.test(
                event.key
            )
        ) {

            event.preventDefault();
        }

    }
);


// ======================================================
// ENVIO DO FORMULÁRIO
// ======================================================

document.addEventListener(
    "submit",
    function(event) {

        const formulario =
            event.target;


        if (
            formulario.tagName !== "FORM"
        ) {

            return;
        }


        // Impede o comportamento padrão

        event.preventDefault();


        // ==================================================
        // COLETA OS DADOS
        // ==================================================

        const dadosDoacao = {

            nome:
                document.getElementById(
                    "nome"
                ).value,

            cpf:
                document.getElementById(
                    "cpf"
                ).value,

            cep:
                document.getElementById(
                    "cep"
                ).value,

            endereco:
                document.getElementById(
                    "endereco"
                ).value,

            complemento:
                document.getElementById(
                    "complemento"
                ).value,

            telefone:
                document.getElementById(
                    "telefone"
                ).value,

            data:
                document.getElementById(
                    "data"
                ).value,

            valor:
                document.getElementById(
                    "valor"
                ).value,

            forma:
                document.getElementById(
                    "forma"
                ).value

        };


        // ==================================================
        // SALVA USANDO O STORAGE.JS
        // ==================================================

        salvarDadosDoacao(
            dadosDoacao
        );


        console.log(
            "Dados salvos no localStorage:",
            dadosDoacao
        );


        alert(
            "Dados da doação foram salvos!"
        );

    }
);