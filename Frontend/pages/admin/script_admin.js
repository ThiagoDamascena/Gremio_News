// VERIFICAÇÃO DE LOGIN

const admin =
    JSON.parse(
        localStorage.getItem("admin")
    )

if(!admin){

    window.location.href =
        "../login/index_login.html"
}

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

// PREVIEW DE IMAGEM DE CAPA

const imagem = document.getElementById("imagem");
const preview = document.getElementById("preview");

imagem.addEventListener("change", function() {
  const arquivo = this.files[0];

  if (arquivo) {
    preview.src = URL.createObjectURL(arquivo);
    preview.style.display = "block";
  }
});

// CORTE DE IMAGEM DE CAPA

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

let imagemCortada

function confirmarCorte() {

    const canvas =
        cropper.getCroppedCanvas({
            width: 1200,
            height: 675
        })

    canvas.toBlob(blob => {

        imagemCortada = blob

    }, "image/jpeg")

    document.getElementById("preview").src =
        canvas.toDataURL()

    cropper.destroy()
    }

// PUBLICAR NOTÍCIA

async function publicarNoticia() {

    const titulo =
        document.querySelector(
            '[name="titulo"]'
        ).value

    const conteudo =
        document.querySelector(
            '[name="conteudo"]'
        ).value

    const imagem = imagemCortada

    const admin =
        JSON.parse(
            localStorage.getItem("admin")
        )

    const formData = new FormData()

    formData.append(
        "titulo",
        titulo
    )

    formData.append(
        "conteudo",
        conteudo
    )

    formData.append(
        "admin_id",
        admin.id
    )

    formData.append(
    "imagem",
    imagem,
    "capa.jpg"
    )

    const resposta =
        await fetch(
            "http://localhost:5000/noticias",
            {
                method: "POST",
                body: formData
            }
        )

    const dados =
        await resposta.json()

    alert(dados.mensagem)
}

function logoutAdmin() {
    localStorage.removeItem("admin")
    window.location.href = "../Login_Page/index_login.html"
}

