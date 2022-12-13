const uri = "http://localhost:8081/indicadores"
const taxaMesUri = "/indicador-taxa-vagas-criadas"

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

    const taxaCrescimentoVaga = (data) => {
        const pTaxa = document.getElementById("vagasMensais");
        pTaxa.innerHTML = data;
    };
};