import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { User } from '../../users/entities/user.entity';
import { CallApplication } from './application.entity';
import { ReviewStatus } from '../../programs/utils/review-status.enum';

@Entity()
export class ApplicationReview extends BaseEntity {
  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => CallApplication, (app) => app.reviews)
  @JoinColumn({ name: 'applicationId' })
  application: CallApplication;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'reviwerId' })
  reviewer: User;
}
