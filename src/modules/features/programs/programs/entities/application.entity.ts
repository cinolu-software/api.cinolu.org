import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from '../../../../core/users/entities/user.entity';
import { Program } from './program.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ApplicationStatus } from '../enum/application-status.enum';

@Entity()
export class ProgramApplication extends BaseEntity {
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
