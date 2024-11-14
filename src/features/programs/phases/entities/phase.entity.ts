import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Program } from '../../programs/entities/program.entity';

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
}
