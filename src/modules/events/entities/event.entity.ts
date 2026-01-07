import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Subprogram } from '@/modules/subprograms/entities/subprogram.entity';
import { Metric } from '@/modules/subprograms/metrics/entities/metric.entity';
import { EventCategory } from '../categories/entities/category.entity';

@Entity()
export class Event extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_highlighted: boolean;

  @Column({ nullable: true })
  cover: string;

  @Column()
  place: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'text', nullable: true })
  context: string;

  @Column({ type: 'text', nullable: true })
  objectives: string;

  @Column({ type: 'int', nullable: true })
  duration_hours: number;

  @ManyToOne(() => User, (user) => user.managed_events, { nullable: true })
  @JoinColumn()
  event_manager: User;

  @Column({ type: 'text', nullable: true })
  selection_criteria: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToOne(() => Subprogram, (p) => p.events)
  @JoinColumn()
  program: Subprogram;

  @ManyToMany(() => EventCategory, (category) => category.event)
  @JoinTable()
  categories: EventCategory[];

  @OneToMany(() => Gallery, (gallery) => gallery.event)
  gallery: Gallery[];

  @OneToMany(() => Metric, (metric) => metric.event)
  metrics: Metric[];

  @ManyToMany(() => User, (user) => user.participated_events)
  participants: User[];
}
