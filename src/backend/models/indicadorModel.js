const connection = require('./connection');

const indicadorTaxaVagasCriadasModel = async () => {
    const [dados] = await connection.execute(`
      SELECT COUNT(*) as qtdTotaisVagas, (SELECT COUNT(*) as qtdVagas FROM vaga v
			                                      WHERE MONTH(v.dataCriacaoVaga) = MONTH(current_timestamp())
									                          AND YEAR(v.dataCriacaoVaga) = YEAR(current_timestamp())) as qtdVagasMes
	    FROM vaga v;
      `);
    return dados;
  };

  const indicadorTaxaUsuariosCriadosModel = async () => {
    const [dados] = await connection.execute(`
      SELECT COUNT(*) as qtdTotaisUsuario, (SELECT COUNT(*) as qtdUsuarios FROM usuario u
        WHERE MONTH(u.dataCriacaoUsuario) = MONTH(current_timestamp())
        AND YEAR(u.dataCriacaoUsuario) = YEAR(current_timestamp())) as qtdUsuariosMes
      FROM usuario u;
      `);
    return dados;
  };


module.exports = {
  indicadorTaxaVagasCriadasModel,
  indicadorTaxaUsuariosCriadosModel
}