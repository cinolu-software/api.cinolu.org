import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../users/entities/user.entity';
import { ContactSupportDto } from '../users/dto/contact-support.dto';

interface ResetPasswordDto {
  user: User;
  link: string;
}

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('user.reset-password')
  async resetEmail(dto: ResetPasswordDto): Promise<void> {
    try {
      const { user, link } = dto;
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Réinitialisation du mot de passe',
        template: 'reset-password',
        context: { user, link }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('contact.support')
  async contactSupport(dto: ContactSupportDto): Promise<void> {
    try {
      const { name } = dto;
      await this.mailerService.sendMail({
        to: process.env.SUPPORT_EMAIL,
        subject: `One Stop Contact from ${name}`,
        text: `Email: ${dto.email}\nName: ${name}\nCountry: ${dto.country}\nPhone: ${dto.phone}\nMessage: ${dto.message}`
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
