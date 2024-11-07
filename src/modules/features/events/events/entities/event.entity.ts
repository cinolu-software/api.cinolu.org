import { Attachment } from 'src/modules/utilities/attachments/entities/attachment.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { User } from 'src/modules/core/users/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Type } from '../../types/entities/type.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'bigint', default: 0 })
  attendees_total: number;

  @Column({ type: 'bigint', default: 0 })
  attendees_number: number;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToMany(() => User, (user) => user.programs)
  users: User[];

  @OneToMany(() => Attachment, (attachment) => attachment.program)
  attachments: Attachment[];

  @ManyToMany(() => Type, (type) => type.events)
  @JoinTable({ name: 'event_types' })
  types: Type[];
}
