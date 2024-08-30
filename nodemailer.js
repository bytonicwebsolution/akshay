const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require("dotenv").config();

const pass = process.env.APP_SETTINGS_PASSWORD_GMAIL;
// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'akshayhiran04@gmail.com',
    pass: pass
  }
});

// Read the HTML template
const HTML_TEMPLATE = fs.readFileSync(path.join(__dirname, 'mail.html'), 'utf8');

// Define the email options
const mailOptions = {
  from: 'akshayhiran04@gmail.com',
  to: 'akshaykumarhiran2@gmail.com',
  subject: 'Your order is Placed!',
  text: 'Your order has been placed successfully. Please check the attached HTML version for details.',
  html: HTML_TEMPLATE
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred: ' + error.message);
  } else {
    console.log('Message sent: ' + info.response);
  }
});
