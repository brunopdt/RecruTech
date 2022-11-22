//contém todas as funções que vão interagir diretamente com o banco de dados
const { query } = require('./connection');
const connection = require('./connection');

/*Funçao que lista todas as vagas*/
const listarVagasModel = async () => {
  const [vagas] = await connection.execute('SELECT * FROM status_vaga as statusVaga CROSS JOIN vaga as vaga ON statusVaga.codigoStatus = vaga.codigoStatus;');
  return vagas;
};

/*Funçao que cria uma vaga */
const criarVagaModel = async (vaga) => {
  const { descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade } = vaga;

  const date = new Date(Date.now()).toLocaleDateString();

  const query = 'INSERT INTO vaga(descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade, dataCriacaoVaga) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [vagaCriada] = await connection.execute(query, [descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade, date]);

  return vagaCriada;
};

const uploadTesteModel = async (codVaga, url) => {

  const { codigoVaga } = codVaga;
  const { location: urlTeste = "" } = url;

  const date = new Date(Date.now()).toLocaleDateString();

  const query = 'INSERT INTO teste_vaga(codigoVaga, urlTeste, dataCriacaoTeste) VALUES (?, ?, ?)';
  const [testeCriado] = await connection.execute(query, [codigoVaga, urlTeste, date]);

  return testeCriado;
};


/*Funçao de uma vaga específica*/
const vagaEspecificaModel = async (idVaga) => {
  const especificacaoVaga = await connection.execute(`SELECT * FROM vaga WHERE codigoVaga = ${idVaga}`);
  return especificacaoVaga;
}


module.exports = {
  listarVagasModel,
  criarVagaModel,
  uploadTesteModel,
  vagaEspecificaModel
};