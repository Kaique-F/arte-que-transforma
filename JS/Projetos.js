// ======================================================
// DADOS DOS PROJETOS
// ======================================================

export const projetos = [

    {
        nome: "Arte e Inclusão",
        descricao: "Projeto que utiliza a arte para promover inclusão social.",
        imagem: "https://www.noarcomunicacao.com/wp-content/uploads/2023/09/AF0A8053-756x478.jpg"
    },

    {
        nome: "Arte na Comunidade",
        descricao: "Oficinas de arte voltadas para crianças e adolescentes.",
        imagem: "https://noticias.unisanta.br/wp-content/uploads/2023/10/UNISANTA-4.jpg"
    },

    {
        nome: "Arte que Transforma",
        descricao: "Ações artísticas para incentivar a transformação social.",
        imagem: "https://media.gazetadopovo.com.br/sites/2/2022/06/11141234/instituto-incanto-projeto-arte-criancas-adolescentes-960x540.jpg"
    }

];


// ======================================================
// TEMPLATE DE CADA PROJETO
// ======================================================

export function criarProjeto(projeto) {

    return `
        <tr>

            <td>

                <img
                    src="${projeto.imagem}"
                    alt="Imagem do projeto ${projeto.nome}"
                >

                <span class="badge">
                    Projeto ativo
                </span>

            </td>

            <td>

                <h3>${projeto.nome}</h3>

                <p>
                    ${projeto.descricao}
                </p>

            </td>

        </tr>
    `;
}