//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

const listarVagasModel = async () => {
  const [vagas] = await connection.execute('SELECT * FROM status_vaga as statusVaga CROSS JOIN vaga as vaga ON statusVaga.codigoStatus = vaga.codigoStatus;');
  console.log (JSON.parse(JSON.stringify(vagas)))
  return vagas;
};

const criarVagaModel = async (vaga) => {
  const { descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga } = vaga;

  const query = 'INSERT INTO vaga(descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga) VALUES (?, ?, ?, ?, ?, ?)';
  const [vagaCriada] = await connection.execute(query, [descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga]);

  return vagaCriada;
};

module.exports = {
  listarVagasModel,
  criarVagaModel
};









