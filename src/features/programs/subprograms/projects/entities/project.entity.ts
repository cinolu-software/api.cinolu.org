import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../../shared/utils/abstract.entity';
import { ProjectCategory } from '../categories/entities/category.entity';
import { Subprogram } from '../../entities/subprogram.entity';
import { Gallery } from '../../../../galleries/entities/gallery.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_highlighted: boolean;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  cover: string;

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

  @OneToMany(() => Gallery, (gallery) => gallery.project)
  gallery: Gallery[];
}
