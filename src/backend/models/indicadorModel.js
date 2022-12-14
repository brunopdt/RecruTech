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

  const indicadorTaxaVagasCanceladasModel = async () => {
    const [dados] = await connection.execute(`
      SELECT COUNT(*) as qtdTotaisVagas, (SELECT COUNT(*) as qtdVagas FROM vaga v
			                                      WHERE MONTH(v.dataCriacaoVaga) = MONTH(current_timestamp())
									                          AND YEAR(v.dataCriacaoVaga) = YEAR(current_timestamp()) AND (codigoStatus = 3)) as qtdVagasMes
	    FROM vaga v WHERE (codigoStatus = 3);
      `);
    return dados;
  };


module.exports = {
  indicadorTaxaVagasCriadasModel,
  indicadorTaxaVagasCanceladasModel
}