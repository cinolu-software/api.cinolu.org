import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { ProjectCategory } from '../categories/entities/category.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  started_at: Date;

  @Column({ type: 'datetime' })
  ended_at: Date;

  @Column({ nullable: true })
  form_link: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @ManyToOne(() => Program, (p) => p.projects)
  @JoinColumn()
  program: Program;

  @ManyToMany(() => ProjectCategory, (category) => category.projects)
  @JoinTable()
  categories: ProjectCategory[];
}
