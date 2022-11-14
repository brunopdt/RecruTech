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

module.exports = {
  encriptador
};