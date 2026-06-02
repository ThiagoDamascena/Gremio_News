const tituloNoticia1 = {
    titulo: "Notícia 1",
    conteudo: "Conteúdo da notícia 1"
};

window.tituloNoticia1 = tituloNoticia1;

function renderNoticia1() {
    const tituloEl = document.querySelector('.tituloNoticia1');
    const conteudoEl = document.querySelector('.conteudoNoticia1');

    if (tituloEl) {
        tituloEl.textContent = tituloNoticia1.titulo;
    }
    if (conteudoEl) {
        conteudoEl.textContent = tituloNoticia1.conteudo;
    }
}

window.renderNoticia1 = renderNoticia1;

document.addEventListener('DOMContentLoaded', renderNoticia1);
