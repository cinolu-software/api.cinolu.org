import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Chat extends AbstractEntity {
  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  attachment: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => Chat, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  reply_to: Chat;
}
