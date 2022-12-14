const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");
let textoHTML = '';

axios.get(`http://localhost:8081/listar-candidatos-entrevista?codVaga=${idDaVaga}`)
  .then(response => {
    if (response.status === 200) {
      preencherDivCandidatosEntrevista(response.data)
      console.log(response.data);
    }
  })
  .catch(erro => {
    alert("Erro ao obter lista de candidados para entrevista da vaga");
  });

const candidatoAprovado = (codUsuario) => {
  enviarEmailPositivo(codUsuario);
  atualizarStatusVaga(codUsuario, 4);
  atualizarIndiceAprovacao(codUsuario, 1);
  atualizarIndiceContratacaoVaga(codUsuario, 1);
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
  axios.get(`http://localhost:8081/enviar-email-final?codUser=${codUsuario}`)
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
  axios.put(`http://localhost:8081/atualizar-status-vaga?codCandidato=${codUsuario}&codVaga=${idDaVaga}&status=${status}`)
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
  axios.put(`http://localhost:8081/atualizar-candidato-aprovado-vaga?codCandidato=${codUsuario}&codVaga=${idDaVaga}&indAprovado=${indAprovado}`)
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
  axios.put(`http://localhost:8081/atualizar-indice-aprovacao-entrevista?codCandidato=${codUsuario}&codVaga=${idDaVaga}&indAprovado=${indAprovado}`)
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
  axios.get(`http://localhost:8081/enviar-email-negativo?codUser=${codUsuario}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao tentar enviar o email");
    });
};

const preencherCandidatosEntrevista = (dadosCandidato) => {
  let nomeCandidato = dadosCandidato.nome;
  let codigoUsuario = dadosCandidato.codigoUsuario;
  let codigoAprovacao = dadosCandidato.indEntrevistaAprovada;
  let statusEntrevista;

  if (codigoAprovacao === 1)
    statusEntrevista = "Aprovado";
  else if (codigoAprovacao === 0)
    statusEntrevista = "Reprovado";
  else {
    statusEntrevista = "Pendente";
  }
  
  textoHTML += `
      <div class="new-candidato">
      <div class="candidato">
        <div class="candidato-info">
          <div id="nome-candidato">${nomeCandidato}</div>
          <div id="link-entrevista">
            <input
              type="text"
              id="link-entrevista"
              name="name"
              placeholder="Link da Entrevista"
              required
            />
            <div class="date-time">
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="18:00"
                required
              />
              <input
                type="date"
                id="start"
                name="trip-start"
                value="2022-12-13"
              />
            </div>
            <div class="button_container2">
              <button class="button" id="enviar-teste" type="button">
                ENVIAR
              </button>
            </div>
          </div>
          <div class="break"></div>
          <div id="status-vaga">${statusEntrevista}</div>

          <div id="botoes">
            <div class="button_container">
              <button class="button" id="check" onClick="candidatoAprovado(${codigoUsuario})">
                <span id="button_text"
                  ><i class="fa-solid fa-check"></i
                ></span>
              </button>
              <button class="button" id="xmark" onClick="candidatoReprovado(${codigoUsuario})">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="line"></div>
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

const preencherDivCandidatosEntrevista = (dados) => {
  const divCandidatosEntrevista = document.getElementById("container-dados");
  textoHTML = ''
  preencherDivTituloVaga();
  if (dados.length !== 0) {
    dados.forEach((dadosCandidatos) => {
        divCandidatosEntrevista.innerHTML = preencherCandidatosEntrevista(dadosCandidatos);
    });
  } else {
    divCandidatosEntrevista.innerHTML = preencherDivSemTeste();
  }
};