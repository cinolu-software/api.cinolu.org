import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Phase } from '../../phases/entities/phase.entity';
import { FieldType } from '../enum/form-type.enum';

@Entity()
export class Requirement extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: FieldType, nullable: true })
  field_type: FieldType;

  @Column({ type: 'boolean', default: false })
  is_formField: boolean;

  @ManyToOne(() => Phase, (phase) => phase.requirements)
  @JoinColumn({ name: 'phaseId' })
  phase: Phase;
}
