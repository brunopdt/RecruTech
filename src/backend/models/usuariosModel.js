//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

const { encriptador } = require('./cripto');


const cadastrarUsuario = async (usuario) => {

  const { nome, senha, email, tipoCadastro } = usuario;

  const date = new Date(Date.now()).toLocaleDateString();

  const senhaEncriptada = encriptador(senha).dadoEncriptado;

  const query = "INSERT INTO usuario(nome, email, senha, tipoCadastro, dataCriacaoUsuario) VALUES (?, ?, ?, ?, ?)";

  const [usuarios] = await connection.execute(query, [nome, email, senhaEncriptada, tipoCadastro, date]);

  return usuarios;
};

const listarLogin = async () => {
  const [usuarioLogin] = await connection.execute('SELECT email,senha, nome FROM usuario');
  return usuarioLogin;
};

const logarModel = async (email, senha) => {
  const usuario = await connection.execute(`SELECT * FROM usuario WHERE email = "${email}" and senha = "${senha}"`);
  return usuario;
};

module.exports = {
  cadastrarUsuario,
  listarLogin,
  logarModel
};