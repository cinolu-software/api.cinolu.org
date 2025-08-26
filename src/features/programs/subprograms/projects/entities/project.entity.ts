import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../../shared/utils/abstract.entity';
import { ProjectCategory } from '../categories/entities/category.entity';
import { Subprogram } from '../../entities/subprogram.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ type: 'json', nullable: true })
  report: JSON;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @Column({ nullable: true })
  form_link: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @ManyToOne(() => Subprogram, (p) => p.projects)
  @JoinColumn()
  program: Subprogram;

  @ManyToMany(() => ProjectCategory, (category) => category.projects)
  @JoinTable()
  categories: ProjectCategory[];
}
