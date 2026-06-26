// FUNÇÃO TROCA DE FORMA (LOGIN/REGISTRO/LOGIN-ADMIN)

function showForm(id){

    const forms = document.querySelectorAll(".form-box")

    forms.forEach(form => {
        form.classList.remove("active")
    })

    document
    .getElementById(id)
    .classList
    .add("active")
}

// REGISTRAR CONTA DO ALUNO

const registerForm = document.querySelector("#register-form form")

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault()

    const data = {

        nome: document
        .getElementById("aluno-nome")
        .value,

        email: document
        .getElementById("aluno-email")
        .value,

        matricula: document
        .getElementById("aluno-matricula")
        .value,

        senha: document
        .getElementById("aluno-senha")
        .value
    }

    console.log(data)

    const response = await fetch(
        "http://localhost:3000/register",

        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    console.log(result)

    alert(result.mensagem || result.erro)
})

// LOGIN ADMIN

document.getElementById("admin-form-element").addEventListener("submit", async e => {
    e.preventDefault()

    const matricula = document.getElementById("admin-matricula").value.trim()
    const senha = document.getElementById("admin-senha").value.trim()

    const response = await fetch("http://localhost:3000/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricula, senha })
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
        alert(data?.erro || "Erro no login")
        return
    }

    localStorage.setItem("admin", JSON.stringify(data.admin))
    window.location.href = "../admin/index_admin.html"
})

// LOGIN ALUNO

document.getElementById("aluno-form-element").addEventListener("submit", async e => {

    e.preventDefault()

    const matricula =
        document.getElementById("aluno-matricula").value

    const senha =
        document.getElementById("aluno-senha").value

    const resposta = await fetch(
        "http://localhost:3000/login-form",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                matricula,
                senha
            })
        }
    )

    const resultado = await resposta.json()
    

    if(resposta.ok){

        localStorage.setItem(
            "aluno",
            JSON.stringify(resultado.aluno)
        )

        window.location.href =
            "/pages/home/index_home.html"
    }
    else{

        alert(resultado.erro)
    }
})