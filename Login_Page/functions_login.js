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