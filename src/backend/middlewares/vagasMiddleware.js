const { isNullOrUndefined, isStringEmpty, isSeniorityValid, isNumberValid } = require('./globalMiddleware');

const validateBody = (req, res, next) => {
    const { body } = req;

    if (isNullOrUndefined(body.descricao) || isNullOrUndefined(body.qtdVagas) || isNullOrUndefined(body.requisitos) ||
        isNullOrUndefined(body.senioridade) || isNullOrUndefined(body.codigoStatus) || isNullOrUndefined(body.tempoExperienciaVaga)) {
        return res.status(400).json({ message: 'Erro ao cadastrar vaga, todos os dados devem estar preenchidos' });
    }

    if (isStringEmpty(body.descricao) || !isNumberValid(body.qtdVagas) || isStringEmpty(body.requisitos) ||
        isStringEmpty(body.senioridade) || !isNumberValid(body.codigoStatus) || !isNumberValid(body.tempoExperienciaVaga)) {
        return res.status(400).json({ message: 'Erro ao cadastrar vaga, os campos devem estar preenchidos corretamente' });
    }

    if(!isSeniorityValid(body.senioridade)){
        return res.status(400).json({ message: 'Erro ao cadastrar vaga, o campo senioridade está preenchido incorretamente' });
    }

    next();
};

module.exports = {
    validateBody
};