const nodemailer = require('nodemailer');

const SMTP_CONFIG = require('../config/smtp');

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  service: 'Outlook365',
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  }, tls: {
    ciphers: 'SSLv3'
  }

});



const run = async (usuario) => {
  const mailSent = await transporter.sendMail({
    text: 'Trouxemos uma grande novidade: você foi uma das pessoas selecionadas para a nossa proxima etapa, abra o site para mais informações!!',
    subject: 'Vaga',
    from: 'Recrutech <recrutech@hotmail.com>',
    to: [`${usuario.email}`]
  }).then(()=> console.log('Sucesso'))
    .catch((err) => console.log(err))
}

const runNegativo = async (usuario) => {
  const mailSent = await transporter.sendMail({
    text: 'Infelizmente você não foi selecionado para nossa proxima etapa!',
    subject: 'Vaga',
    from: 'Recrutech <recrutech@hotmail.com>',
    to: [`${usuario.email}`]
  }).then(()=> console.log('Sucesso'))
    .catch((err) => console.log(err))
}

module.exports = {
  run,
  runNegativo
}