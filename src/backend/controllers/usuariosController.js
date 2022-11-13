const usuariosModel = require('../models/usuariosModel');

const cadastrarUsuarioController = async (req, res) => {
    const usuarioCadastro = await usuariosModel.cadastrarUsuario(req.body);
    return res.status(201).json(req.body);
};

const listarLoginController = async (req, res) => {
    const listaLogin = await usuariosModel.listarLogin();
    return res.status(200).json(listaLogin);
};

module.exports = {
    cadastrarUsuarioController,
    listarLoginController
};