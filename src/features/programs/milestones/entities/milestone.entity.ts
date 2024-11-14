import { BaseEntity } from '@core/utilities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProgramPhase } from '../../phases/entities/phase.entity';

@Entity()
export class ProgramMilestone extends BaseEntity {
  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  due_date: Date;

  @ManyToOne(() => ProgramPhase, (phase) => phase.milestones)
  @JoinColumn({ name: 'phaseId' })
  phase: ProgramPhase;
}
