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

const obterDadosEntrevistaController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const codigoCandidato = req.query.codCandidato;
  const dadosEntrevista = await processoSeletivoModel.obterDadosEntrevistaModel(codigoVaga, codigoCandidato);
  return res.status(200).json(dadosEntrevista);  
}

const obterQuantidadeVagasController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const qtdVagas = await processoSeletivoModel.obterQuantidadesVagasModel(codigoVaga);
  return res.status(200).json(qtdVagas);  
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

const atualizarCandidatoAprovadoController = async (req, res) => {
  const codigoCandidato = req.query.codCandidato;
  const codigoVaga = req.query.codVaga;
  const indAprovado = req.query.indAprovado;
  const indicadorAtualizado = await processoSeletivoModel.atualizarCandidatoAprovadoModel(codigoCandidato, codigoVaga, indAprovado);
  return res.status(200).json(indicadorAtualizado);
}

const atualizarIndiceAprovacaoTesteController = async (req, res) => {
  const codigoCandidato = req.query.codCandidato;
  const codigoVaga = req.query.codVaga;
  const indAprovado = req.query.indAprovado;
  const indicadorAtualizado = await processoSeletivoModel.atualizarIndiceAprovacaoTesteModel(codigoCandidato, codigoVaga, indAprovado);
  return res.status(200).json(indicadorAtualizado);
}

const atualizarIndiceAprovacaoEntrevistaController = async (req, res) => {
  const codigoCandidato = req.query.codCandidato;
  const codigoVaga = req.query.codVaga;
  const indAprovado = req.query.indAprovado;
  const indicadorAtualizado = await processoSeletivoModel.atualizarIndiceAprovacaoEntrevistaModel(codigoCandidato, codigoVaga, indAprovado);
  return res.status(200).json(indicadorAtualizado);
}

const atualizarDadosEntrevistaController = async (req, res) => {
  const codigoCandidato = req.query.codUsuario;
  const codigoVaga = req.query.codVaga;
  const dadosEntrevista = await processoSeletivoModel.atualizarDadosEntrevistaModel(codigoCandidato, codigoVaga, req.body);
  return res.status(200).json(dadosEntrevista);
}

const atualizarUsuariosContratadosController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const qtdUsuarios = await processoSeletivoModel.atualizarUsuariosContratadosModel(codigoVaga);
  return res.status(200).json(qtdUsuarios);
}

const fecharVagaController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const vagaFechada = await processoSeletivoModel.fecharVagaModel(codigoVaga);
  return res.status(200).json(vagaFechada);
}

const listarTestesVagaController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const listaTestes = await processoSeletivoModel.listarTestesVagaModel(codigoVaga);
  return res.status(200).json(listaTestes);
}

const listarCandidatosEntrevistaController = async (req, res) => {
  const codigoVaga = req.query.codVaga;
  const listaCandidatos = await processoSeletivoModel.listarCandidatosEntrevistaModel(codigoVaga);
  return res.status(200).json(listaCandidatos);
}

module.exports = {
    listarCurriculosController,
    listarCurriculosFiltradosController,
    listarVagasInscritasController,
    obterTesteVagaController,
    enviarTesteVagaController,
    obterStatusVagaController,
    obterDadosEntrevistaController,
    fecharVagaController,
    atualizarStatusVagaController,
    atualizarIndiceAprovacaoController,
    obterQuantidadeVagasController,
    atualizarUsuariosContratadosController,
    atualizarCandidatoAprovadoController,
    atualizarIndiceAprovacaoTesteController,
    atualizarDadosEntrevistaController,
    atualizarIndiceAprovacaoEntrevistaController,
    listarTestesVagaController,
    listarCandidatosEntrevistaController
};