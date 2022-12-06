const jsonwebtoken = require('jsonwebtoken');
const usuariosModel = require('../models/usuariosModel');

const cadastrarUsuarioController = async (req, res) => {
    const usuarioCadastro = await usuariosModel.cadastrarUsuario(req.body);
    return res.status(201).json(req.body);
};

const listarLoginController = async (req, res) => {
    const listaLogin = await usuariosModel.listarLogin();
    return res.status(200).json(listaLogin);
};

const logarController = async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (!email || !senha)
        return { erro: 'Dados insuficientes' };

    const [usuario] = await usuariosModel.logarModel(email, senha);

    if (usuario == '' || usuario == undefined || usuario == null) { //essa parte não tá funcionando, req roda infinito
        return res.status(400).json(usuario)
    }

    const token = jsonwebtoken.sign({
        id: res.id,
        nome: usuario[0].nome,
        email: usuario[0].email,
        tipo: usuario[0].tipoCadastro,
        codigoUsuario: usuario[0].codigoUsuario
    }, 'SenhaMuitoForteProtegendoToken');

    res.cookie('Token', token);
    res.cookie('CodigoUsuarioLogado', usuario[0].codigoUsuario);
    res.cookie('TipoCadastroUsuarioLogado', usuario[0].tipoCadastro);

    return res.status(200).json(usuario)
};

const deslogarController = async (req, res) => {
    res.clearCookie('Token');
    res.redirect('/');
    return res.status(200);
};

module.exports = {
    cadastrarUsuarioController,
    listarLoginController,
    logarController,
    deslogarController
};