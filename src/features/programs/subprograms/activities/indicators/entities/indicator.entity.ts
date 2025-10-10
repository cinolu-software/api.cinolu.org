import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Indicator extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'float' })
  value: number;

  @ManyToOne(() => Project, (project) => project.indicators)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Event, (event) => event.indicators)
  @JoinColumn()
  event: Event;
}
