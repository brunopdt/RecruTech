-- -----------------------------------------------------
-- Table mysql_recrutech.usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mysql_recrutech.usuario (
  codigoUsuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(300) NOT NULL,
  tipoCadastro SET('candidato', 'rh') NULL DEFAULT NULL,
  curriculo BLOB NULL DEFAULT NULL,
  dataCriacaoUsuario TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (codigoUsuario))

-- -----------------------------------------------------
-- Table mysql_recrutech.status_vaga
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mysql_recrutech.status_vaga (
  codigoStatus INT NOT NULL,
  dscStatus VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (codigoStatus))

-- -----------------------------------------------------
-- Table mysql_recrutech.vaga
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mysql_recrutech.vaga (
  codigoVaga INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(1000) NULL DEFAULT NULL,
  qtdVagas INT NULL DEFAULT NULL,
  requisitos VARCHAR(250) NULL DEFAULT NULL,
  senioridade SET('estagiario', 'junior', 'pleno', 'senior') NULL DEFAULT NULL,
  codigoStatus INT NULL DEFAULT NULL,
  tempoExperienciaVaga INT NOT NULL,
  tituloVaga VARCHAR(100) NULL DEFAULT NULL,
  localModalidade VARCHAR(100) NULL DEFAULT NULL,
  dataCriacaoVaga TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  urlTeste VARCHAR(300) NULL DEFAULT NULL,
  codigoUsuario INT NULL DEFAULT NULL,
  qtdUsuariosContratados INT NULL DEFAULT '0',
  PRIMARY KEY (codigoVaga),
  INDEX codigoStatus (codigoStatus ASC) VISIBLE,
  INDEX fk_usuario (codigoUsuario ASC) VISIBLE,
  CONSTRAINT fk_usuario
    FOREIGN KEY (codigoUsuario)
    REFERENCES mysql_recrutech.usuario (codigoUsuario),
  CONSTRAINT vaga_ibfk_1
    FOREIGN KEY (codigoStatus)
    REFERENCES mysql_recrutech.status_vaga (codigoStatus))

-- -----------------------------------------------------
-- Table mysql_recrutech.candidato_vaga
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mysql_recrutech.candidato_vaga (
  codigoCandidato INT NOT NULL,
  codigoVaga INT NOT NULL,
  tempoExperiencia INT NULL DEFAULT NULL,
  curriculo VARCHAR(300) NULL DEFAULT NULL,
  statusInscricao INT NOT NULL DEFAULT '1',
  linkEntrevista VARCHAR(150) NULL DEFAULT NULL,
  indCurriculoAprovado TINYINT(1) NULL DEFAULT NULL,
  indEntrevistaAprovada TINYINT(1) NULL DEFAULT NULL,
  indCandidatoContratado TINYINT(1) NULL DEFAULT NULL,
  dataEntrevista DATE NULL DEFAULT NULL,
  horaEntrevista VARCHAR(15) NULL DEFAULT NULL,
  dataContratacao TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (codigoCandidato, codigoVaga),
  INDEX codigoVaga (codigoVaga ASC) VISIBLE,
  CONSTRAINT candidato_vaga_ibfk_1
    FOREIGN KEY (codigoCandidato)
    REFERENCES mysql_recrutech.usuario (codigoUsuario),
  CONSTRAINT candidato_vaga_ibfk_2
    FOREIGN KEY (codigoVaga)
    REFERENCES mysql_recrutech.vaga (codigoVaga))

-- -----------------------------------------------------
-- Table mysql_recrutech.teste_candidato
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mysql_recrutech.teste_candidato (
  codigoCandidato INT NOT NULL,
  codigoVaga INT NOT NULL,
  urlTeste VARCHAR(300) NULL DEFAULT NULL,
  dataEnvioTeste TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  indTesteAprovado TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (codigoCandidato, codigoVaga),
  INDEX codigoVaga (codigoVaga ASC) VISIBLE,
  CONSTRAINT teste_candidato_ibfk_1
    FOREIGN KEY (codigoCandidato)
    REFERENCES mysql_recrutech.usuario (codigoUsuario),
  CONSTRAINT teste_candidato_ibfk_2
    FOREIGN KEY (codigoVaga)
    REFERENCES mysql_recrutech.vaga (codigoVaga))

-- -----------------------------------------------------
-- Table mysql_recrutech.teste_vaga
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mysql_recrutech.teste_vaga (
  codigoTeste INT NOT NULL AUTO_INCREMENT,
  codigoVaga INT NOT NULL,
  urlTeste VARCHAR(300) NULL DEFAULT NULL,
  dataCriacaoTeste TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  indAprovado TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (codigoTeste, codigoVaga),
  INDEX codigoVaga (codigoVaga ASC) VISIBLE,
  CONSTRAINT teste_vaga_ibfk_1
    FOREIGN KEY (codigoVaga)
    REFERENCES mysql_recrutech.vaga (codigoVaga))
