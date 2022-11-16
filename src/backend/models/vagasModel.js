//contém todas as funções que vão interagir diretamente com o banco de dados
const { query } = require('./connection');
const connection = require('./connection');

/*Funçao que lista todas as vagas*/
const listarVagasModel = async () => {
  const [vagas] = await connection.execute('SELECT * FROM status_vaga as statusVaga CROSS JOIN vaga as vaga ON statusVaga.codigoStatus = vaga.codigoStatus;');
  console.log (JSON.parse(JSON.stringify(vagas)))
  return vagas;
};

/*Funçao que cria uma vaga */
const criarVagaModel = async (vaga) => {
  const { descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade } = vaga;

  const query = 'INSERT INTO vaga(descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const [vagaCriada] = await connection.execute(query, [descricao, qtdVagas, requisitos, senioridade, codigoStatus, tempoExperienciaVaga, tituloVaga, localModalidade]);

  return vagaCriada;
};


/*Funçao de uma vaga específica*/
const vagaEspecifica = async (idVaga)=>{
  const especificacaoVaga = await connection.execute(`SELECT * FROM vaga WHERE codigoVaga = ${idVaga}`) ;
  return especificacaoVaga;
}


module.exports = {
  listarVagasModel,
  criarVagaModel,
  vagaEspecifica
};