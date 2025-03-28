import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../../shared/utils/abstract.entity';
import { Project } from '../../entities/project.entity';

@Entity('projectsCategory')
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Project, (program) => program.categories)
  projects: Project[];
}
