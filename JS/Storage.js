// ======================================================
// SALVAR DADOS DA DOAÇÃO
// ======================================================

export function salvarDadosDoacao(dadosDoacao) {

    const dadosString =
        JSON.stringify(dadosDoacao);

    localStorage.setItem(
        "dadosDoacao",
        dadosString
    );
}


// ======================================================
// RECUPERAR DADOS DA DOAÇÃO
// ======================================================

export function restaurarDadosDoacao() {

    const dadosString =
        localStorage.getItem("dadosDoacao");


    if (!dadosString) {
        return null;
    }


    try {

        return JSON.parse(dadosString);

    } catch (erro) {

        console.error(
            "Não foi possível recuperar os dados salvos:",
            erro
        );

        return null;
    }
}