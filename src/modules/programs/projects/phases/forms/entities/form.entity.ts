import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Phase } from '../../core/entities/phase.entity';
import { FormField } from '../types/form-field.type';
import { Submission } from '../../submissions/entities/submission.entity';

@Entity()
export class PhaseForm extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json' })
  fields: FormField[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => Phase, (phase) => phase.forms, { onDelete: 'CASCADE' })
  @JoinColumn()
  phase: Phase;

  @OneToMany(() => Submission, (submission) => submission.form)
  submissions: Submission[];
}
