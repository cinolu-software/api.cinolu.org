import { Column, Entity, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { NotificationAttachment } from './attachment.entity';
import { User } from '../../users/users/entities/user.entity';
import { BaseEntity } from '../../../shared/utils/base.entity';

@Entity()
export class Notification extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ nullable: true })
  to_group: string;

  @Column({ nullable: true })
  to_all: boolean;

  @Column({ default: true })
  is_sent: boolean;

  @ManyToMany(() => User, (user) => user.notifications)
  recipients: User[];

  @OneToMany(() => NotificationAttachment, (attachment) => attachment.notification)
  attachments: NotificationAttachment[];
}
