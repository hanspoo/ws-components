import * as nodemailer from 'nodemailer';
import { Mailer, SendMailArgs } from './Mailer';

export class NodeMailer implements Mailer {
  send(args: SendMailArgs) {
    const params: any = {
      host: process.env.VITE_SMTP_SERVER || 'smtp.gmail.com',
      port: process.env.VITE_SMTP_PORT || 587,
      auth: {
        user: process.env.VITE_SMTP_USER || '',
        pass: process.env.VITE_SMTP_PASS || '',
      },
    };
    const transporter = nodemailer.createTransport(params);
    // transporter.verify().then(console.log).catch(console.error);

    transporter.sendMail(args);
  }
}
