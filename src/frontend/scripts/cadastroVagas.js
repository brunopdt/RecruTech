let btn = document.querySelector('#botao-cadastrar');

btn.addEventListener('click', () => {
  alert("oie");
  const vaga = getDadosVagaForm();
  console.log(vaga);
  if (vaga == null || vaga == undefined)
    alert("Erro ao cadastrar a vaga!");
  /*else
    enviarDadosVagaParaApi(vaga)*/
})


function validarSeVagaPossuiTeste() {
  const vagaPossuiTeste = document.querySelector('#possuiTeste');

  if (vagaPossuiTeste) {
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
    if (res.status === 201) {
      alert('Vaga cadastrada com sucesso')
      window.location.href = '/src/frontend/views/listaDeVagasRH.html'
    } else {
      console.log('Erro ao adicionar vaga');
    }
  } catch (e) {
    console.error(e);
  }
}