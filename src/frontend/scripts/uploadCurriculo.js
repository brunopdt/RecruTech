const urlParams = new URLSearchParams(window.location.search);

const btn = document.querySelector('#botao-enviar');

btn.addEventListener('click', () => {
    const dadosInscricao = getDadosIncricao();
    enviarDadosInscricaoParaApi(dadosInscricao);
})

function getDadosIncricao() {
    const inputCurriculoVaga = document.querySelector('#input_file');
    const idDaVaga = urlParams.get("id");
    const codigoUsuario = document.cookie.split(';')[1].split('=')[1];
    const tempoExperiencia = document.querySelector('#experiencia').value;

    if (inputCurriculoVaga === null || tempoExperiencia === null) {
        alert("Erro, todos os campos devem estar preenchidos")
        return;
    }

    const dadosInscricao = {
        arquivo: inputCurriculoVaga.files[0],
        codVaga: +idDaVaga,
        codUsuario: +codigoUsuario,
        tempExperiencia: +tempoExperiencia
    }

    return dadosInscricao;
}

async function enviarDadosInscricaoParaApi(dadosInscricao) {
    axios.post('http://localhost:8081/inscrever-vaga', {
        file: dadosInscricao.arquivo,
        codUsuario: dadosInscricao.codUsuario,
        codVaga: dadosInscricao.codVaga,
        tempExperiencia: dadosInscricao.tempExperiencia
    }, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(response => {
        if (response.status === 201) {
            alert('Inscrição Concluída!!');
            window.location.href = '/vagas-inscritas';
        }
        else {
            alert('Ocorreu um erro ao se inscrever');
        }
    }).catch(erro => {
        return alert(erro);
    });
}