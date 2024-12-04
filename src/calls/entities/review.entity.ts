import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { ReviewStatus } from '../../programs/utils/review-status.enum';
import { CallApplication } from './application.entity';

@Entity()
export class CallApplicationReview extends BaseEntity {
  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => CallApplication)
  @JoinColumn()
  application: CallApplication;
}
