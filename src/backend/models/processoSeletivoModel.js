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

module.exports = {
    listarCurriculosModel
  };
