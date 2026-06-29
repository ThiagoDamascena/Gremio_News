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

async function carregarNoticia() {

  const id = window.location.pathname.split("/").pop();

  const res = await fetch(`/api/noticias/${id}`);
  const noticia = await res.json();

  document.getElementById("titulo").textContent =
    noticia.titulo

  document.getElementById("data_publicacao").textContent =
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

  document.getElementById("conteudo").textContent =
    noticia.conteudo

  document.getElementById("imagem").src =
    `/uploads/${noticia.imagem}`

  document.title = noticia.titulo

}

let noticias = [];

async function lastNews() {

    const idAtual = Number(
        window.location.pathname.split("/").pop()
    );

    const res = await fetch("/noticias");
    noticias = await res.json();

    const outrasNoticias =
        noticias.filter(
            noticia => noticia.id !== idAtual
        );

    const container =
        document.getElementById("lastNewsContainer");

    container.innerHTML = "";

    outrasNoticias.slice(0, 6).forEach(noticia => {

        const card = document.createElement("div");

        card.className = "lastNewsCard";

        card.innerHTML = `
            <img
                src="/uploads/${noticia.imagem}"
                class="lastNewsImg"
                alt="${noticia.titulo}"
            >

            <p class="lastNewsTitulo">
                ${noticia.titulo}
            </p>
        `;

        card.onclick = () => {
            window.location.href =
                `/noticias/${noticia.id}`;
        };

        container.appendChild(card);
    });
}

carregarNoticia();
lastNews();