import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EventCategory } from '../categories/entities/category.entity';
import { AbstractEntity } from 'src/core/database/abstract.entity';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';
import { Subprogram } from '../../entities/subprogram.entity';
import { Metric } from '../../metrics/entities/metric.entity';

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

  @OneToMany(() => Gallery, (gallery) => gallery.event)
  gallery: Gallery[];

  @OneToMany(() => Metric, (metric) => metric.event)
  metrics: Metric[];
}
