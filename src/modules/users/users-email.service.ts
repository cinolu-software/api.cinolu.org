import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersEmailService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('user.referral-signup')
  async sendReferralSignupEmail(payload: { referredBy: User; newUser: User }): Promise<void> {
    try {
      const { referredBy, newUser } = payload;
      await this.mailerService.sendMail({
        to: referredBy.email,
        subject: 'Un nouvel utilisateur a rejoint CINOLU grâce à votre lien de parrainage',
        template: 'referral-signup',
        context: { referredBy, newUser }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
