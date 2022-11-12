//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

const cadastrarUsuario = async (usuario) => {

  const { nome, senha, email, tipoCadastro } = usuario;

    const query = "INSERT INTO usuario(nome, email, senha, tipoCadastro) VALUES (?, ?, ?, ?)";

  const [usuarios] = await connection.execute(query, [nome, senha, email, tipoCadastro]);

  return usuarios;
};

module.exports = {
  cadastrarUsuario
};