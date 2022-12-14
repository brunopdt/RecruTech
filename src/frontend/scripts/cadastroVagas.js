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

async function enviarDadosVagaParaApi(vaga) {
  const codigoUsuario = document.cookie.split(';')[1].split('=')[1];
  axios.post(`http://localhost:8081/vagas?codUsuario=${codigoUsuario}`, {
      descricao: vaga.descricao,
      qtdVagas: vaga.qtdVagas,
      requisitos: vaga.requisitos,
      senioridade: vaga.senioridade,
      codigoStatus: vaga.codigoStatus,
      tempoExperienciaVaga: vaga.tempoExperienciaVaga,
      tituloVaga: vaga.tituloVaga,
      localModalidade: vaga.localModalidade
    }).then(response => {
      let codigoVaga = response.data;
      if (response.status === 201 && !!validarSeVagaPossuiTeste()) {
        alert('Vaga cadastrada com sucesso')
        window.location.href = `/cadastro-teste?codigoVaga=${codigoVaga}`
      } 
      else if(response.status === 201 && validarSeVagaPossuiTeste() == false ) { 
        alert('Vaga cadastrada com sucesso')
        window.location.href = '/lista-vagas-empresa'      
      }
  }).catch(erro => {
      return alert(erro);
  });
}