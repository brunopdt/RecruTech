const btn = document.querySelector('#btn-enviar');

btn.addEventListener('click', () => {
  const vaga = getDadosVagaForm();
  enviarDadosVagaParaApi(vaga)
})


function getTesteForm(){
  const inputTesteVaga = document.querySelector('#teste');

  if(inputTesteVaga === null){
    console.log("Erro, todos os campos devem estar preenchidos");
    return;
  }

  const teste = {
    arquivo: inputTesteVaga.value
  }

  return teste;
}


async function enviarDadosTesteParaApi (teste, codigoVaga) {
  try{
    const res = await fetch('http://localhost:8081/vagas-teste', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vaga)
    })
    if(res.status === 201){
      //mostra uma popup falando vaga cadastrada com sucesso
      //redireciona pra página de vagas
      window.location.href = '../views/listaDeVagasRH.html'
    }else{
      console.log('Erro ao adicionar vaga');
    }
  }catch(e){
    console.error(e);
  }
}