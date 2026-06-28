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

const template = document.getElementById("template-card");

async function carregarNoticias() {
    const res = await fetch('/noticias');
    const noticias = await res.json();

    const container = document.getElementById('containerNot');

    container.innerHTML = '';

    noticias.forEach(noticia => {

        const card = document.createElement('div');

        card.className = 'cardNoticia';

        card.innerHTML = `
            <img
                src="/uploads/${noticia.imagem}"
                class="fotoNoticia"
                alt="${noticia.titulo}"
            >

            <div class="tituloNoticia">
                ${noticia.titulo}
            </div>

            <div class="dataNoticia">
                ${new Date(noticia.data_publicacao)
                    .toLocaleDateString('pt-BR',
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }
                    )}
            </div>

            <div class="conteudoNoticia">
                ${noticia.conteudo}
            </div>
        `;

        container.appendChild(card);
    });
}

carregarNoticias();