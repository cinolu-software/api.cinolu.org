import { Column, Entity, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

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

  @ManyToMany(() => User, (user) => user.notifications)
  recipients: User[];

  @OneToMany(() => Attachment, (attachment) => attachment.notification)
  attachments: Attachment[];
}
