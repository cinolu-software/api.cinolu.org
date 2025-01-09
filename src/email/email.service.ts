import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerSerive: MailerService) {}

  @OnEvent('user.reset-password')
  async resetEmail({ user, link }: { user: User; link: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Réinitialisation du mot de passe',
        template: 'reset-password',
        context: { user, link }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }

  @OnEvent('user.created')
  async createdEmail({ user, password }: { user: User; password: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Bienvenue sur cinolu.org',
        template: 'welcome',
        context: { user, password }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }
}
