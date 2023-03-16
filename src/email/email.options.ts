import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const MAILER_OPTIONS: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>'
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true
    }
  }
};
