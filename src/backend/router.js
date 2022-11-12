const express = require('express');

const vagasController = require('./controllers/vagasController');
const vagasMiddleware = require('./middlewares/vagasMiddleware');

const router = express.Router();

router.get('/vagas', vagasController.listarVagasController);
router.post('/vagas', vagasMiddleware.validateBody, vagasController.criarVagaController);

module.exports = router;