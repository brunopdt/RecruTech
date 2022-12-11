const emailModel = require('../models/emailModel');

const enviarEmailController = async (req, res) => {
  const codigoUsuario = req.body.codigoUsuario;
  const [usuario] = await usuariosModel.pegarUsuarioModel(codigoUsuario);
  const sendEmail = await emailModel.run(usuario);
  return res.status(200).json(sendEmail);
};

module.exports = {
  enviarEmailController
}