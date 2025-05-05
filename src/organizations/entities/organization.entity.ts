import { AbstractEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Project } from 'src/programs/projects/entities/project.entity';

@Entity()
export class Organization extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  website: string;

  @Column({ default: false })
  is_approved: boolean;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Project, (project) => project.partners)
  projects: Project[];
}
