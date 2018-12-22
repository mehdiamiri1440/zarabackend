"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var ejs = require("ejs");
var fs = require("fs");
class EmailManager {
    static sendEMail(email, subject, body, attachments) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_ADDRESS,
            port: process.env.EMAIL_SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            html: body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
            transporter.close();
        });
    }
    static sendEMailByTemplate(template, email, subject, parameters) {
        var transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_ADDRESS,
            port: process.env.EMAIL_SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var template_html = fs.readFileSync(template, { encoding: "utf-8" });
        var render_html = ejs.render(template_html, parameters);
        var mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            html: render_html
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
            transporter.close();
        });
    }
}
exports.EmailManager = EmailManager;
