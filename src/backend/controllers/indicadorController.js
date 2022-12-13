const indicadorModel =  require('../models/indicadorModel');

const indicadorController = async(req, res) => {
    const dados = await indicadorModel.indicadorTaxaVagasCriadas();
    console.log(JSON.parse(dados))
    return res.json(dados);
}

module.exports = {
    indicadorController
}