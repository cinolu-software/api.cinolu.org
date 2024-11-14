import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { BaseEntity } from '@core/utilities/base.entity';
import { ApplicationStatus } from '../enum/application-status.enum';
import { User } from '@core/modules/users/users/entities/user.entity';

@Entity()
export class Application extends BaseEntity {
  @ManyToOne(() => Program, (program) => program.applications)
  @JoinColumn({ name: 'programId' })
  program: Program;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userId' })
  applicant: User;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status: ApplicationStatus;

  @Column({ type: 'text', nullable: true })
  reviewer_comment: string;

  @Column({ type: 'datetime', nullable: true })
  applied_at: Date;
}
