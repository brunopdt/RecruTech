const emailModel = require('../models/emailModel');

const enviarEmailController = async (req, res) => {
  const sendEmail = await emailModel.run();
  return res.status(200).json(sendEmail);
};

module.exports = {
  enviarEmailController
}