import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { User } from '../../users/entities/user.entity';
import { ApplicationReview } from './review.entity';

@Entity()
export class CallApplication extends BaseEntity {
  @Column({ type: 'json' })
  answers: JSON;

  @OneToMany(() => ApplicationReview, (review) => review.application)
  reviews: ApplicationReview[];

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userId' })
  applicant: User;
}
