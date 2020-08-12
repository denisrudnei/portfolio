import consola from 'consola';
import { Request } from 'express';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import User from '../models/User';

const transport = nodemailer.createTransport(new SMTPTransport({
  host: process.env.MAIL_HOST as string,
  port: parseInt(process.env.MAIL_PORT as string, 10),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}));

class EmailService {
  public static async sendEmailToken(user: User, token: string, req: Request) {
    const url = `${req.protocol}://${req.hostname}/auth/unblock/${token}`;
    transport.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      subject: 'Desbloquear conta',
      html: `Clique <a href="${url}">aqui</a> para desbloquear a conta`,
    }).then((message) => {
      consola.info(message);
    });
  }
}

export default EmailService;
