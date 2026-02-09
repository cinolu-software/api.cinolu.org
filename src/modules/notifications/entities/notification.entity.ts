import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Recipient } from './recipient.entity';
import { NotificationAudience } from '../types/audience.enum';
import { Project } from '@/modules/projects/entities/project.entity';

@Entity()
export class Notification extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationAudience
  })
  audience: NotificationAudience;

  @Column({ nullable: true })
  role_name?: string;

  @ManyToOne(() => Project, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  created_by: User;

  @OneToMany(() => Recipient, (recipient) => recipient.notification)
  recipients: Recipient[];
}
