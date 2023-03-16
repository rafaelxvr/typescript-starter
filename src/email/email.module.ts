import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: '',
        port: '',
        secure: false,
        auth: {
          user: '',
          pass: ''
        }
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>'
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class MailModule {}
