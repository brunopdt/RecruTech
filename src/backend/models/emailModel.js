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



const run = async () => {
  const mailSent = await transporter.sendMail({
    text: 'texto teste do email',
    subject: 'Assunto',
    from: 'Recrutech <recrutech@hotmail.com>',
    to: ['recrutech@hotmail.com']
  }).then(()=> console.log('Sucesso'))
    .catch((err) => console.log(err))
}

module.exports = {
  run
}