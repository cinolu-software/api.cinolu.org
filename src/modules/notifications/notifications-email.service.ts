import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Notification } from './entities/notification.entity';

export class NotificationsEmailService {
  constructor(private mailerService: MailerService) {}

  @OnEvent('notification.created')
  async sendNotificationCreatedEmail(notification: Notification): Promise<void> {
    await this.sendNotificationEmail(notification, 'Nouvelle notification', 'created');
  }

  @OnEvent('notification.updated')
  async sendNotificationUpdatedEmail(notification: Notification): Promise<void> {
    await this.sendNotificationEmail(notification, 'Notification mise a jour', 'updated');
  }

  private async sendNotificationEmail(
    notification: Notification,
    subjectPrefix: string,
    action: 'created' | 'updated'
  ): Promise<void> {
    try {
      const recipients = (notification.recipients || []).map((recipient) => recipient.email).filter(Boolean);
      if (!recipients.length) return;
      await this.mailerService.sendMail({
        to: recipients,
        subject: `${subjectPrefix} : ${notification.title}`,
        template: 'notification',
        context: {
          notification,
          action,
          actionLabel: action === 'created' ? 'Nouvelle notification' : 'Notification mise a jour'
        }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
