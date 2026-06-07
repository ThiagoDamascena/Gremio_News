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

let cropper;

document.getElementById("imagem").addEventListener("change", function(e) {

    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const url = URL.createObjectURL(arquivo);

    const preview = document.getElementById("preview");

    preview.src = url;

    if (cropper) {
        cropper.destroy();
    }

    cropper = new Cropper(preview, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        dragMode: "move",
        autoCropArea: 0.7
    });

});

function cortarImagem() {
    document.getElementById("btnConfirmarCorte").style.display = "block";
}

function confirmarCorte() {

    document.getElementById("btnConfirmarCorte").style.display = "none";

    const canvas = cropper.getCroppedCanvas({
        width: 1200,
        height: 675
    });

    document.getElementById("preview").src =
        canvas.toDataURL("image/jpeg");

    cropper.destroy();
}
