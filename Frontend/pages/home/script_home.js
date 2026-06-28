let noticias = []
let indiceAtual = 0

async function carregarNoticias() {

    const resposta =
        await fetch(
            "http://localhost:3000/noticias"
        )

    noticias =
        await resposta.json()

    exibirNoticias()
}

function exibirNoticias(){

    for(let i = 0; i < 3; i++){

        const noticia = noticias[indiceAtual + i]

        if(!noticia) continue

        document.querySelector(
            `.tituloNoticia${i+1}`
        ).textContent =
            noticia.titulo

        document.querySelector(
            `.dataNoticia${i+1}`
        ).textContent =
            new Date(
                noticia.data_publicacao
            ).toLocaleDateString(
                "pt-BR",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            )

        document.querySelector(
            `.conteudoNoticia${i+1}`
        ).textContent =
            noticia.conteudo

        document.getElementById(
            `imgNoticia${i+1}`
        ).src =
            `http://localhost:3000/uploads/${noticia.imagem}`
    }
}

function avancarNoticia(){

    if(indiceAtual + 3 < noticias.length){

        indiceAtual++

        exibirNoticias()
    }
}

function voltarNoticia(){

    if(indiceAtual > 0){

        indiceAtual--

        exibirNoticias()
    }
}

const btnTopo = document.getElementById("btnTopo");

// mostra o botão quando rolar a página
window.onscroll = function () {
  if (document.documentElement.scrollTop > 300) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
};

// função para voltar ao topo
function voltarAoTopo() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function abrirSettings(){
    const popup = document.getElementById("popupSettings");
    popup.classList.add("open");
    document.body.classList.add("sidebar-open");
    document.getElementById("btnOpenSettings").style.display = "none";
}

function fecharSettings(){
    const popup = document.getElementById("popupSettings");
    popup.classList.remove("open");
    document.body.classList.remove("sidebar-open");
    document.getElementById("btnOpenSettings").style.display = "inline-flex";
}

function paginaLogin(){
    window.location.href = "/login"
}

// EXECUTA A FUNÇÃO QUANDO A PÁGINA TERMINAR DE CARREGAR
document.addEventListener(
    "DOMContentLoaded",
    carregarNoticias
)