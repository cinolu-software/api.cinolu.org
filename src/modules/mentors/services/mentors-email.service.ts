import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MentorProfile } from '../entities/mentor.entity';

@Injectable()
export class MentorsEmailService {
  constructor(private mailerService: MailerService) {}

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

  @OnEvent('mentor.application')
  async sendMentorApplicationEmail(mentorProfile: MentorProfile): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: mentorProfile.owner.email,
        subject: 'Candidature de mentor reçue',
        template: 'mentor-application',
        context: { mentorProfile }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
