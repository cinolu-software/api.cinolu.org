import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Notification } from './notification.entity';

@Entity()
@Unique(['notification.id', 'user.id'])
export class Recipient extends AbstractEntity {
  @ManyToOne(() => Notification, (notification) => notification.recipients, { onDelete: 'CASCADE' })
  @JoinColumn()
  notification: Notification;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'datetime', nullable: true })
  read_at: Date | null;
}
