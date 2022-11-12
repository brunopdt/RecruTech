//contém todas as funções que vão interagir diretamente com o banco de dados
const connection = require('./connection');

const crypto = require("crypto");

const algoritmo = 'aes-256-cbc'
const segredo = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encriptador = (texto) => {
  let cipher = crypto.createCipheriv(algoritmo, Buffer.from(segredo), iv);

  let encriptado = cipher.update(texto);

  encriptado = Buffer.concat([encriptado, cipher.final()]);

  return { iv: iv.toString('hex'), dadoEncriptado: encriptado.toString('hex')}
}

const cadastrarUsuario = async (usuario) => {

  const { nome, senha, email, tipoCadastro } = usuario;

    const query = "INSERT INTO usuario(nome, email, senha, tipoCadastro) VALUES (?, ?, ?, ?)";

  const [usuarios] = await connection.execute(query, [nome, email, senha, tipoCadastro]);

  return usuarios;
};

module.exports = {
  cadastrarUsuario
};