//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

const { encriptador } = require('./cripto');


const cadastrarUsuario = async (usuario) => {

  const { nome, email, senha, tipoCadastro } = usuario;

  const senhaEncriptada = encriptador(senha);

  const query = "INSERT INTO usuario(nome, email, senha, tipoCadastro) VALUES (?, ?, ?, ?)";

  const [usuarios] = await connection.execute(query, [nome, email, senhaEncriptada, tipoCadastro]);

  return usuarios;
};

const listarLogin = async () => {
  const [usuarioLogin] = await connection.execute('SELECT email,senha, nome FROM usuario');
  return usuarioLogin;
};

const logarModel = async (email, senha) => {
  const senhaEncriptada = encriptador(senha);

  const usuario = await connection.execute(`SELECT * FROM usuario WHERE email = "${email}" and senha = "${senhaEncriptada}"`);

  return usuario;
};

const pegarUsuarioModel = async (codigoUsuario) => {

  const usuario = await connection.execute(`SELECT * FROM usuario WHERE codigoUsuario = "${codigoUsuario}"`);

  return usuario;
};
module.exports = {
  cadastrarUsuario,
  listarLogin,
  logarModel,
  pegarUsuarioModel
};