import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/utilities/entities/base.entity';
import { Program } from '../../../entities/program.entity';
import { ProgramMilestone } from '../../milestones/entities/milestone.entity';

@Entity()
export class ProgramPhase extends BaseEntity {
  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  started_at: Date;

  @Column({ type: 'datetime' })
  ended_at: Date;

  @ManyToOne(() => Program, (program) => program.phases)
  @JoinColumn({ name: 'programId' })
  program: Program;

  @OneToMany(() => ProgramMilestone, (milestone) => milestone.phase)
  milestones: ProgramMilestone[];
}
