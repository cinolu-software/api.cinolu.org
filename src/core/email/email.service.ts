import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@/modules/users/entities/user.entity';
import { ContactSupportDto } from '@/modules/users/dto/contact-support.dto';
import { MentorProfile } from '@/modules/mentors/entities/mentor.entity';
import { Venture } from '@/modules/ventures/entities/venture.entity';

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

  @OnEvent('user.welcome')
  async sendWelcomeEmail(user: User): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Bienvenue sur CINOLU',
        template: 'welcome',
        context: { user }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('user.welcome-with-credentials')
  async sendWelcomeWithCredentialsEmail(payload: { user: User; password: string }): Promise<void> {
    try {
      const { user, password } = payload;
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Bienvenue sur CINOLU - Vos identifiants de connexion',
        template: 'welcome-with-credentials',
        context: { user, password }
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
