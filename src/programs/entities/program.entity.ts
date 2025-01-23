import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Project } from '../projects/entities/project.entity';
import { Event } from '../events/entities/event.entity';

@Entity()
export class Program extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Project, (p) => p.program)
  projects: Project[];

  @OneToMany(() => Event, (e) => e.program)
  events: Event[];
}
