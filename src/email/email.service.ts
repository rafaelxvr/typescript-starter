import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendDummyEmail(recipient: string, subject: string, body: string): Promise<void> {
    /*await this.mailerService.sendMail({
      to: recipient,
      subject: subject,
      template: path.join(__dirname, '..', 'email', 'template.hbs'),
      context: {
        body: body
      }
    });*/
  }
}
