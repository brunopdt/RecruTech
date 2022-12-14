const btn = document.querySelector('#btn-enviar');

btn.addEventListener('click', () => {
  const dadosTeste = getTesteForm();
  enviarDadosTesteParaApi(dadosTeste);
})

function getTesteForm() {
  const inputTesteVaga = document.querySelector('#input_file');
  const urlParams = new URLSearchParams(window.location.search);
  const codigoVaga = urlParams.get("codigoVaga");

  if (inputTesteVaga === null) {
    alert("Erro, todos os campos devem estar preenchidos")
    return;
  }

  const teste = {
    arquivo: inputTesteVaga.files[0],
    codigoVaga: +codigoVaga
  }

  return teste;
}


async function enviarDadosTesteParaApi(teste) {
  axios.post('https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/vagas-teste', {
    file: teste.arquivo,
    codigoVaga: teste.codigoVaga
  }, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => {
    if (response.status === 201) {
      alert('Teste cadastrado com sucesso');
      window.location.href = `/lista-vagas-empresa`;
    } 
    else { 
      alert('Ocorreu um erro ao cadastrar o teste');  
    }
  }).catch(erro => {
    return alert(response.data.erro);
  });
}