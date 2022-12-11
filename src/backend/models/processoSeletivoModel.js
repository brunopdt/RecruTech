const connection = require('./connection');

const listarCurriculosModel = async (codigoVaga) => {
    const [curriculos] = await connection.execute(`
        SELECT u.nome, cv.codigoCandidato, cv.curriculo, v.tituloVaga FROM usuario u
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

module.exports = {
    listarCurriculosModel,
    listarCurriculosFiltradosModel
  };
