const connection = require('./connection');

const uploadCurriculoModel = async (codVaga, codCandidato, url, tempExp) => {

  const { codigoVaga } = codVaga;
  const { codigoCandidato } = codCandidato;
  const { location: curriculo = "" } = url;
  const { tempoExperiencia } = tempExp;

  const query = 'INSERT INTO candidato_vaga(codigoCandidato, codigoVaga, tempoExperiencia, curriculo) VALUES (?, ?, ?)';
  const [testeCriado] = await connection.execute(query, [codigoCandidato, codigoVaga, tempoExperiencia, curriculo]);

  return testeCriado;
};


module.exports = {
  uploadCurriculoModel
};
