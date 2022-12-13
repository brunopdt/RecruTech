const vagasModel = require('../models/vagasModel');

const listarVagasController = async (req, res) => {
    const listaVagas = await vagasModel.listarVagasModel();
    return res.status(200).json(listaVagas);
};

const criarVagaController = async (req, res) => {
    let codUsuario = req.query.codUsuario;
    const vagaCriada = await vagasModel.criarVagaModel(req, codUsuario);
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

const vagasCriadasRH = async (req, res) => {
    const vagaCriada = await vagasModel.listarVagasCriadas(req.params.codigoUsuario);
    return res.status(201).json(vagaCriada[0]);
}

module.exports = {
    listarVagasController,
    criarVagaController,
    uploadTesteController,
    detalheVagaEspecificaController,
    detalheVagaEspecificaUserController,
    deletarVagaController,
    vagasCriadasRH
};