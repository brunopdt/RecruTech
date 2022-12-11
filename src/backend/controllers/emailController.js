const emailModel = require('../models/emailModel');
const usuariosModel = require ('../models/usuariosModel');

const enviarEmailController = async (req, res) => {
  const codigoUsuario = req.query.codUser;
  const usuario = await usuariosModel.pegarUsuarioModel(codigoUsuario);
  const sendEmail = await emailModel.run(usuario);
  return res.status(200).json(sendEmail);
};

const enviarEmailNegativoController = async (req, res) => {
  const codigoUsuario = req.query.codUser;
  const usuario = await usuariosModel.pegarUsuarioModel(codigoUsuario);
  console.log(usuario)
  const sendEmail = await emailModel.runNegativo(usuario);
  return res.status(200).json(sendEmail);
}; 

module.exports = {
  enviarEmailController,
  enviarEmailNegativoController
}