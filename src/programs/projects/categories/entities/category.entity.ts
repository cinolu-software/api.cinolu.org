import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../shared/utils/abstract.entity';
import { Project } from '../../entities/project.entity';

@Entity()
export class ProjectCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Project, (program) => program.categories)
  projects: Project[];
}
