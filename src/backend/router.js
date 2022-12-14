/*Rotas API */
const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const emailController = require('./controllers/emailController')

const usuariosController = require('./controllers/usuariosController')
const usuariosMiddleware = require('./middlewares/usuariosMiddleware')

const vagasController = require('./controllers/vagasController')
const vagasMiddleware = require('./middlewares/vagasMiddleware')

const candVagaController = require('./controllers/candidatoVagaController')

const processoSeletivoController = require('./controllers/processoSeletivoController')

const indicadoresController = require('./controllers/indicadorController')
const router = express.Router()

router.all('*', function (req, res, next) {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,Authorization ,Accept'
  )
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Expose-Headers', 'Authorization')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  )

  next()
})

router.get('/vagas', vagasController.listarVagasController)
router.post('/vagas', vagasMiddleware.validateBody, vagasController.criarVagaController)
router.post('/vagas-teste', multer(multerConfig).single('file'), vagasController.uploadTesteController)
router.get('/detalheVagas', vagasController.detalheVagaEspecificaController)
router.get('/detalheVagasUser', vagasController.detalheVagaEspecificaUserController)
router.get('/remove-vaga/(:id)', usuariosMiddleware.usuarioLogado, vagasController.deletarVagaController)

router.post('/inscrever-vaga', multer(multerConfig).single('file'), candVagaController.inscreverVagaController)

router.get('/usuarios', usuariosController.listarLoginController)
router.post('/usuarios', usuariosMiddleware.validateUser, usuariosController.cadastrarUsuarioController)
router.post('/usuarios-logar', usuariosController.logarController)
router.get('/usuarios-deslogar', usuariosController.deslogarController)

router.get('/enviar-email', usuariosMiddleware.usuarioLogado, emailController.enviarEmailController);
router.get('/enviar-email-final', usuariosMiddleware.usuarioLogado, emailController.enviarEmailFinalController);
router.get('/enviar-email-negativo', usuariosMiddleware.usuarioLogado, emailController.enviarEmailNegativoController);

router.get('/listar-curriculos', processoSeletivoController.listarCurriculosController);
router.get('/listar-curriculos-filtrados', processoSeletivoController.listarCurriculosFiltradosController);
router.get('/listar-testes-vagas', processoSeletivoController.listarTestesVagaController);
router.get('/listar-candidatos-entrevista', processoSeletivoController.listarCandidatosEntrevistaController);
router.get('/listar-vagas-inscritas', processoSeletivoController.listarVagasInscritasController);
router.get('/acompanhar-status-vaga', processoSeletivoController.obterStatusVagaController);
router.get('/obter-teste', processoSeletivoController.obterTesteVagaController);
router.get('/obter-dados-entrevista', processoSeletivoController.obterDadosEntrevistaController);
router.get('/obter-qtd-vagas', processoSeletivoController.obterQuantidadeVagasController);

router.put('/atualizar-status-vaga', processoSeletivoController.atualizarStatusVagaController);
router.put('/atualizar-indice-aprovacao', processoSeletivoController.atualizarIndiceAprovacaoController);
router.put('/atualizar-candidato-aprovado-vaga', processoSeletivoController.atualizarCandidatoAprovadoController);
router.put('/atualizar-indice-aprovacao-teste', processoSeletivoController.atualizarIndiceAprovacaoTesteController);
router.put('/atualizar-indice-aprovacao-entrevista', processoSeletivoController.atualizarIndiceAprovacaoEntrevistaController);
router.put('/atualizar-dados-entrevista', processoSeletivoController.atualizarDadosEntrevistaController);
router.put('/atualizar-quantidade-usuContratados', processoSeletivoController.atualizarUsuariosContratadosController);
router.put('/fechar-vaga', processoSeletivoController.fecharVagaController);

router.post('/enviar-teste', multer(multerConfig).single('file'), processoSeletivoController.enviarTesteVagaController)
router.get('/lista-vagas-criadas/:codigoUsuario', vagasController.vagasCriadasRH)
router.get('/indicador-taxa-vagas', indicadoresController.indicadorTaxaVagasController)
router.get('/indicador-taxa-vagas-canceladas', indicadoresController.indicadorTaxaVagasCanceladasController)
router.get('/indicador-contratados', indicadoresController.indicadorContratacaoController)
router.get('/indicador-testes-aprovados', indicadoresController.indicadorCandidatoAprovadoController)
/* Configuração das rotas do servidor */
router.get('/', (req, res) =>  res.sendFile('index.html', { root: '../frontend  ' }))
router.get('/cadastro-usuario', (req, res) => res.sendFile('cadastroUser.html', { root: 'frontend/views/' }))

router.get('/indicador-taxa-usuarios', indicadoresController.indicadorTaxaUsuariosController)

router.get('/cadastro-vagas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('cadastroVagas.html', { root: 'frontend/views/' }))
router.get('/cadastro-teste', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('cadastrarTesteVaga.html', { root: 'frontend/views/' }))

router.get('/lista-vagas-empresa', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('listaDeVagasRH.html', { root: 'frontend/views/' }))
router.get('/lista-vagas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('listaDeVagasUsuario.html', { root: 'frontend/views/' }))

router.get('/detalhe-da-vaga', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('detalhesVagaRH.html', { root: 'frontend/views/' }))
router.get('/detalhe-da-vaga-usuario', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('detalhesVagaUsuario.html', { root: 'frontend/views/' }))

router.get('/vagas-inscritas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('vagasInscritasUser.html', { root: 'frontend/views/' }))

router.get('/acompanhar-vaga-empresa', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('acompanharVagaRH.html', { root: 'frontend/views/' }))
router.get('/acompanhar-vaga', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('acompanharVagaUsuario.html', { root: 'frontend/views/' }))

router.get('/lista-curriculos', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('listaCurriculosVaga.html', { root: 'frontend/views/' }))
router.get('/lista-testes', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('ListaTestesRH.html', { root: 'frontend/views/' }))
router.get('/lista-entrevistas', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('listaEntrevistas.html', { root: 'frontend/views/' }))
router.get('/inscricao-user-vaga', usuariosMiddleware.usuarioLogado, (req, res) => res.sendFile('uploadCurriculo.html', { root: 'frontend/views/' }))

module.exports = router

router.get(
  '/inscricao-user-vaga',
  usuariosMiddleware.usuarioLogado,
  (req, res) =>
    res.sendFile('uploadCurriculo.html', { root: 'frontend/views/' })
)

//criando essa
router.get(
  '/lista-vagas-criadas/:codigoUsuario',
  usuariosMiddleware.usuarioLogado,
  vagasController.vagasCriadasRH
)

router.get('/indicadores', usuariosMiddleware.usuarioLogado, (req, res) =>
  res.sendFile('indicadores.html', { root: 'frontend/views/' })
)

