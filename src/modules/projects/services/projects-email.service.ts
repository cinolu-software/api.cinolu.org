import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { existsSync } from 'fs';
import { join } from 'path';
import { htmlToText } from 'html-to-text';
import { User } from '@/modules/users/entities/user.entity';
import { Notification } from '@/modules/notifications/entities/notification.entity';

@Injectable()
export class ProjectsEmailService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('notify.participants')
  async notifyParticipants(recipients: User[] = [], notification: Notification): Promise<void> {
    const emails = Array.from(
      new Set(
        recipients
          .map((recipient) => recipient?.email?.trim())
          .filter((email): email is string => Boolean(email))
      )
    );
    if (emails.length === 0) return;
    const attachments = this.resolveExistingAttachments(notification);
    const subject = `${notification.project?.name ?? 'Project'} - ${notification.title}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
        <p><strong>Projet:</strong> ${notification.project?.name}</p>
        <p><strong>Titre:</strong> ${notification.title}</p>
        <hr />
        ${notification.body ?? ''}
      </div>
    `;
    const text = htmlToText(html, {
      wordwrap: 120,
      selectors: [{ selector: 'img', format: 'skip' }]
    });

    try {
      await this.mailerService.sendMail({
        to: emails,
        subject,
        html,
        text,
        ...(attachments?.length ? { attachments } : {})
      });
    } catch {
      throw new BadRequestException();
    }
  }

  private resolveExistingAttachments(notification: Notification) {
    const files = (notification.attachments || [])
      .map((attachment) => {
        const filePath = join(process.cwd(), 'uploads', 'notifications', attachment.filename);
        if (!existsSync(filePath)) return null;
        return { filename: attachment.filename, path: filePath };
      })
      .filter((a) => a !== null);
    return files.length ? files : undefined;
  }
}
