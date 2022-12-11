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

module.exports = {
    listarCurriculosController,
    listarCurriculosFiltradosController,
    listarVagasInscritasController,
    obterTesteVagaController
};