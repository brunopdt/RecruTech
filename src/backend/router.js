/*Rotas API */
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const usuariosController = require('./controllers/usuariosController');
const usuariosMiddleware = require('./middlewares/usuariosMiddleware');

const vagasController = require('./controllers/vagasController');
const vagasMiddleware = require('./middlewares/vagasMiddleware');

const candVagaController = require('./controllers/candidatoVagaController');

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
router.get('/vagas-codigo', vagasController.obterCodigoVagaController);
router.post('/vagas-teste', multer(multerConfig).single("file"), vagasController.uploadTesteController);

router.post('/curriculo', multer(multerConfig).single("file"), candVagaController.uploadCurriculoController);

router.get('/detalheVagas', vagasController.detalheVagaEspecificaController); /*Rota pra linkar os detalhes */

router.get('/usuarios', usuariosController.listarLoginController);
router.post('/usuarios', usuariosMiddleware.validateUser, usuariosController.cadastrarUsuarioController);

/* Configuração das rotas do servidor */

router.get('/', (req, res) => res.sendFile(__dirname.replace('backend', 'frontend/views/login.html')));
router.get('/cadastro-usuario', (req, res) => res.sendFile("cadastroUser.html", { root: 'frontend/views/' }));

router.get('/cadastro-vagas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("cadastroVagas.html", { root: 'frontend/views/' }))
router.get('/cadastro-teste', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("cadastrarTesteVaga.html", { root: 'frontend/views/' }))

router.get('/lista-vagas-empresa', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("listaDeVagasRH.html", { root: 'frontend/views/' }));
router.get('/lista-vagas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile("listaDeVagasUsuario.html", { root: 'frontend/views/' }));

router.get('/remove-vaga/(:id)', usuariosMiddleware.usuarioLogado, vagasController.deletarVagaController,);


router.post('/usuarios-logar', usuariosController.logarController);
router.get('/usuarios-deslogar', usuariosController.deslogarController);

module.exports = router;