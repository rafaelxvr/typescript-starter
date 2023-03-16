import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

describe('EmailService', () => {
  let emailService: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn()
          }
        }
      ]
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendDummyEmail', () => {
    it('should call mailerService.sendMail with correct arguments', async () => {
      const recipient = 'test@test.com';
      const subject = 'Test Subject';
      const body = 'Test Body';

      const sendMailSpy = jest.spyOn(mailerService, 'sendMail');

      await emailService.sendDummyEmail(recipient, subject, body);

      expect(sendMailSpy).toHaveBeenCalledWith({
        to: recipient,
        subject: subject,
        template: path.join(__dirname, '..', 'email', 'template.hbs'),
        context: {
          body: body
        }
      });
    });
  });
});
