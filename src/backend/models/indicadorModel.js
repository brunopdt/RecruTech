//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');


const indicadorTaxaVagasCriadas = async () => {
    const dados = await connection.execute(`
    SELECT MONTH (dataCriacaoVaga) AS mes, YEAR(dataCriacaoVaga) AS ano, COUNT(codigoVaga) AS totalVagas,
    (COUNT(codigoVaga)/(SELECT COUNT(codigoVaga) FROM vaga WHERE month(dataCriacaoVaga)<mes))*100 AS indicador
    FROM vaga GROUP BY month (dataCriacaoVaga) ORDER BY mes;`);
    return dados;
  };