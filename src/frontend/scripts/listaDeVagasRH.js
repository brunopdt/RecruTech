const uri = "http://localhost:8081/vagas"

async function getItems() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

 const data = await fetch(uri, {
    method: "GET",
    headers: headers,
  }).then((response) => {return response.json()});

  console.log(data);
}

//--------------------------Laura-----------------------

function criarElementos(element, id, classe, content, value) {
  // Criar o elemento
  const elemento = document.createElement(element);

  // Atribuir um id 
  if (id)
      elemento.id = id;

  // Atribuir um tipo para ele
  if (classe)
      elemento.className = classe;

  // Atribuir um placeholder para ele
  if (content)
      elemento.innerHTML = content;

  // Atribuir um value para ele
  if (value)
      elemento.value = value;

  // Retornar o input criado
  return elemento;
}

\
//função linkando 
function listagemVaga() {

  // Limpa o corpo do modal para criar um novo
  $(".new-vaga").html("");

  // Referencia a class da nova vaga
  const classNewVaga = criarElementos(".new-vaga");

  // Criar e colocar a vaga
  const vagaInfo = criarElementos('div', null, 'vaga-info');

  // Criar e colocar nome da vaga
   const nomeVaga = criarElementos('div', 'nome-vaga');

  // Criar e colocar local da vaga
  const localVaga = criarElementos('div', 'local-vaga');

  // Criar e colocar status da vaga
  const statusVaga = criarElementos('div', 'status-vaga');

  // Criar e colocar status da vaga
  const botoes = criarElementos('div', 'botoes');

}