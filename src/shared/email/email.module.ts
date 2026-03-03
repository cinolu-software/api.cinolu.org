import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: +configService.get('MAIL_PORT'),
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD')
          }
        },
        defaults: {
          from: `Support CINOLU <${configService.get('MAIL_USERNAME')}>`
        },
        isGlobal: true
      })
    })
  ]
})
export class EmailModule {}
