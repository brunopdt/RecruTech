const connection = require('./connection');

const inscreverVagaModel = async (dadosInscricao) => {
  const codigoCandidato = dadosInscricao.codCandidato;
  const codigoVaga = dadosInscricao.codVaga;
  const tempoExperiencia = dadosInscricao.tempExp;

  const query = 'INSERT INTO candidato_vaga(codigoCandidato, codigoVaga, tempoExperiencia) VALUES (?, ?, ?)';
  const [dadosInscricaoEfetuada] = await connection.execute(query, [codigoCandidato, codigoVaga, tempoExperiencia]);
  return dadosInscricaoEfetuada;
}

const uploadCurriculoModel = async (body, url) => {

  const codigoVaga = body.codVaga;
  const codigoCandidato = body.codCandidato;
  const urlCurriculo = url.location;

  const query = `UPDATE candidato_vaga set curriculo = '${urlCurriculo}' WHERE codigoCandidato = ${codigoCandidato} and codigoVaga = ${codigoVaga}`;
  const [testeCriado] = await connection.execute(query);

  return testeCriado;
};


module.exports = {
  uploadCurriculoModel,
  inscreverVagaModel
};
