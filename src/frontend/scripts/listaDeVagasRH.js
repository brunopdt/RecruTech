const uri = "http://localhost:8081/vagas"
let textoHTML = '';
let btn = document.querySelector('#detalhe');

btn.addEventListener('click', () => {
  alert("testee");
  window.location.href = '/src/frontend/views/DetalhesVag.html'
})

async function getItems() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const data = await fetch(uri, {
    method: "GET",
    headers: headers,
  }).then((response) => { return response.json() });

  console.log(data);

  Array.prototype.forEach.call(data, function (x, y) {
    console.log("nomeDoCampo: " + y + " valor: " + x.descricao);
    const divVaga = document.getElementById("container_vagas");
    // if para evitar repetição de linha undefined (RTA)
    if (x != undefined) {
      divVaga.innerHTML = contruirCorpoModal(x);
    }
  });

  function contruirCorpoModal(data) {
    let codigoStatus = data.codigoStatus;
    let dscStatus = data.dscStatus;
    let codigoVaga = data.codigoVaga;
    let descricao = data.descricao;
    let qtdVagas = data.qtdVagas;
    let requisitos = data.requisitos;
    let senioridade = data.senioridade;
    let tempoExperienciaVaga = data.tempoExperienciaVaga;
    let tituloVaga = data.tituloVaga;
    let localModalidade = data.localModalidade;

    textoHTML += `
      <div class="new-vaga">
        <div class="vaga">
          <div class="vaga-info">
            <div id="nome-vaga">${tituloVaga}</div>
            <div id="local-vaga">${localModalidade}</div>
            <div id="status-vaga">${dscStatus}</div>

            <div id="botoes">
              <div class="button_container">
                <button class="button" id="button-trash">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>

              <div class="button_container">
                <button class="button"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div id="line">
      </div>`
      ;

    return textoHTML
  }
}