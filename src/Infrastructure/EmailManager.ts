var nodemailer = require("nodemailer");
var ejs = require("ejs");
var fs = require("fs");

export class EmailManager {
  static sendEMail(
    email: string,
    subject: string,
    body: string,
    attachments?: any
  ) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_ADDRESS,
      port: process.env.EMAIL_SMTP_PORT,
      secure: false, // true for 465, false for other ports
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

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
      transporter.close();
    });
  }

  static sendEMailByTemplate(
    template: string,
    email: string,
    subject: string,
    parameters?: any
  ) {
    var transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_ADDRESS,
      port: process.env.EMAIL_SMTP_PORT,
      secure: false, // true for 465, false for other ports
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

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
      transporter.close();
    });
  }
}
