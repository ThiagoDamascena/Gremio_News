// POPUP NOTÍCIA

function abrirPopupNoticia(){
    document.getElementById("popupNoticia").style.display = "flex";
}

function fecharPopupNoticia(){
    document.getElementById("formNoticia").reset();

    const preview = document.getElementById("preview");
    preview.src = "";
    preview.style.display = "none";

    document.getElementById("popupNoticia").style.display = "none";
}

const imagem = document.getElementById("imagem");
const preview = document.getElementById("preview");

imagem.addEventListener("change", function() {
  const arquivo = this.files[0];

  if (arquivo) {
    preview.src = URL.createObjectURL(arquivo);
    preview.style.display = "block";
  }
});
