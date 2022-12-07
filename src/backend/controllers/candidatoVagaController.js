const candVagaModel = require('../models/candidatoVagaModel');

const inscreverVagaController = async (req, res) => {
  const retornoInscricaoVaga = await candVagaModel.inscreverVagaModel(req.body);
  return res.status(201).json(req.body);  
}

const uploadCurriculoController = async (req, res) => {
  const uploadCurriculo = await candVagaModel.uploadCurriculoModel(req.body, req.file);
  return res.status(201).json(req.body);
}

module.exports = {
  uploadCurriculoController,
  inscreverVagaController
};
