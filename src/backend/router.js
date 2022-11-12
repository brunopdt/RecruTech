const express = require('express');
const vagasController = require('./controllers/vagasController');

const router = express.Router();

router.get('/vagas', vagasController.getAll);

module.exports = router;