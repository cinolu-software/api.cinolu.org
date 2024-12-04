import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Call } from './call.entity';
import { CallApplicationReview } from './review.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class CallApplication extends BaseEntity {
  @Column({ type: 'json' })
  answers: JSON;

  @ManyToOne(() => Call)
  @JoinColumn()
  call: Call;

  @ManyToOne(() => User)
  @JoinColumn()
  applicant: User;

  @OneToMany(() => CallApplicationReview, (review) => review.application)
  reviews: CallApplicationReview[];
}
