import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Venture } from './entities/venture.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VenturesEmail {
  constructor(private mailerService: MailerService) {}

  @OnEvent('venture.created')
  async sendBusinessCreatedEmail(venture: Venture): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: venture.owner.email,
        subject: 'Entreprise créée avec succès',
        template: 'business-created',
        context: { venture }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('venture.approved')
  async sendVentureApprovalEmail(venture: Venture): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: venture.owner.email,
        subject: 'Votre entreprise a été approuvée!',
        template: 'venture-approved',
        context: { venture }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('venture.rejected')
  async sendVentureRejectionEmail(venture: Venture): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: venture.owner.email,
        subject: 'Décision concernant votre entreprise',
        template: 'venture-rejected',
        context: { venture }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
