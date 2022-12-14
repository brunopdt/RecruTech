const uri = 'https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/vagas'
let textoHTML = ''
let btn = document.querySelector('#detalhe')

const abrirDetalhes = async codigo => {
  window.location.href = `/detalhe-da-vaga-usuario?id=${codigo}`
}

async function getItems() {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const data = await fetch(uri, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json()
  })

  console.log(data)

  function construirCorpoModal(data) {
    let dscStatus = data.dscStatus
    let codigoVaga = data.codigoVaga
    let tituloVaga = data.tituloVaga
    let localModalidade = data.localModalidade

    textoHTML += `
      <div class="new-vaga">
        <div class="vaga">
          <div class="vaga-info">
            <div id="nome-vaga">${tituloVaga}</div>
            <div id="local-vaga">${localModalidade}</div>
            
            <div id="botoes">

              <div class="button_container">
                <button class="button" id="button-detalhes" onClick="abrirDetalhes(${codigoVaga})">
                  <i class="fa-solid fa-plus"></i> <span id="btn-text"> VER DETALHES </span>
                </button>
              </div>
              
            </div>
            </div>
          </div>
        <div id="line">
      </div>`

    return textoHTML
  }

  data.forEach(vaga => {
    if (vaga.codigoStatus == 3) {
    } else {
      const divVaga = document.getElementById('container_vagas')
      divVaga.innerHTML = construirCorpoModal(vaga)
    }
  })
}
