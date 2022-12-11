const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");

const preencherDivTituloVaga = () => {
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
}

const preencherDivTeste = (urlTeste) => {
  const divTeste = document.getElementById("download-teste");
  divTeste.innerHTML = `
    Download do teste:
    <a href=${urlTeste}>
      <i class="fa-solid fa-arrow-up-right-from-square"></i>    
    </a>
  `;
}

const obterUrlTeste = () => {
  axios.get(`http://localhost:8081/obter-teste?codVaga=${idDaVaga}`)
    .then(response => {
      if (response.status === 200) {
        preencherDivTeste(response.data[0].urlTeste);
      }
    })
    .catch(erro => {
      alert("Erro ao obter teste da vaga");
    });
}
preencherDivTituloVaga();
obterUrlTeste();

