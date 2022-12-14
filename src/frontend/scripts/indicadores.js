const uri = "http://localhost:8081/indicadores"
const taxaMesUri = "/indicador-taxa-vagas"
const taxaUsuariosUri = "/indicador-taxa-usuarios"
const taxaCanceladosUri = "/indicador-taxa-vagas-canceladas"
const taxaContratacaoUri = "/indicador-contratados"

const abrirIndicador = async (codigo) => {
  window.location.href = `/indicadores`;
}

const taxaCrescimentoVaga = (data) => {
        const pTaxa = document.getElementById("vagasMensais");
        pTaxa.innerHTML = data+"%";
    };

async function getVagas() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
  
    const data = await fetch(taxaMesUri, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json()
    })

    taxaCrescimentoVaga(data);

};

const taxaCrescimentoUsuario = (data) => {
  const pTaxa = document.getElementById("novosUsuarios");
  pTaxa.innerHTML = data+"%";
};

const getUsuarios = async () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const data = await fetch(taxaUsuariosUri, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json()
  })

  taxaCrescimentoUsuario(data);

};

const taxaVagasCanceladas = (data) => {
  const pTaxa = document.getElementById("vagasCanceladas");
  pTaxa.innerHTML = data+"%";
};

const getVagasCanceladas = async () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const data = await fetch(taxaCanceladosUri, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json()
  })

  taxaVagasCanceladas(data);

};

const taxaContratacao = (data) => {
  const pTaxa = document.getElementById("contratacao");
  pTaxa.innerHTML = data+"%";
};

const getContratacao = async () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const data = await fetch(taxaContratacaoUri, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json()
  })

  taxaContratacao(data);

};

getUsuarios();
getVagas();
getVagasCanceladas();
getContratacao();