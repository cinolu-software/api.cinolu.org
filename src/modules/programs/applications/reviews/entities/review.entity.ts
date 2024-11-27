import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ReviewStatus } from '../enum/review-status.enum';
import { Application } from '../../applications/entities/application.entity';
import { User } from '../../../../users/users/entities/user.entity';
import { BaseEntity } from '../../../../../shared/utils/base.entity';

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

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'reviwerId' })
  reviewer: User;
}
