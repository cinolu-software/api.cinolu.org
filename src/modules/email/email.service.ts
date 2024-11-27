import { BadRequestException, Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { Notification } from '../notifications/entities/notification.entity';
import { User } from '../users/users/entities/user.entity';

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

  @OnEvent('user.notify')
  async notifyUser({ user, data }: { user: User; data: Notification }) {
    try {
      const message: ISendMailOptions = {
        to: user.email,
        subject: data.title,
        template: 'notification',
        context: { user, data }
      };
      if (data.attachments)
        message.attachments = data.attachments.map((att) => ({
          path: process.cwd() + '/uploads/attachments/' + att.name,
          filename: att.name,
          contentDisposition: 'attachment'
        }));
      await this.mailerSerive.sendMail(message);
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }

  @OnEvent('user.sign-up')
  async signUpEmail({ user, link }: { user: User; link: string }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Vérifiez votre adresse email pour compléter votre inscription',
        template: 'registration',
        context: { user, link }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }

  @OnEvent('user.created')
  async createdEmail({ user }: { user: User }): Promise<void> {
    try {
      await this.mailerSerive.sendMail({
        to: user.email,
        subject: 'Bienvenue sur cinolu.org',
        template: 'welcome',
        context: { user }
      });
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }
}
