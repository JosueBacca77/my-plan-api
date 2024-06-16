import nodemailer, { Transporter } from 'nodemailer';
import { join } from 'path';
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import { EMAIL, EMAIL_INVITATION } from './constants';

interface InvitationEmailData {
  firstName: string;
  token: string;
  to: string;
}

interface EmailOptions {
  template: string;
  to: string;
  subject: string;
  context: object;
}

export class EmailService {
  private transporter: Transporter;

  constructor() {
    console.log(__dirname)
    this.createHandleBarsTransporter();
  };

  async createHandleBarsTransporter(){
    this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const handlebarsOptions = {
        viewEngine: {
          extName: '.hbs',
          partialsDir: join(__dirname, 'views'),
          layoutsDir: join(__dirname, 'views'),
          defaultLayout: '',
        },
        viewPath: join(__dirname, 'views'),
        extName: '.hbs',
      };
  
      this.transporter.use('compile', nodemailerExpressHandlebars(handlebarsOptions));
  }

  async sendMail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: `${EMAIL.FROM} <${process.env.EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      template: options.template,
      context: options.context,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendInvitation(options: InvitationEmailData): Promise<void> {
    
    try {
      await this.sendMail({
        to: options.to,
        subject: EMAIL_INVITATION.SUBJECT,
        template: EMAIL_INVITATION.TEMPLATE,
        context: { firstName:options.firstName, url: `${EMAIL_INVITATION.URL}?token=${options.token}` },
      });
    } catch (error) {
      console.error('Error sending invitation email:', error);
    }
  }
}

// // Ejemplo de uso
// (async () => {
//   const emailService = new EmailService();
//   await emailService.sendMail({
//     to: 'recipient@example.com',
//     subject: 'Welcome to Our Service',
//     template: 'welcome',
//     context: { firstName: 'John', url: 'https://example.com' },
//   });
// })();
