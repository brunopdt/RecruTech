//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection')

const getAll = async () => {
  const vagas = await connection.execute('SELECT * FROM status_vaga');
  return vagas;
};

module.exports = {
  getAll
};