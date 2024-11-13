import { Notification } from 'src/modules/utilities/notifications/entities/notification.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/utilities/entities/base.entity';

@Entity()
export class NotificationAttachment extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Notification, (notification) => notification.attachments)
  notification: Notification;
}
