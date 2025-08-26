import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../../shared/utils/abstract.entity';
import { Subprogram } from '../../entities/subprogram.entity';
import { EventCategory } from '../categories/entities/category.entity';

@Entity()
export class Event extends BaseEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'boolean' , nullable: true , default: false })
  is_highlighted: boolean;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: 'json', nullable: true })
  report: JSON;

  @Column()
  place: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ nullable: true })
  form_link: string;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToOne(() => Subprogram, (p) => p.events)
  @JoinColumn()
  program: Subprogram;

  @ManyToMany(() => EventCategory, (category) => category.event)
  @JoinTable()
  categories: EventCategory[];
}
