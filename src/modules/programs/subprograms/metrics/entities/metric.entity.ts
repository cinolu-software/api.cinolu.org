import { AbstractEntity } from '@/core/database/abstract.entity';
import { Indicator } from '@/modules/programs/entities/indicator.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Metric extends AbstractEntity {
  @Column({ type: 'float', nullable: true })
  target: number;

  @Column({ type: 'float', nullable: true })
  achieved: number;

  @ManyToOne(() => Indicator)
  @JoinColumn()
  indicator: Indicator;

  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;
}
