import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../../../shared/utils/abstract.entity';
import { Phase } from './phase.entity';

@Entity()
export class Requirement extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Phase, (phase) => phase.requirements)
  @JoinColumn({ name: 'phaseId' })
  phase: Phase;
}
