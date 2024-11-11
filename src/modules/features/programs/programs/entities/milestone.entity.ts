import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProgramPhase } from './phase.entity';

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
