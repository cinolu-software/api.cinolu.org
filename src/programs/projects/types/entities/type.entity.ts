import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../../shared/utils/abstract.entity';
import { Project } from '../../entities/project.entity';

@Entity()
export class Type extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Project, (project) => project.types)
  projects: Project[];
}
