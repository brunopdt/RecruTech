const urlParams = new URLSearchParams(window.location.search);
const idDaVaga = urlParams.get("id");
let textoHTML = '';
let checkboxFiltrar = document.getElementById('filtrar-curriculos');

checkboxFiltrar.addEventListener('click', () => {
  if (checkboxFiltrar.checked) {
    axios.get(`http://localhost:8081/listar-curriculos-filtrados?codVaga=${idDaVaga}`)
      .then(response => {
        if (response.status === 200) {
          preencherDivCurriculos(response.data)
          console.log(response.data);
        }
      })
      .catch(erro => {
        alert("Erro ao obter lista de currículos vaga");
      });
  }
  else{
    axios.get(`http://localhost:8081/listar-curriculos?codVaga=${idDaVaga}`)
    .then(response => {
      if (response.status === 200) {
        preencherDivCurriculos(response.data)
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao obter lista de currículos vaga");
    });    
  }
});


axios.get(`http://localhost:8081/listar-curriculos?codVaga=${idDaVaga}`)
  .then(response => {
    if (response.status === 200) {
      preencherDivCurriculos(response.data)
      console.log(response.data);
    }
  })
  .catch(erro => {
    alert("Erro ao obter lista de currículos vaga");
  });

  const enviarEmailPositivo = (codUsuario) => {
    
    axios.get(`http://localhost:8081/enviar-email?codUser=${codUsuario}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(erro => {
      alert("Erro ao tentar enviar o email");
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
  }
  
  

const preencherCurriculosVaga = (dadosCurriculo) => {
  let nomeCandidato = dadosCurriculo.nome;
  let urlCurriculo = dadosCurriculo.curriculo;
  let codigoUsuario = dadosCurriculo.codigoCandidato;

  
  console.log(codigoUsuario)

  textoHTML += `
  <div class="new-candidato">
        <div class="candidato">
          <div class="candidato-info">
            <div id="nome-candidato">${nomeCandidato}</div>
            <div id="curriculo">
            <a href = ${urlCurriculo}>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>            
            </div>
            
            <div id="botoes">
              <div class="button_container">
                <button class="button" id="check" onClick="enviarEmailPositivo(${codigoUsuario})">
                  <span id="button_text"><i class="fa-solid fa-check"></i></span>
                </button>
                <button class="button" id="xmark" onClick="enviarEmailNegativo(${codigoUsuario})">
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

const preencherDivSemCurriculos = () => {
  textoHTML += `
    <div class="div-sem-candidatos">
      <p>
        Essa vaga ainda não possui candidatos inscritos!
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

const preencherDivCurriculos = (dados) => {
  const divVaga = document.getElementById("containerDados");
  textoHTML = ''
  preencherDivTituloVaga();
  if (dados.length !== 0) {
    dados.forEach((dadosCurriculo) => {
      divVaga.innerHTML = preencherCurriculosVaga(dadosCurriculo);
    });
  } else {
    divVaga.innerHTML = preencherDivSemCurriculos();
  }
};
