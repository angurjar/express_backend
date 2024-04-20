const nodemailer = require("nodemailer");
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
exports.transporter = nodemailer.createTransport({
  



  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});