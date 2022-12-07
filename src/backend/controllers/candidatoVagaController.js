const candVagaModel = require('../models/candidatoVagaModel');

const inscreverVagaController = async (req, res) => {
  const retornoInscricaoVaga = await candVagaModel.inscreverVagaModel(req.body, req.file);
  return res.status(201).json(req.body);  
}
module.exports = {
  inscreverVagaController
};
