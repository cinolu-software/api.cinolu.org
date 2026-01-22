import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@/modules/users/entities/user.entity';
import { ContactSupportDto } from '@/modules/users/dto/contact-support.dto';
import { MentorProfile } from '@/modules/mentors/entities/mentor.entity';

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
      await this.mailerService.sendMail({
        to: process.env.SUPPORT_EMAIL,
        subject: `One Stop Contact from ${dto.name}`,
        template: 'contact-us',
        context: { dto }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('mentor.approved')
  async sendMentorApprovalEmail(mentorProfile: MentorProfile): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: mentorProfile.owner.email,
        subject: 'Votre profil de mentor a été approuvé!',
        template: 'mentor-approved',
        context: { mentorProfile }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('mentor.rejected')
  async sendMentorRejectionEmail(mentorProfile: MentorProfile): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: mentorProfile.owner.email,
        subject: 'Décision concernant votre profil de mentor',
        template: 'mentor-rejected',
        context: { mentorProfile }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
