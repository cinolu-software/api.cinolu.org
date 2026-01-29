import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '@/modules/users/entities/user.entity';
import { ContactSupportDto } from '@/modules/users/dto/contact-support.dto';
import { MentorProfile } from '@/modules/mentors/entities/mentor.entity';
import { Venture } from '@/modules/ventures/entities/venture.entity';
import { Program } from '@/modules/programs/entities/program.entity';
import { Event } from '@/modules/events/entities/event.entity';
import { Project } from '@/modules/projects/entities/project.entity';
import { Article } from '@/modules/blog/articles/entities/article.entity';
import { Opportunity } from '@/modules/opportunities/entities/opportunity.entity';
import { UsersService } from '@/modules/users/users.service';

interface ResetPasswordDto {
  user: User;
  link: string;
}

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService
  ) {}

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

  @OnEvent('activity.added')
  async sendActivityAddedEmail(payload: { activity: Program | Event | Project; type: string }): Promise<void> {
    try {
      const { activity, type } = payload;
      const activityName = (activity as Program | Event | Project).name || '';
      const activityDescription = (activity as Program | Event | Project).description || '';
      const users = await this.usersService.findAllEmails();
      for (const email of users) {
        await this.mailerService.sendMail({
          to: email,
          subject: `Nouvelle activité ${type} ajoutée`,
          template: 'activity-added',
          context: { activityType: type, activityName, activityDescription }
        });
      }
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('article.published')
  async sendArticlePublishedEmail(article: Article): Promise<void> {
    try {
      const users = await this.usersService.findAllEmails();
      for (const email of users) {
        await this.mailerService.sendMail({
          to: email,
          subject: `Nouvel article publié: ${article.title}`,
          template: 'article-published',
          context: { article }
        });
      }
    } catch {
      throw new BadRequestException();
    }
  }

  @OnEvent('opportunity.published')
  async sendOpportunityPublishedEmail(opportunity: Opportunity): Promise<void> {
    try {
      const users = await this.usersService.findAllEmails();
      for (const email of users) {
        await this.mailerService.sendMail({
          to: email,
          subject: `Nouvelle opportunité: ${opportunity.title}`,
          template: 'opportunity-published',
          context: { opportunity }
        });
      }
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
