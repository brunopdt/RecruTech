const express = require('express');

const usuariosController = require('./controllers/usuariosController');
const usuariosMiddleware = require('./middlewares/usuariosMiddleware');

const vagasController = require('./controllers/vagasController');
const vagasMiddleware = require('./middlewares/vagasMiddleware');


const router = express.Router();

router.get('/vagas', vagasController.listarVagasController);
router.post('/vagas', vagasMiddleware.validateBody, vagasController.criarVagaController);

router.get('/usuarios', usuariosController.listarLoginController);
router.post('/usuarios', usuariosMiddleware.validateUser, usuariosController.cadastrarUsuarioController);

module.exports = router;