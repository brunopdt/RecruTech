const candVagaModel = require('../models/candidatoVagaModel');

const uploadCurriculoController = async (req, res) => {
  const uploadCurriculo = await candVagaModel.uploadCurriculoModel(req.body, req.file);
  return res.status(201).json(req.body);
}

module.exports = {
  uploadCurriculoController
};
