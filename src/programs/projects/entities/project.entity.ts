import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Application } from '../applications/entities/application.entity';
import { Category } from '../categories/entities/category.entity';
import { Phase } from '../phases/entities/phase.entity';
import { Program } from '../../entities/program.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

@Entity()
export class Project extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true })
  requirements: JSON;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @Column({ type: 'json', nullable: true })
  form: JSON;

  @Column({ type: 'json', nullable: true })
  review_form: JSON;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @OneToMany(() => Phase, (phase) => phase.project)
  phases: Phase[];

  @OneToMany(() => Application, (application) => application.project)
  applications: Application[];

  @ManyToOne(() => Program, (p) => p.projects)
  @JoinColumn()
  program: Program;

  @ManyToMany(() => Category, (category) => category.projects)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Organization, (organization) => organization.projects)
  @JoinTable()
  partners: Organization[];
}
