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


const indicadorTaxaUsuariosCriadosModel = async () => {
  const [dados] = await connection.execute(`
      SELECT COUNT(*) as qtdTotaisUsuario, (SELECT COUNT(*) as qtdUsuarios FROM usuario u
        WHERE MONTH(u.dataCriacaoUsuario) = MONTH(current_timestamp())
        AND YEAR(u.dataCriacaoUsuario) = YEAR(current_timestamp())) as qtdUsuariosMes
      FROM usuario u;
      `);
  return dados;
};

const indicadorContratacaoModel = async () => {
  const [dados] = await connection.execute(`
    SELECT COUNT(*) as qtdTotalContratados, 
    (SELECT COUNT(*) as qtdUsuarios FROM candidato_vaga u) as qtdTotalUsuarios
    FROM candidato_vaga WHERE (indCandidatoContratado = 1);
      `);
  return dados;
};

const indicadorTaxaAprovadosTesteModel = async () => {
  const [dados] = await connection.execute(`
    SELECT COUNT(*) as qtdAprovadosMes, (SELECT COUNT(*) as qtdUsuarios FROM teste_candidato u
    WHERE MONTH(u.dataEnvioTeste) = MONTH(current_timestamp())
    AND YEAR(u.dataEnvioTeste) = YEAR(current_timestamp())) as qtdUsuariosTotaisMes
  FROM teste_candidato u WHERE MONTH(u.dataEnvioTeste) = MONTH(current_timestamp())
  AND YEAR(u.dataEnvioTeste) = YEAR(current_timestamp()) AND (indTesteAprovado = 1);
      `);
  return dados;
};

module.exports = {
  indicadorTaxaVagasCriadasModel,
  indicadorTaxaVagasCanceladasModel,
  indicadorTaxaUsuariosCriadosModel,
  indicadorContratacaoModel,
  indicadorTaxaAprovadosTesteModel
}