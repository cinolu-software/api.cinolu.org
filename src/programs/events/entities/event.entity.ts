import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { EventType } from '../types/entities/type.entity';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { User } from '../../../users/entities/user.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class Event extends AbstractEntity {
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
  attendees: number;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ type: 'enum', enum: ['physical', 'online'], default: 'physical' })
  event_type: 'physical' | 'online';

  @Column({ nullable: true })
  online_link: string;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToOne(() => Program, (p) => p.events)
  @JoinColumn({ name: 'programId' })
  program: Program;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'responsibleId' })
  responsible: User;

  @ManyToMany(() => EventType, (type) => type.events)
  @JoinTable({ name: 'event_types' })
  types: EventType[];
}
