const processoSeletivoModel = require('../models/processoSeletivoModel');

const listarCurriculosController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const listaCurriculos = await processoSeletivoModel.listarCurriculosModel(codigoVaga);
  return res.status(200).json(listaCurriculos);;  
}

const listarCurriculosFiltradosController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const listaCurriculos = await processoSeletivoModel.listarCurriculosFiltradosModel(codigoVaga);
  return res.status(200).json(listaCurriculos);;  
}

const listarVagasInscritasController = async (req, res) => {
  const codigoUsuario = req.query.codUser;
  const listaCurriculos = await processoSeletivoModel.listarVagasInscritasModel(codigoUsuario);
  return res.status(200).json(listaCurriculos);;  
}

const obterTesteVagaController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const teste = await processoSeletivoModel.obterTesteVagaModel(codigoVaga);
  return res.status(200).json(teste);  
}

const enviarTesteVagaController = async (req, res) => {
  const uploadTeste = await processoSeletivoModel.uploadTesteModel(req.body, req.file);
  return res.status(201).json(req.body);
}

const obterStatusVagaController = async (req, res) => {
  const codigoCandidato = req.query.codCandidato;
  const codigoVaga = req.query.codVaga;
  const statusVaga = await processoSeletivoModel.obterStatusVagaModel(codigoCandidato, codigoVaga);
  return res.status(200).json(statusVaga);
}

const atualizarStatusVagaController = async (req, res) => {
  const codigoCandidato = req.query.codCandidato;
  const codigoVaga = req.query.codVaga;
  const status = req.query.status;
  const vagaAtualizada = await processoSeletivoModel.atualizarStatusVagaModel(codigoCandidato, codigoVaga, status);
  return res.status(200).json(vagaAtualizada);
}

const atualizarIndiceAprovacaoController = async (req, res) => {
  const codigoCandidato = req.query.codCandidato;
  const codigoVaga = req.query.codVaga;
  const indAprovado = req.query.indAprovado;
  const indicadorAtualizado = await processoSeletivoModel.atualizarIndiceAprovacaoModel(codigoCandidato, codigoVaga, indAprovado);
  return res.status(200).json(indicadorAtualizado);
}

const listarTestesVagaController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const listaTestes = await processoSeletivoModel.listarTestesVagaModel(codigoVaga);
  return res.status(200).json(listaTestes);
}

module.exports = {
    listarCurriculosController,
    listarCurriculosFiltradosController,
    listarVagasInscritasController,
    obterTesteVagaController,
    enviarTesteVagaController,
    obterStatusVagaController,
    atualizarStatusVagaController,
    atualizarIndiceAprovacaoController,
    listarTestesVagaController
};