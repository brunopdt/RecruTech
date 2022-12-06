const { createHash } = require('crypto');

function encriptador(string) {
  return createHash('sha256').update(string).digest('hex');
}

module.exports = {
  encriptador
};