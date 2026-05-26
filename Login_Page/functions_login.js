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

const registerForm = document.querySelector("#register-form form")

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault()

    const data = {

        nome: document
        .getElementById("nome")
        .value,

        email: document
        .getElementById("email")
        .value,

        matricula: document
        .getElementById("matricula")
        .value,

        senha: document
        .getElementById("senha")
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

const form = document.querySelector("#register-form form")

form.addEventListener("submit", async (event) => {

    event.preventDefault()

    const inputs = form.querySelectorAll("input")

    const data = {

        name: document
        .getElementById("name")
        .value,

        email: document
        .getElementById("email")
        .value,

        matricula: document
        .getElementById("matricula")
        .value,

        senha: document
        .getElementById("senha")
        .value
    }

    try{

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

        alert(result.mensagem)

    }catch(error){

        console.log(error)
    }
})