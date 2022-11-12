const usuariosModel = require('../models/usuariosModel');

const cadastrarUsuarioController = async (req, res) => {
    const usuarioCadastro = await usuariosModel.cadastrarUsuario(req.body);
    return res.status(201).json(req.body);
};

module.exports = {
    cadastrarUsuarioController
};