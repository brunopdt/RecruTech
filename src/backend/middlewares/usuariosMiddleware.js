const { isNullOrUndefined, isStringEmpty } = require('./globalMiddleware');
const jsonwebtoken = require('jsonwebtoken');

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

const usuarioLogado = async (req, res, next) => {
  const auth = req.cookies.Token || null;

  if (typeof (auth) == 'undefined' || auth == '' || auth == null)
    return res.send({ erro: { login: 'Não autorizado' } });
  else {
    try {
      const token = jsonwebtoken.verify(auth, 'SenhaMuitoForteProtegendoToken');
      next();
    } catch (e) {
      return res.send({ erro: { login: 'Não autorizado' } });
    }
  }
};

module.exports = {
  validateUser,
  usuarioLogado
}