const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");

let btn = document.querySelector('#lista-curriculos');

axios.get(`http://localhost:8081/detalheVagas?codVaga=${idDaVaga}`)
    .then(response => {
        if (response.status === 200) {
            const divTitulo = document.getElementById("main_title");
            divTitulo.innerHTML = `${response.data[0].tituloVaga}`;
        }
    })
    .catch(erro => {
        alert("Erro ao obter título da vaga");
    });

btn.addEventListener('click', () => {
    window.location.href = `/lista-curriculos?id=${idDaVaga}`
})