import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Program } from '../../entities/program.entity';
import { Category } from '../categories/entities/category.entity';

@Entity()
export class Event extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ nullable: true })
  online_link: string;

  @Column({ type: 'date' })
  ended_at: Date;

  @ManyToOne(() => Program, (p) => p.events)
  @JoinColumn()
  program: Program;

  @ManyToMany(() => Category, (category) => category.event)
  @JoinTable()
  categories: Category[];
}
