import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { existsSync } from 'fs';
import { join } from 'path';
import { User } from '@/modules/users/entities/user.entity';
import { Notification } from '@/modules/notifications/entities/notification.entity';

type MailAttachment = {
  filename: string;
  path: string;
};

@Injectable()
export class ProjectsEmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('notify.participants')
  async notifyParticipants(recipients: User[], notification: Notification): Promise<void> {
    try {
      const validRecipients = (recipients || []).filter((recipient) => recipient?.email);
      const attachments = this.resolveExistingAttachments(notification);
      const subject = `${notification.project.name} — ${notification.title}`;
      await Promise.all(
        validRecipients.map(async (recipient) => {
          await this.mailerService.sendMail({
            to: recipient.email,
            subject,
            text: [
              `Bonjour ${recipient.name},`,
              '',
              `Projet: ${notification.project.name}`,
              `Titre: ${notification.title}`,
              '',
              notification.body,
              '',
              `Expediteur: ${notification.sender?.name ?? 'CINOLU'}`
            ].join('\n'),
            ...(attachments && { attachments })
          });
        })
      );
    } catch {
      throw new BadRequestException();
    }
  }

  private resolveExistingAttachments(notification: Notification): MailAttachment[] | undefined {
    const files = (notification.attachments || [])
      .map((attachment) => {
        const filePath = join(process.cwd(), 'uploads', 'notifications', attachment.filename);
        if (!existsSync(filePath)) {
          return null;
        }
        return { filename: attachment.filename, path: filePath };
      })
      .filter((attachment): attachment is MailAttachment => attachment !== null);
    return files.length ? files : undefined;
  }
}
