import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Partner } from '../../../partners/partners/entities/partner.entity';
import { Type } from '../../types/entities/type.entity';
import { Category } from '../../categories/entities/category.entity';
import { Phase } from '../../phases/phases/entities/phase.entity';
import { Application } from '../../applications/applications/entities/application.entity';
import { BaseEntity } from '@core/utilities/base.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @Column({ type: 'text' })
  targeted_audience: string;

  @Column({ type: 'text' })
  aim: string;

  @Column({ type: 'text' })
  prize: string;

  @Column()
  town: string;

  @OneToMany(() => Phase, (phase) => phase.program)
  phases: Phase[];

  @OneToMany(() => Application, (application) => application.program)
  applications: Application[];

  @ManyToMany(() => Type, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: Type[];

  @ManyToMany(() => Category, (category) => category.programs)
  @JoinTable({ name: 'program_categories' })
  categories: Category[];

  @ManyToMany(() => Partner, (partner) => partner.programs)
  @JoinTable({ name: 'program_partners' })
  partners: Partner[];
}
