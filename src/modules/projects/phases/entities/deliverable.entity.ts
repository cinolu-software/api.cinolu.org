import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Phase } from './phase.entity';
import { DeliverableType } from '../types/deliverable-type.enum';
import { PhaseDeliverableSubmission } from './deliverable-submission.entity';

@Entity()
export class PhaseDeliverable extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: DeliverableType })
  type: DeliverableType;

  @Column({ type: 'boolean', default: true })
  is_required: boolean;

  @ManyToOne(() => Phase, (phase) => phase.deliverables, { onDelete: 'CASCADE' })
  @JoinColumn()
  phase: Phase;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  requested_by: User | null;

  @OneToMany(() => PhaseDeliverableSubmission, (submission) => submission.deliverable)
  submissions: PhaseDeliverableSubmission[];
}
