

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
  isNullOrUndefined,
  isStringEmpty,
  isNumberValid,
  isSeniorityValid
};