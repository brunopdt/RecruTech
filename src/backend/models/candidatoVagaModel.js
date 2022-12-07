const connection = require('./connection');

const inscreverVagaModel = async (dadosInscricao, url) => {
  const codigoCandidato = dadosInscricao.codUsuario;
  const codigoVaga = dadosInscricao.codVaga;
  const tempoExperiencia = dadosInscricao.tempExperiencia;
  const urlCurriculo = url.location;  

  const query = 'INSERT INTO candidato_vaga(codigoCandidato, codigoVaga, tempoExperiencia, curriculo) VALUES (?, ?, ?, ?)';
  const [dadosInscricaoEfetuada] = await connection.execute(query, [codigoCandidato, codigoVaga, tempoExperiencia, urlCurriculo]);
  return dadosInscricaoEfetuada;
}

module.exports = {
  inscreverVagaModel
};
