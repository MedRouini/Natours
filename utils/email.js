const nodoemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ');
    this.url = url;
    this.from = `Mohamed Rouini <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      //SendGrid
      return 1;
    }
    return nodoemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };
    
    await this.createTransport().sendMail(mailOptions);
  
  }

  async sendWelcomeMail() {
    await this.sendMail('welcome', 'Welcome to the Natours Family !');
  }

  async sendPasswordResetEmail () {
    await this.sendMail(
      'passwordReset', 
      'Your password reset token (valid for only 10 minutes)'
    );
  }

}



