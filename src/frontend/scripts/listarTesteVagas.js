const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");
let textoHTML = '';

axios.get(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/listar-testes-vagas?codVaga=${idDaVaga}`)
  .then(response => {
    if (response.status === 200) {
      preencherDivTestes(response.data)
      console.log(response.data);
    }
  })
  .catch(erro => {
    alert("Erro ao obter lista de currículos vaga");
  });

const candidatoAprovado = (codUsuario) => {
  enviarEmailPositivo(codUsuario);
  atualizarStatusVaga(codUsuario, 3);
  atualizarIndiceAprovacao(codUsuario, 1);
  atualizarIndiceContratacaoVaga(codUsuario, null);
  window.location.reload(false);
}

const candidatoReprovado = (codUsuario) => {
  enviarEmailNegativo(codUsuario);
  atualizarStatusVaga(codUsuario, 6);
  atualizarIndiceAprovacao(codUsuario, 0);
  atualizarIndiceContratacaoVaga(codUsuario, 0);
  window.location.reload(false);
}

const enviarEmailPositivo = (codUsuario) => {
  axios.get(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/enviar-email?codUser=${codUsuario}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao tentar enviar o email");
    });
};

const atualizarStatusVaga = (codUsuario, status) => {
  axios.put(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/atualizar-status-vaga?codCandidato=${codUsuario}&codVaga=${idDaVaga}&status=${status}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao atualizar status da vaga");
    });
}

const atualizarIndiceContratacaoVaga = (codUsuario, indAprovado) => {
  axios.put(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/atualizar-candidato-aprovado-vaga?codCandidato=${codUsuario}&codVaga=${idDaVaga}&indAprovado=${indAprovado}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao atualizar indice contratação da vaga");
    });
}

const atualizarIndiceAprovacao = (codUsuario, indAprovado) => {
  axios.put(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/atualizar-indice-aprovacao-teste?codCandidato=${codUsuario}&codVaga=${idDaVaga}&indAprovado=${indAprovado}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao atualizar status da vaga");
    });
}

const enviarEmailNegativo = (codUsuario) => {
  axios.get(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/enviar-email-negativo?codUser=${codUsuario}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao tentar enviar o email");
    });
};

const preencherTestesVaga = (dadosTeste) => {
  let nomeCandidato = dadosTeste.nome;
  let urlTeste = dadosTeste.urlTeste;
  let codigoUsuario = dadosTeste.codigoCandidato;
  let codigoAprovacao = dadosTeste.indTesteAprovado;
  let statusTeste;

  if (codigoAprovacao === 1)
    statusTeste = "Aprovado";
  else if (codigoAprovacao === 0)
    statusTeste = "Reprovado";
  else {
    statusTeste = "A validar";
  }
  
  textoHTML += `
  <div class="new-candidato">
        <div class="candidato">
          <div class="candidato-info">
            <div id="nome-candidato">${nomeCandidato}</div>
            <div id="teste">
            <a href = ${urlTeste}>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>  
            </div>
            <div id="statusDoCandidato">${statusTeste}</div>
            
            <div id="botoes">
              <div class="button_container">
                <button class="button" id="check" onClick="candidatoAprovado(${codigoUsuario})">
                  <span id="button_text"><i class="fa-solid fa-check"></i></span>
                </button>
                <button class="button" id="xmark" onClick="candidatoReprovado(${codigoUsuario})">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="line">
        </div>
      </div>`
    ;
  return textoHTML;
};

const preencherDivSemTeste = () => {
  textoHTML += `
    <div class="div-sem-testes">
      <p>
        Ainda não foi submetido nenhum teste para essa vaga!
      </p>
    </div>`
    ;
  return textoHTML;
};

const preencherDivTituloVaga = () => {
  axios.get(`https://plf-es-2022-2-ti2-0924100-recrutech-t-git-26faaa-recrutech-tis2.vercel.app/detalheVagas?codVaga=${idDaVaga}`)
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

const preencherDivTestes = (dados) => {
  const divTeste = document.getElementById("container-dados");
  textoHTML = ''
  preencherDivTituloVaga();
  if (dados.length !== 0) {
    dados.forEach((dadosTeste) => {
      divTeste.innerHTML = preencherTestesVaga(dadosTeste);
    });
  } else {
    divTeste.innerHTML = preencherDivSemTeste();
  }
};