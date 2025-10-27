import { AbstractEntity } from 'src/core/database/abstract.entity';
import { Indicator } from 'src/features/programs/entities/indicator.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Project } from '../../projects/entities/project.entity';

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
