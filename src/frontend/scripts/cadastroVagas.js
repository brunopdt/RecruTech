let btn = document.querySelector('#botao-cadastrar');

btn.addEventListener('click', () => {
  const vaga = getDadosVagaForm();
  if (vaga == null || vaga == undefined)
    alert("Erro ao cadastrar a vaga! Todos os campos devem estar preenchidos.");
  else
    enviarDadosVagaParaApi(vaga)
})


function validarSeVagaPossuiTeste() {
  const vagaPossuiTeste = document.querySelector("input[name='possuiTeste']:checked");

  if (vagaPossuiTeste.value == "sim") {    
    return true;
  }
  return false;
}

function getDadosVagaForm() {
  const inputTitulo = document.querySelector('#titulo');
  const inputDescricao = document.querySelector('#descricaoVaga');
  const inputLocalModalidade = document.querySelector('#localModalidade');
  const inputRequisitosVaga = document.querySelector('#requisitos');
  const inputQuantidadeVagas = document.querySelector('#quantidade');
  const inputExperienciaMinima = document.querySelector('#experiencia');
  const inputSenioridade = document.querySelector("input[name='senioridadeDesejada']:checked");

  if (inputTitulo.value === "" || inputDescricao.value === "" || inputLocalModalidade.value === "" ||
    inputRequisitosVaga.value === "" || inputQuantidadeVagas.value <= 0 || inputExperienciaMinima.value < 0 ||
    inputSenioridade === null) {
    console.log("Erro, todos os campos devem estar preenchidos");
    return;
  }

  const vaga = {
    descricao: inputDescricao.value,
    qtdVagas: +inputQuantidadeVagas.value,
    requisitos: inputRequisitosVaga.value,
    senioridade: inputSenioridade.value,
    codigoStatus: 1,
    tempoExperienciaVaga: +inputExperienciaMinima.value,
    tituloVaga: inputTitulo.value,
    localModalidade: inputLocalModalidade.value
  }

  return vaga;
}

async function getCodigoVaga(){
  const inputQuantidadeVagas = document.querySelector('#quantidade');
  const inputTitulo = document.querySelector('#titulo');
  
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  try {
    const data = await fetch(`http://localhost:8081/vagas-codigo?nomeVaga=${inputTitulo.value}&qtdVagas=${inputQuantidadeVagas.value}`, {
      method: "GET",
      headers: headers,
    }).then((response) => { return response.json() });

    return data;
  } catch(e){
    console.error(e);
  }

}

async function enviarDadosVagaParaApi(vaga) {
  try {
    const res = await fetch('http://localhost:8081/vagas', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vaga)
    })

    if (res.status === 201 && !!validarSeVagaPossuiTeste()) {
      const codigoDaVaga = getCodigoVaga();
      console.log(codigoDaVaga);
      alert('Vaga cadastrada com sucesso')
      window.location.href = `/cadastro-teste`
    } 
    else if(res.status === 201 && validarSeVagaPossuiTeste() == false ) { 
      alert('Vaga cadastrada com sucesso')
      window.location.href = '/lista-vagas-empresa'      
    }
  } catch (e) {
    console.error(e);
  }
}