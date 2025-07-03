import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsersEmailService {
  constructor(private readonly mailerSerive: MailerService) {}

  @OnEvent('user.added')
  async createUser({ user, password }: { user: User; password: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Bienvenue sur la plateforme Cinolu !',
        template: 'sign-up',
        context: { user, password }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
