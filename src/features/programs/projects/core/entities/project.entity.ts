import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProjectCategory } from '../../categories/entities/category.entity';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Gallery } from '@/features/galleries/entities/gallery.entity';
import { Subprogram } from '@/features/programs/subprograms/core/entities/subprogram.entity';
import { Metric } from '@/features/programs/subprograms/metrics/entities/metric.entity';
import { User } from '@/features/users/entities/user.entity';
import { Phase } from '../../phases/core/entities/phase.entity';

@Entity()
export class Project extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_highlighted: boolean;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @Column({ type: 'text', nullable: true })
  context: string;

  @Column({ type: 'text', nullable: true })
  objectives: string;

  @Column({ type: 'int', nullable: true })
  duration_hours: number;

  @ManyToOne(() => User, (user) => user.managed_projects, { nullable: true })
  @JoinColumn()
  project_manager: User;

  @Column({ type: 'text', nullable: true })
  selection_criteria: string;

  @ManyToOne(() => Subprogram, (p) => p.projects)
  @JoinColumn()
  program: Subprogram;

  @ManyToMany(() => ProjectCategory, (category) => category.projects)
  @JoinTable()
  categories: ProjectCategory[];

  @OneToMany(() => Gallery, (gallery) => gallery.project)
  gallery: Gallery[];

  @OneToMany(() => Metric, (metric) => metric.project)
  metrics: Metric[];

  @ManyToMany(() => User, (user) => user.participated_projects)
  participants: User[];

  @OneToMany(() => Phase, (phase) => phase.project)
  phases: Phase[];
}
