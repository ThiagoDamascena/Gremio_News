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