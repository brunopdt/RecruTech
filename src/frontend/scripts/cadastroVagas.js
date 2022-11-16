let btn = document.querySelector('#botao-cadastrar');

function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2
  return newHeight
}

btn.addEventListener('click', () => {
  const vaga = getDadosVagaForm();
  enviarDadosVagaParaApi(vaga)
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
  const inputSenioridadeEstagiario = document.querySelector('#estagiario');
  const inputSenioridadeJunior = document.querySelector('#junior');
  const inputSenioridadePleno = document.querySelector('#pleno');
  const inputSenioridadeSenior = document.querySelector('#senior');

  if (inputTitulo.value === null || inputDescricao.value === null || inputLocalModalidade.value === null ||
    inputRequisitosVaga.value === null || inputQuantidadeVagas.value === null || inputExperienciaMinima.value === null ||
    !(inputSenioridadeEstagiario.checked || inputSenioridadeJunior.checked ||
      inputSenioridadePleno.checked || inputSenioridadeSenior.checked)) {
    console.log("Erro, todos os campos devem estar preenchidos");
    return;
  }

  let senioridadeDesejada = '';
  if (inputSenioridadeEstagiario.checked) {
    senioridadeDesejada += inputSenioridadeEstagiario.value
    senioridadeDesejada += ','
  }

  if (inputSenioridadeJunior.checked) {
    senioridadeDesejada += inputSenioridadeJunior.value
    senioridadeDesejada += ','
  }

  if (inputSenioridadePleno.checked) {
    senioridadeDesejada += inputSenioridadePleno.value
    senioridadeDesejada += ','
  }

  if (inputSenioridadeSenior.checked) {
    senioridadeDesejada += inputSenioridadeSenior.value
    senioridadeDesejada += ','
  }

  if (senioridadeDesejada.endsWith(',')) {
    senioridadeDesejada = senioridadeDesejada.slice(0, senioridadeDesejada.length - 1)
  }

  const vaga = {
    descricao: inputDescricao.value,
    qtdVagas: +inputQuantidadeVagas.value,
    requisitos: inputRequisitosVaga.value,
    senioridade: senioridadeDesejada,
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
      window.location.href = '../views/listaDeVagasRH.html'
    } else {
      console.log('Erro ao adicionar vaga');
    }
  } catch (e) {
    console.error(e);
  }
}