import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { PhaseForm } from '../../forms/entities/form.entity';

@Entity()
export class Submission extends AbstractEntity {
  @ManyToOne(() => PhaseForm, (form) => form.submissions, { onDelete: 'CASCADE' })
  @JoinColumn()
  form: PhaseForm;

  @Column({ type: 'json' })
  responses: { label: string; value: string }[];

  @Column({ nullable: true })
  submitted_by_name?: string;

  @Column({ nullable: true })
  submitted_by_email?: string;

  @Column({ nullable: true })
  submitted_by_phone?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
