import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ReviewStatus } from '../../../utils/review-status.enum';
import { AbstractEntity } from '../../../../../shared/utils/abstract.entity';
import { Application } from '../../entities/application.entity';
import { User } from '../../../../../users/entities/user.entity';

@Entity()
export class Review extends AbstractEntity {
  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'json' })
  data: JSON;

  @ManyToOne(() => Application, (app) => app.reviews)
  @JoinColumn()
  application: Application;

  @ManyToOne(() => User)
  @JoinColumn()
  reviewer: User;
}
