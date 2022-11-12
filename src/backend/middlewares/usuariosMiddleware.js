const { isNullOrUndefined, isStringEmpty } = require('./globalMiddleware');

const validateUser = (req, res, next) => {
  const { body } = req;

  if (isNullOrUndefined(body.nome) || isNullOrUndefined(body.email) || isNullOrUndefined(body.senha) ||
      isNullOrUndefined(body.tipoCadastro)) {
      return res.status(400).json({ message: 'Erro ao cadastrar vaga, todos os dados devem estar preenchidos' });
  }

  if (isStringEmpty(body.nome) || isStringEmpty(body.email) ||
  isStringEmpty(body.senha) || isStringEmpty(body.tipoCadastro)) {
  return res.status(400).json({ message: 'Erro ao cadastrar vaga, os campos devem estar preenchidos corretamente' });
}


  next();
};

module.exports = {
  validateUser
}