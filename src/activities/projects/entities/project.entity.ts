import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Partner } from '../../../partners/entities/partner.entity';
import { Application } from './application.entity';
import { Category } from './category.entity';
import { Phase } from './phase.entity';
import { Type } from './type.entity';

@Entity()
export class Project extends AbstractEntity {
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

  @Column({ type: 'text', nullable: true })
  aim: string;

  @Column({ type: 'text', nullable: true })
  prize: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ nullable: true })
  town: string;

  @OneToMany(() => Phase, (phase) => phase.project)
  phases: Phase[];

  @OneToMany(() => Application, (application) => application.project)
  applications: Application[];

  @ManyToMany(() => Type, (type) => type.projects)
  @JoinTable({ name: 'project_types' })
  types: Type[];

  @ManyToMany(() => Category, (category) => category.projects)
  @JoinTable({ name: 'project_categories' })
  categories: Category[];

  @ManyToMany(() => Partner, (partner) => partner.projects)
  @JoinTable({ name: 'project_partners' })
  partners: Partner[];
}
