import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { Program } from '../../entities/program.entity';
import { EventCategory } from '../categories/entities/category.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: 'json', nullable: true })
  report: JSON;

  @Column()
  place: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ nullable: true })
  form_link: string;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToOne(() => Program, (p) => p.events)
  @JoinColumn()
  program: Program;

  @ManyToMany(() => EventCategory, (category) => category.event)
  @JoinTable()
  categories: EventCategory[];
}
