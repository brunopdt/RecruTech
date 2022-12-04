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
    
    if(!email || !senha)
        return {erro: 'Dados insuficientes'};

    const [usuario] = await usuariosModel.logarModel(email, senha);

    if(usuario == '' || usuario == undefined || usuario == null){ //essa parte não tá funcionando, req roda infinito
        return{ erro: 'E-mail ou senha incorretos.'}
    }

    const token = jsonwebtoken.sign({
        id: res.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipoCadastro,
        codigoUsuario: usuario.codigoUsuario
    }, 'SenhaMuitoForteProtegendoToken');

    res.cookie('Token', token);

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