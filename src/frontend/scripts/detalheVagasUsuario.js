const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");

let btn = document.querySelector('#btn-inscricao');

btn.addEventListener('click', () => {
    window.location.href = `/upload-curriculo?id=${idDaVaga}`;
})