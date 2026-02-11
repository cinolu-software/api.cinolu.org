import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { existsSync } from 'fs';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Notification } from '../notifications/entities/notification.entity';

@Injectable()
export class ProjectsEmailService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('notify.participants')
  async notifyParticipants(recipients: User[], notification: Notification): Promise<void> {
    try {
      const rcp = (recipients || []).map((recipient) => recipient.email).filter(Boolean);
      if (!rcp.length) return;
      const attachmentFiles = (notification.attachments || [])
        .map((attachment) => {
          const filePath = join(process.cwd(), 'uploads', 'notifications', attachment.filename);
          if (!existsSync(filePath)) return null;
          return { filename: attachment.filename, path: filePath };
        })
        .filter((a): a is { filename: string; path: string } => a !== null);
      await this.mailerService.sendMail({
        to: rcp,
        subject: `${notification.project.name} — ${notification.title}`,
        template: 'project-notification',
        context: { recipients, notification },
        ...(attachmentFiles.length && { attachments: attachmentFiles })
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException();
    }
  }
}
