import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';
import { EmailService } from './email.service';

config({
  path: '.env'
});

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        secure: true,
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      },
      defaults: {
        from: `Support CINOLU <${process.env.MAIL_USERNAME}>`
      },
      template: {
        dir: process.cwd() + '/templates/',
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
export class EmailModule {}
