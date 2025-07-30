import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { Project } from '../projects/entities/project.entity';
import { Event } from '../events/entities/event.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Project, (p) => p.program)
  projects: Project[];

  @OneToMany(() => Event, (e) => e.program)
  events: Event[];
}
