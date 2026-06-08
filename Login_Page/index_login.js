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
        "http://localhost:5000/register",

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

    const matricula =
        document.getElementById("admin-matricula").value

    const senha =
        document.getElementById("admin-senha").value

    const resposta = await fetch(
        "http://localhost:5000/admin-login",
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
            "admin",
            JSON.stringify(resultado.admin)
        )

        window.location.href =
            "../Admin_Page/main_admin.html"
    }
    else{

        alert(resultado.erro)
    }
})

// LOGIN ALUNO

document.getElementById("aluno-form-element").addEventListener("submit", async e => {

    e.preventDefault()

    const matricula =
        document.getElementById("aluno-matricula").value

    const senha =
        document.getElementById("aluno-senha").value

    const resposta = await fetch(
        "http://localhost:5000/login-form",
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
            "../Main_Page/main_inicio.html"
    }
    else{

        alert(resultado.erro)
    }
})