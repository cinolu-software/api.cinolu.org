import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { User } from '@/modules/users/entities/user.entity';
import { NotificationAttachment } from './attachment.entity';

@Entity()
export class Notification extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'datetime', nullable: true })
  read_at: Date;

  @ManyToOne(() => User, (user) => user.sent_notifications)
  @JoinColumn()
  sender: User;

  @ManyToMany(() => User, (user) => user.received_notifications)
  @JoinTable()
  recipients: User[];

  @OneToMany(() => NotificationAttachment, (attachment) => attachment.notification)
  attachments: NotificationAttachment[];
}
