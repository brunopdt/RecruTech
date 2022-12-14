const indicadorModel = require ('../models/indicadorModel');

const indicadorTaxaVagasController = async(req, res) => {
    const dados = await indicadorModel.indicadorTaxaVagasCriadasModel();
    let qtdTotalVagas = dados[0].qtdTotaisVagas;
    let qtdVagasMes = dados[0].qtdVagasMes;
    let taxaVagasMensais = parseFloat((qtdVagasMes/qtdTotalVagas)*100).toFixed(2);
    return res.status(200).send(taxaVagasMensais);
}

const indicadorTaxaUsuariosController = async(req, res) => {
    const dados = await indicadorModel.indicadorTaxaUsuariosCriadosModel();
    let qtdTotalUsuarios = dados[0].qtdTotaisUsuarios;
    let qtdUsuariosMes = dados[0].qtdUsuariosMes;
    let taxaUsuariosMensais = parseFloat((qtdUsuariosMes/qtdTotalUsuarios)*100).toFixed(2);
    return res.status(200).send(taxaUsuariosMensais);
}

module.exports = {
    indicadorTaxaVagasController,
    indicadorTaxaUsuariosController
}