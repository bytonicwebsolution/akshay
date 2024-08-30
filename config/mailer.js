const router = require("express").Router();
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path')
require("dotenv").config();



const sendEmail = async (subject, body) => {
    const pass = process.env.MAIL_PASS;
    console.log(pass)
    console.log(subject,body)
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "akshayhiran04@gmail.com",
                pass: pass
            },
        });
        const email = subject;
        const first_name = body;
        // Read the HTML template
        const HTML_TEMPLATE = fs.readFileSync(
            path.join(__dirname, "../views/mail-templates/mail.html"),
            "utf8"
        );

        const mailOptions = {
            from: "akshayhiran04@gmail.com",
            to: email, // Use the email of the newly registered user
            subject: `Hi ${first_name}, Your registration was successful!`,
            html: HTML_TEMPLATE.replace("{{first_name}}", first_name), // Replace placeholder with the user's name if needed
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false);
            } else {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

module.exports = sendEmail;
