/*Rotas API */
const express = require('express');

const usuariosController = require('./controllers/usuariosController');
const usuariosMiddleware = require('./middlewares/usuariosMiddleware');

const vagasController = require('./controllers/vagasController');
const vagasMiddleware = require('./middlewares/vagasMiddleware');

const router = express.Router();

router.all("*", function (req, res, next) {
    console.log(req.header("Authorization"));
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
  
    console.log(req.header("Authorization"));
    next();
  });

router.get('/vagas', vagasController.listarVagasController);
router.post('/vagas', vagasMiddleware.validateBody, vagasController.criarVagaController);

router.get('/usuarios', usuariosController.listarLoginController);
router.post('/usuarios', usuariosMiddleware.validateUser, usuariosController.cadastrarUsuarioController);

/*Rota pra linkar os detalhes */
router.get('/detalheVagas', vagasController.detalheVagaEspecifica);


module.exports = router;
