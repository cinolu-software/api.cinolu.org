import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Phase } from '../../phases/entities/phase.entity';
import { BaseEntity } from '../../shared/utils/base.entity';

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
