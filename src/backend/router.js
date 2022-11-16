/*Rotas API */
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const usuariosController = require('./controllers/usuariosController');
const usuariosMiddleware = require('./middlewares/usuariosMiddleware');

const vagasController = require('./controllers/vagasController');
const vagasMiddleware = require('./middlewares/vagasMiddleware');

const router = express.Router();

router.all("*", function (req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type,Authorization ,Accept"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );

    next();
  });

router.get('/vagas', vagasController.listarVagasController);
router.post('/vagas', vagasMiddleware.validateBody, vagasController.criarVagaController);
router.post('/vagas-teste', multer(multerConfig).single("file"), vagasController.uploadTesteController);

router.get('/usuarios', usuariosController.listarLoginController);
router.post('/usuarios', usuariosMiddleware.validateUser, usuariosController.cadastrarUsuarioController);

/*Rota pra linkar os detalhes */
router.get('/detalheVagas', vagasController.detalheVagaEspecifica);


module.exports = router;
