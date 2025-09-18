import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { Project } from '../../programs/subprograms/projects/entities/project.entity';
import { Event } from '../../programs/subprograms/events/entities/event.entity';

@Entity()
export class Gallery extends BaseEntity {
  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event;
}
