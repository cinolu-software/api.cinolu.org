import { Notification } from '@core/modules/notifications/entities/notification.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';

@Entity()
export class NotificationAttachment extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Notification, (notification) => notification.attachments)
  notification: Notification;
}
