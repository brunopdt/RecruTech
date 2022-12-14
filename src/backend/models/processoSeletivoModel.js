const connection = require('./connection');

const listarCurriculosModel = async (codigoVaga) => {
    const [curriculos] = await connection.execute(`
        SELECT u.nome, cv.codigoCandidato, cv.curriculo, v.tituloVaga, v.codigoVaga, cv.indCurriculoAprovado FROM usuario u
            JOIN candidato_vaga cv
                ON u.codigoUsuario = cv.codigoCandidato
            JOIN vaga v
		        ON cv.codigoVaga = v.codigoVaga
            WHERE cv.codigoVaga = ${codigoVaga};
        `);
    return curriculos;
};

const listarCurriculosFiltradosModel = async (codigoVaga) => {
    const [curriculos] = await connection.execute(`
        SELECT u.nome, cv.codigoCandidato, cv.curriculo, v.tituloVaga, v.tempoExperienciaVaga, cv.tempoExperiencia FROM usuario u
            JOIN candidato_vaga cv
                ON u.codigoUsuario = cv.codigoCandidato
            JOIN vaga v
		        ON cv.codigoVaga = v.codigoVaga
            WHERE cv.codigoVaga = ${codigoVaga} AND cv.tempoExperiencia >= v.tempoExperienciaVaga;
        `);
    return curriculos;
};

const listarVagasInscritasModel = async (codigoUsuario) => {
    const [vagas] = await connection.execute(`
        SELECT v.tituloVaga, v.localModalidade, v.codigoVaga, cv.indCandidatoContratado FROM usuario u
	        JOIN candidato_vaga cv
		        ON u.codigoUsuario = cv.codigoCandidato
	        JOIN vaga v
		        ON cv.codigoVaga = v.codigoVaga
	        WHERE u.codigoUsuario = ${codigoUsuario};
        `);
    return vagas;
};

const obterTesteVagaModel = async (codigoVaga) => {
    const [testeVaga] = await connection.execute(`
        SELECT * FROM teste_vaga WHERE codigoVaga = ${codigoVaga};
    `);

    return testeVaga;
}

const uploadTesteModel = async (dadosEnvioTeste, url) => {
    const codigoVaga = dadosEnvioTeste.codVaga;
    const codigoCandidato = dadosEnvioTeste.codUsuario;
    const urlTeste = url.location;

    const query = 'INSERT INTO teste_candidato(codigoCandidato, codigoVaga, urlTeste) VALUES (?, ?, ?)';
    const [testeCriado] = await connection.execute(query, [codigoCandidato, codigoVaga, urlTeste]);

    return testeCriado;
};

const obterStatusVagaModel = async (codigoCandidato, codigoVaga) => {
    const [statusVaga] = await connection.execute(`
        SELECT * FROM candidato_vaga WHERE codigoCandidato = ${codigoCandidato} AND codigoVaga = ${codigoVaga};
    `);

    return statusVaga;
}

const atualizarStatusVagaModel = async (codigoCandidato, codigoVaga, status) => {
    const [statusVaga] = await connection.execute(`
        UPDATE candidato_vaga SET statusInscricao = ${status} WHERE codigoCandidato = ${codigoCandidato} AND codigoVaga = ${codigoVaga};
    `);

    return statusVaga;
}

const atualizarIndiceAprovacaoModel = async (codigoCandidato, codigoVaga, indAprovacao) => {
    const [vagaAtualizada] = await connection.execute(`
        UPDATE candidato_vaga SET indCurriculoAprovado = ${indAprovacao} WHERE codigoCandidato = ${codigoCandidato} AND codigoVaga = ${codigoVaga};
    `);

    return vagaAtualizada;
}

const atualizarCandidatoAprovadoModel = async (codigoCandidato, codigoVaga, indAprovacao) => {
    const [vagaAtualizada] = await connection.execute(`
        UPDATE candidato_vaga SET indCandidatoContratado = ${indAprovacao} WHERE codigoCandidato = ${codigoCandidato} AND codigoVaga = ${codigoVaga};
    `);

    return vagaAtualizada;
}

const atualizarIndiceAprovacaoTesteModel = async (codigoCandidato, codigoVaga, indAprovacao) => {
    const [testeAtualizado] = await connection.execute(`
        UPDATE teste_candidato SET indTesteAprovado = ${indAprovacao} WHERE codigoCandidato = ${codigoCandidato} AND codigoVaga = ${codigoVaga};
    `);

    return testeAtualizado;
}

const listarTestesVagaModel = async (codVaga) => {
    const [listaTestes] = await connection.execute(`
        SELECT * FROM usuario u
	    JOIN teste_candidato tc
	    	ON u.codigoUsuario = tc.codigoCandidato
	    WHERE tc.codigoVaga = ${codVaga};
    `);

    return listaTestes;
}

const listarCandidatosEntrevistaModel = async (codVaga) => {
    const [listaCandidatos] = await connection.execute(`
        SELECT u.nome, u.email, u.codigoUsuario, tc.indTesteAprovado, cv.indEntrevistaAprovada FROM usuario u
        JOIN teste_candidato tc
            ON u.codigoUsuario = tc.codigoCandidato
        JOIN candidato_vaga cv
            ON u.codigoUsuario = cv.codigoCandidato
        WHERE cv.codigoVaga = ${codVaga} AND tc.indTesteAprovado = 1;
    `);

    return listaCandidatos;
}

module.exports = {
    listarCurriculosModel,
    listarCurriculosFiltradosModel,
    listarVagasInscritasModel,
    obterTesteVagaModel,
    uploadTesteModel,
    obterStatusVagaModel,
    atualizarStatusVagaModel,
    atualizarIndiceAprovacaoModel,
    atualizarCandidatoAprovadoModel,
    atualizarIndiceAprovacaoTesteModel,
    listarTestesVagaModel,
    listarCandidatosEntrevistaModel
};
