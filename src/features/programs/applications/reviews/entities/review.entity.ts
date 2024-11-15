import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ReviewStatus } from '../enum/review-status.enum';
import { User } from '@core/modules/users/users/entities/user.entity';
import { BaseEntity } from '@core/utilities/base.entity';

@Entity()
export class Review extends BaseEntity {
  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'float' })
  note: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'reviwerId' })
  reviewer: User;
}
