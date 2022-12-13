const vagasModel = require('../models/vagasModel');

const indicador = async(req, res) => {
    const dados = await vagasModel.indicadorTaxaVagasCriadas();
    console.log(JSON.parse(dados))
    return res.json(dados);
}

const listarVagasController = async (req, res) => {
    const listaVagas = await vagasModel.listarVagasModel();
    return res.status(200).json(listaVagas);
};

const criarVagaController = async (req, res) => {
    const vagaCriada = await vagasModel.criarVagaModel(req);
    return res.status(201).json(vagaCriada.insertId);
};

const detalheVagaEspecificaController = async (req, res) => {
    const codVaga= req.query.codVaga;
    const [especificacaoVaga] = await vagasModel.vagaEspecificaModel(codVaga); //recebe o retorno da funcao vagaEspecifica
    return res.status(200).json(especificacaoVaga);
};

const detalheVagaEspecificaUserController = async (req, res) => {
    const codVaga= req.query.codVaga;
    console.log(codVaga);
    const [especificacaoVaga] = await vagasModel.vagaEspecificaUserModel(codVaga); 
    return res.status(200).json(especificacaoVaga);
};

const deletarVagaController = async (req, res) => {
    const codVaga= req.params.id;
    const especificacaoVaga = await vagasModel.deletarVagaModel(codVaga);
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
    detalheVagaEspecificaController,
    detalheVagaEspecificaUserController,
    deletarVagaController,
    indicador
};