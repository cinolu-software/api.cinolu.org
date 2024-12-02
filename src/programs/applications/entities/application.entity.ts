import { Entity, ManyToOne, Column, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Program } from '../../entities/program.entity';
import { Review } from '../reviews/entities/review.entity';
import { BaseEntity } from '../../../shared/utils/base.entity';

@Entity()
export class Application extends BaseEntity {
  @Column({ type: 'json' })
  answers: JSON;

  @OneToMany(() => Review, (review) => review.application)
  reviews: Review[];

  @ManyToOne(() => Program, (program) => program.applications)
  @JoinColumn({ name: 'programId' })
  program: Program;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userId' })
  applicant: User;
}
