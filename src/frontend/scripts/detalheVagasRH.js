const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");
let btn = document.querySelector('#botao-acompanhar');

axios.get(`http://localhost:8081/detalheVagas?codVaga=${idDaVaga}`)
  .then(response => {
    if (response.status === 200) {
      const divVaga = document.getElementById("detalhesVaga");
      divVaga.innerHTML = construirCorpoModal(response.data[0]);
    }
  })
  .catch(erro => {
    alert("Erro ao obter detalhes vaga");
  });


const construirCorpoModal = (data) => {
  let tituloVaga = data.tituloVaga;
  let descricao = data.descricao;
  let localModalidade = data.localModalidade;

  textoHTML = `
  <div class="header-content">
  <div class="title" id="nome-vaga">${tituloVaga} - ${localModalidade}</div>

  <div class="subtitle">em <span id="empresa">Recrutech</span></div>

  <div class="subtitle">
    Teste
    <span id="teste-bool">
      <i class="fa-solid fa-circle-xmark"></i>
      <i class="fa-solid fa-circle-check"></i>
    </span>
  </div>

</div>

<div id="descricao">
  <p>
  ${descricao}
  </p>
</div>`;

  return textoHTML;
};

btn.addEventListener('click', () => {
  window.location.href = '/acompanhar-vaga-empresa'
})