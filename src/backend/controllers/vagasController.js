const vagasModel = require('../models/vagasModel');

const listarVagasController = async (req, res) => {
    const listaVagas = await vagasModel.listarVagasModel();
    return res.status(200).json(listaVagas);
};

const criarVagaController = async (req, res) => {
    const vagaCriada = await vagasModel.criarVagaModel(req.body);
    return res.status(201).json(vagaCriada.insertId);
};

const detalheVagaEspecificaController = async (req, res) => {
    const codVaga= req.query;
    console.log(codVaga);
    const [especificacaoVaga] = await vagasModel.vagaEspecificaModel(codVaga); //recebe o retorno da funcao vagaEspecifica
    return res.status(200).json(res.body(especificacaoVaga.insertId));
};

const deletarVagaController = async (req, res) => {
    const codVaga= req.params.id;
    console.log(codVaga);
    const especificacaoVaga = await vagasModel.deletarVagaModel(codVaga);
    return res.status(200).json(especificacaoVaga);
};

const obterCodigoVagaController = async (req, res) => {
    const nomeVaga = req.query.nomeVaga;
    const qtdVagas = req.query.qtdVagas;
    const [codigoVaga] = await vagasModel.obterCodigoVagaModel(nomeVaga, qtdVagas);
    
    if(codigoVaga != 0 && codigoVaga != undefined)
        return res.status(200).json(codigoVaga);
    else
        return res.status(404).json("Erro ao encontrar a vaga");
}

const uploadTesteController = async (req, res) => {
    const uploadTeste = await vagasModel.uploadTesteModel(req.body, req.file);
    return res.status(201).json(req.body);
}

module.exports = {
    listarVagasController,
    criarVagaController,
    uploadTesteController,
    obterCodigoVagaController,
    detalheVagaEspecificaController,
    deletarVagaController
};