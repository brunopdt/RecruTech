const uri = "http://localhost:8081/vagas"
let textoHTML = '';


const redirecionar = async (codigo) => {
  try {
    const res = await fetch(`http://localhost:8081/remove-vaga/${codigo}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })

    if (res.status === 200) {
      alert('Vaga fechada com sucesso')
    }

  } catch (e) {
    console.error(e);
  }
}

const abrirDetalhes = async (codigo) => {
  window.location.href = `/detalhe-da-vaga?id=${codigo}`;
}

async function getItems() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const data = await fetch(uri, {
    method: "GET",
    headers: headers,
  }).then((response) => { return response.json() });

  console.log(data);

  const construirCorpoModal = (data) => {
    let dscStatus = data.dscStatus;
    let codigoVaga = data.codigoVaga;
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
                <button class="button" id="button-trash" onClick="redirecionar(${codigoVaga})">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>

              <div class="button_container">
                <button class="button" id="button-detalhe" onClick="abrirDetalhes(${codigoVaga})"'>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="line">
      </div>`
      ;

    return textoHTML
  }

  data.forEach((vaga) => {
    const divVaga = document.getElementById("container_vagas");
    divVaga.innerHTML = construirCorpoModal(vaga);
  })
}

