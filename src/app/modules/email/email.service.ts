import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/app/modules/users/entities/user.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  constructor(private readonly mailerSerive: MailerService) {}

  @OnEvent('user.reset-password')
  async resetEmail({ user, token }: { user: User; token: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Réinitialisation du mot de passe',
        template: 'reset-password',
        context: { user, token }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }

  @OnEvent('user.notify')
  async notify({ user, link }: { user: User; link: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Réinitialisation du mot de passe',
        template: 'notification',
        context: { user, link }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }

  @OnEvent('user.sign-up')
  async signUpEmail({ user, token }: { user: User; token: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Vérifiez votre adresse email pour compléter votre inscription',
        template: 'registration',
        context: { user, token }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }
}
