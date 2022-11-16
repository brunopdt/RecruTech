
//Rotas pra integrar o front com o back 

const express = require('express');

const vagasController = require('./controllers/vagasController');

const router = express.Router();

router.use(express.json());

//dirname pega o diretorio
//tela de detalhes
router.get('/detalhes', (req, res ) =>{res.sendFile (__dirname.replace('backend', 'frontend/views/detalhesVaga.html'))});

//tela lista de vagas
router.get('/listaVagas', (req, res ) =>{res.sendFile (__dirname.replace('backend', 'frontend/views/listaDeVagasOFC.html'))});


module.exports = router;
