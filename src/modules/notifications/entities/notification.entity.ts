import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { User } from '@/modules/users/entities/user.entity';
import { NotificationAttachment } from './attachment.entity';
import { Project } from '@/modules/projects/entities/project.entity';
import { Phase } from '@/modules/projects/phases/entities/phase.entity';
import { NotificationStatus } from '../types/notification-status.enum';

@Entity()
export class Notification extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'enum', enum: NotificationStatus, default: NotificationStatus.DRAFT })
  status: NotificationStatus;

  @Column({ type: 'datetime', nullable: true })
  read_at: Date;

  @ManyToOne(() => User, (user) => user.sent_notifications)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Phase)
  @JoinColumn()
  phase: Phase;

  @OneToMany(() => NotificationAttachment, (attachment) => attachment.notification)
  attachments: NotificationAttachment[];
}
