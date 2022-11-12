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

const isNullOrUndefined = (campo) => {
    if (campo === null || campo === undefined) {
        return true;
    }
    return false;
}

const isStringEmpty = (varString) => {
    if (varString === " ") {
        return true;
    }
    return false;
}

const isNumberValid = (varNumber) => {
    if (varNumber < 0) {
        return false
    }
    return true;
}

const isSeniorityValid = (senioridade) => {
    if(senioridade != 'estagiario' && senioridade != 'junior' && senioridade != 'pleno' && senioridade != 'senior'){
        return false;
    }
    return true;
}

module.exports = {
    validateBody
};