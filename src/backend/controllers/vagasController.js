const vagasModel = require('../models/vagasModel');

const listarVagasController = async (req, res) => {
    const listaVagas = await vagasModel.listarVagasModel();
    return res.status(200).json(listaVagas);
};

const criarVagaController = async (req, res) => {
    const vagaCriada = await vagasModel.criarVagaModel(req.body);
    return res.status(201).json(req.body);
};

const detalheVagaEspecificaController = async (req, res) => {
    const codVaga= req.query;
    console.log(codVaga);
    const [especificacaoVaga] = await vagasModel.vagaEspecificaModel(codVaga); //recebe o retorno da funcao vagaEspecifica
    return res.status(200).json(especificacaoVaga);
};

const uploadTesteController = async (req, res) => {
    const uploadTeste = await vagasModel.uploadTesteModel(req.body, req.file);
    return res.status(201).json(req.body);
}

module.exports = {
    listarVagasController,
    criarVagaController,
    uploadTesteController,
    detalheVagaEspecificaController
};