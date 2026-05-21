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

const form = document.querySelector("#register-form form")

form.addEventListener("submit", async (event) => {

    event.preventDefault()

    const inputs = form.querySelectorAll("input")

    const data = {

        nome: document
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

        alert(result.mensagem)

    }catch(error){

        console.log(error)
    }
})