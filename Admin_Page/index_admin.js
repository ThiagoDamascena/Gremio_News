// VERIFICAÇÃO DE LOGIN
const admin =
    JSON.parse(
        localStorage.getItem("admin")
    )

if(!admin){

    window.location.href =
        "../Login_Page/main_login.html"
}

// ADMIN LOGIN

app.post("/login-admin", (req, res) => {

    const { matricula, senha } = req.body;

    const sql = `
        SELECT *
        FROM administrador
        WHERE matricula = ?
    `;

    db.query(sql, [matricula], (err, result) => {

        if (err) {
            return res.status(500).json({
                erro: "Erro no servidor"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                erro: "Matrícula não encontrada"
            });
        }

        const admin = result[0];

        if (admin.senha !== senha) {
            return res.status(401).json({
                erro: "Senha incorreta"
            });
        }

        res.json({
            mensagem: "Login realizado",
            admin: {
                id: admin.id,
                nome: admin.nome,
                matricula: admin.matricula
            }
        });

    });
});

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

// PUBLICAR NOTÍCIA

async function publicarNoticia() {
    const titulo = document.querySelector('[name="titulo"]').value;
    const conteudo = document.querySelector('[name="conteudo"]').value;

    await fetch("/noticias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo,
            conteudo
        })
    });
}

function logoutAdmin() {
    localStorage.removeItem("admin")
    window.location.href = "../Login_Page/index_login.html"
}