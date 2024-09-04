const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const SmtpConfig = require("../models/SmtpConfig");

const sendEmail = async (subject, body) => {
    const smtpconfig = await SmtpConfig.findOne();
    const pass = smtpconfig.password;

    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: smtpconfig.service,
            host: smtpconfig.host,
            port: smtpconfig.port,
            secure: smtpconfig.secure, // true for 465, false for other ports
            auth: {
                user: smtpconfig.mail_address,
                pass: pass,
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
            from: smtpconfig.mail_address,
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
