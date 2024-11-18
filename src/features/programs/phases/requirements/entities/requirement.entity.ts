import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Phase } from '../../phases/entities/phase.entity';

@Entity()
export class Requirement extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Phase, (phase) => phase.requirements)
  @JoinColumn({ name: 'phaseId' })
  phase: Phase;
}
