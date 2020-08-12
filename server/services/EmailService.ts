import Email from 'email-templates';
import { Request } from 'express';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import User from '../models/User';

const transport = nodemailer.createTransport(new SMTPTransport({
  host: process.env.MAIL_HOST as string,
  port: parseInt(process.env.MAIL_PORT!, 10),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
}));

const emailSender = new Email({
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(__dirname, '..', '..', 'assets', 'mail'),
    },
  },
  preview: true,
  message: {
    from: process.env.MAIL_USER,
  },
  transport,
});

class EmailService {
  public static async sendEmailToken(user: User, token: string, req: Request) {
    await emailSender.send({
      template: path.join(__dirname, '..', 'mails', 'reset'),
      locals: {
        name: user.name,
        url: `${req.protocol}://${req.hostname}/auth/unlock/${token}`,
        token,
      },
      message: {
        to: user.email,
        subject: 'Password reset',
      },
    });
  }
}

export default EmailService;
