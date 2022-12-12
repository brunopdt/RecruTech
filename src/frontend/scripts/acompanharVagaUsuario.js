const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");
const btn = document.querySelector('#enviar-teste');
const codigoUsuario = document.cookie.split(';')[1].split('=')[1];
let codigoStatus = "";

const preencherDivTituloVaga = () => {
  axios.get(`http://localhost:8081/detalheVagas?codVaga=${idDaVaga}`)
    .then(response => {
      if (response.status === 200) {
        const divTitulo = document.getElementById("main_title");
        divTitulo.innerHTML = `${response.data[0].tituloVaga}`;
      }
    })
    .catch(erro => {
      alert("Erro ao obter título da vaga");
    });
}

const preencherDivCurriculo = (urlCurriculo) => {
  const divCurriculo = document.getElementById("visualizar-curriculo");
  divCurriculo.innerHTML = `
    Visualizar Currículo:
    <a href=${urlCurriculo}>
      <i class="fa-solid fa-arrow-up-right-from-square"></i>    
    </a>
  `;
}

const obterUrlCurriculo = () => {
  axios.get(`http://localhost:8081/listar-curriculos?codVaga=${idDaVaga}`)
    .then(response => {
      if (response.status === 200) {
        preencherDivCurriculo(response.data[0].curriculo);
      }
    })
    .catch(erro => {
      alert("Erro ao obter url do currículo");
    });
}

const preencherDivTeste = (urlTeste) => {
  const divTeste = document.getElementById("download-teste");
  divTeste.innerHTML = `
    Download do teste:
    <a href=${urlTeste} id="link-teste">
      <i class="fa-solid fa-arrow-up-right-from-square"></i>    
    </a>
  `;
}

const obterUrlTeste = async () => {
  await axios.get(`http://localhost:8081/obter-teste?codVaga=${idDaVaga}`)
    .then(response => {
      if (response.status === 200) {
        preencherDivTeste(response.data[0].urlTeste);
      }
    })
    .catch(erro => {
      alert("Erro ao obter teste da vaga");
    });
}

function getDadosEnviarTeste() {
  const inputTeste = document.querySelector('#input_file');

  const dadosTeste = {
      arquivo: inputTeste.files[0],
      codigoVaga: +idDaVaga,
      codigoUsuario: +codigoUsuario,
  }

  return dadosTeste;
}

btn.addEventListener('click', () => {
    const dadosTeste = getDadosEnviarTeste();
    if(dadosTeste.arquivo != null || dadosTeste.arquivo != undefined)
      uploadTeste(dadosTeste);
    else
      alert("É necessário anexar um arquivo para fazer o envio!");
})

const uploadTeste = (dadosInscricao) => {
  axios.post('http://localhost:8081/enviar-teste', {
    file: dadosInscricao.arquivo,
    codUsuario: dadosInscricao.codigoUsuario,
    codVaga: dadosInscricao.codigoVaga
  }, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => {
    if (response.status === 201) {
      alert('Envio do teste concluído! Agora é só aguardar as próximas etapas do processo');
    }
    else {
      alert('Ocorreu um erro ao se inscrever');
    }
  }).catch(erro => {
    return alert(erro);
  });
}

const indicarStatusProcesso = async () => {
  await axios.get(`http://localhost:8081/acompanhar-status-vaga?codCandidato=${codigoUsuario}&codVaga=${idDaVaga}`)
    .then(response => {
      if (response.status === 200) {
        codigoStatus = response.data[0].statusInscricao
      }
    })
    .catch(erro => {
      alert("Erro ao obter status do processo");
  });
  
  if(codigoStatus === 1){
    document.getElementById("enviar-teste").disabled = true;
    document.getElementById("input_file").disabled = true;
    document.getElementById("download-teste").style.display = 'none';
  }
  else if(codigoStatus === 2){
    document.getElementById('divCurriculo').style.color = 'green';
    document.getElementById("enviar-teste").disabled = false;
    document.getElementById("input_file").disabled = false;
    document.getElementById("download-teste").style.display = 'block';
  }
  else if(codigoStatus === 3){
    document.getElementById('divTeste').style.color = 'green';
  }
  else if(codigoStatus === 4){
    document.getElementById('divEntrevista').style.color = 'green';    
  }
  else if(codigoStatus === 5){
    document.getElementById('divFinal').style.color = 'green';       
  }
}

preencherDivTituloVaga();
obterUrlCurriculo();
indicarStatusProcesso();
obterUrlTeste();