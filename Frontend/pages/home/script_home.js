async function carregarNoticias() {
    // BUSCA AS NOTÍCIAS NO SERVIDOR
    const resposta =
        await fetch(
            "http://localhost:3000/noticias"
        )

    const noticias =
        await resposta.json()

    // EXIBE A PRIMEIRA NOTÍCIA
    if(noticias[0]){

        document.querySelector(
            ".tituloNoticia1"
        ).textContent =
            noticias[0].titulo
        
        document.querySelector(
            ".dataNoticia1"
        ).textContent =
            new Date(
                noticias[0].data_publicacao
            ).toLocaleDateString(
            "pt-BR",
            {
            day: "numeric",
            month: "long",
            year: "numeric"
            }
            )

        document.querySelector(
            ".conteudoNoticia1"
        ).textContent =
            noticias[0].conteudo

        document.getElementById(
            "imgNoticia1"
        ).src =
            `http://localhost:3000/uploads/${noticias[0].imagem}`
    }

    // EXIBE A SEGUNDA NOTÍCIA
    if(noticias[1]){

        document.querySelector(
            ".tituloNoticia2"
        ).textContent =
            noticias[1].titulo

        document.querySelector(
            ".dataNoticia2"
        ).textContent =
            new Date(
                noticias[1].data_publicacao
            ).toLocaleDateString(
            "pt-BR",
            {
            day: "numeric",
            month: "long",
            year: "numeric"
            }
            )

        document.querySelector(
            ".conteudoNoticia2"
        ).textContent =
            noticias[1].conteudo

        document.getElementById(
            "imgNoticia2"
        ).src =
            `http://localhost:3000/uploads/${noticias[1].imagem}`
    }

    // EXIBE A TERCEIRA NOTÍCIA
    if(noticias[2]){

        document.querySelector(
            ".tituloNoticia3"
        ).textContent =
            noticias[2].titulo

        document.querySelector(
            ".dataNoticia3"
        ).textContent =
            new Date(
                noticias[2].data_publicacao
            ).toLocaleDateString(
            "pt-BR",
            {
            day: "numeric",
            month: "long",
            year: "numeric"
            }
            )

        document.querySelector(
            ".conteudoNoticia3"
        ).textContent =
            noticias[2].conteudo

        document.getElementById(
            "imgNoticia3"
        ).src =
            `http://localhost:3000/uploads/${noticias[2].imagem}`
    }
}

// EXECUTA A FUNÇÃO QUANDO A PÁGINA TERMINAR DE CARREGAR
document.addEventListener(
    "DOMContentLoaded",
    carregarNoticias
)