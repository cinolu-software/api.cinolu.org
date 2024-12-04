import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ReviewStatus } from '../utils/review-status.enum';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Application } from './application.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Review extends BaseEntity {
  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'float' })
  note: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Application, (app) => app.reviews)
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviwerId' })
  reviewer: User;
}
