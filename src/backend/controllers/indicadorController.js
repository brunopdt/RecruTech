const indicadorTaxaVagasController = async(req, res) => {
    const dados = await indicadorModel.indicadorTaxaVagasCriadasModel();
    let qtdTotalVagas = dados[0].qtdTotaisVagas;
    let qtdVagasMes = dados[0].qtdVagasMes;
    let taxaVagasMensais = parseFloat((qtdVagasMes/qtdTotalVagas)*100).toFixed(2);
    return res.status(200).send(taxaVagasMensais);
}

module.exports = {
    indicadorTaxaVagasController
}