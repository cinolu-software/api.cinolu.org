import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { PhaseForm } from '../../entities/form.entity';

export interface SubmissionResponse {
  fieldId: string;
  value?: string | number | boolean | string[] | number[] | null;
  values?: Array<string | number | boolean>;
  metadata?: Record<string, unknown>;
}

@Entity()
export class Submission extends AbstractEntity {
  @ManyToOne(() => PhaseForm, (form) => form.submissions, { onDelete: 'CASCADE' })
  @JoinColumn()
  form: PhaseForm;

  @Column({ type: 'json' })
  responses: SubmissionResponse[];

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, unknown>;

  @Column({ nullable: true })
  submitted_by_name?: string;

  @Column({ nullable: true })
  submitted_by_email?: string;

  @Column({ nullable: true })
  submitted_by_phone?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
