import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { ProjectParticipation } from '@/modules/projects/entities/participation.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { DeliverableReviewStatus } from '../types/deliverable-review-status.enum';
import { PhaseDeliverable } from './deliverable.entity';
import { Phase } from './phase.entity';

@Entity()
@Unique(['deliverable', 'participation'])
export class PhaseDeliverableSubmission extends AbstractEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  mime_type: string | null;

  @Column({ type: 'enum', enum: DeliverableReviewStatus, default: DeliverableReviewStatus.PENDING })
  status: DeliverableReviewStatus;

  @Column({ type: 'text', nullable: true })
  feedback: string | null;

  @Column({ nullable: true })
  reviewed_at: Date | null;

  @ManyToOne(() => PhaseDeliverable, (deliverable) => deliverable.submissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deliverable_id' })
  deliverable: PhaseDeliverable;

  @ManyToOne(() => Phase, { onDelete: 'CASCADE' })
  @JoinColumn()
  phase: Phase;

  @ManyToOne(() => ProjectParticipation, { onDelete: 'CASCADE' })
  @JoinColumn()
  participation: ProjectParticipation;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  submitted_by: User | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  reviewed_by: User | null;
}
