import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Program } from '../../../programs/entities/program.entity';
import { BaseEntity } from '@core/utilities/base.entity';
import { User } from '@core/modules/users/users/entities/user.entity';

@Entity()
export class Application extends BaseEntity {
  @Column({ type: 'json' })
  answers: JSON;

  @ManyToOne(() => Program, (program) => program.applications)
  @JoinColumn({ name: 'programId' })
  program: Program;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userId' })
  applicant: User;
}
