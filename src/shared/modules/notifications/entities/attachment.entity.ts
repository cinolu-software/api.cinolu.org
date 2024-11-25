import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../utils/base.entity';
import { Notification } from './notification.entity';

@Entity()
export class NotificationAttachment extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Notification, (notification) => notification.attachments)
  notification: Notification;
}
