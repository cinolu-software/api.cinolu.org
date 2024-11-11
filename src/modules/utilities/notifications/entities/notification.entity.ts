import { Column, Entity, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../../../core/users/entities/user.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { NotificationAttachment } from './attachment.entity';

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
