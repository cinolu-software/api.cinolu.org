import { Entity, ManyToOne, Column, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Project } from './project.entity';
import { Review } from './review.entity';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';

@Entity()
export class Application extends AbstractEntity {
  @Column({ type: 'json' })
  answers: JSON;

  @OneToMany(() => Review, (review) => review.application)
  reviews: Review[];

  @ManyToOne(() => Project, (program) => program.applications)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  applicant: User;
}
