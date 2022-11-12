const vagasModel = require('../models/vagasModel');

const listarVagasController = async (req, res) => {
    const listaVagas = await vagasModel.listarVagasModel();
    return res.status(200).json(listaVagas);
};

const criarVagaController = async (req, res) => {
    const vagaCriada = await vagasModel.criarVagaModel(req.body);
    return res.status(201).json(req.body);
};

module.exports = {
    listarVagasController,
    criarVagaController
};