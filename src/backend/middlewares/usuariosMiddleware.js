const { isNullOrUndefined, isStringEmpty } = require('globalMiddleware');

const validateUser = (req, res, next) => {
  const { user } = req;

  if (isNullOrUndefined(user.nome) || isNullOrUndefined(user.email) || isNullOrUndefined(user.senha) ||
      isNullOrUndefined(user.tipoCadastro)) {
      return res.status(400).json({ message: 'Erro ao cadastrar vaga, todos os dados devem estar preenchidos' });
  }

  if (isStringEmpty(user.nome) || isStringEmpty(user.email) ||
      isStringEmpty(user.senha) || isStringEmpty(user.tipoCadastro)) {
      return res.status(400).json({ message: 'Erro ao cadastrar vaga, os campos devem estar preenchidos corretamente' });
  }


  next();
};

module.exports = {
  validateUser
}