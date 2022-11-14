//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

const { encriptador } = require('./cripto')


const cadastrarUsuario = async (usuario) => {

  const { nome, senha, email, tipoCadastro } = usuario;

  const senhaEncriptada = encriptador(senha).dadoEncriptado

    const query = "INSERT INTO usuario(nome, email, senha, tipoCadastro) VALUES (?, ?, ?, ?)";

  const [usuarios] = await connection.execute(query, [nome, email, senhaEncriptada, tipoCadastro]);

  return usuarios;
};

const listarLogin = async () => {
  const [usuarioLogin] = await connection.execute('SELECT email,senha, nome FROM usuario');
  return usuarioLogin;
};

module.exports = {
  cadastrarUsuario,
  listarLogin
};