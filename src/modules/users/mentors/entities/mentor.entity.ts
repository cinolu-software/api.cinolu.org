import { Entity, Column, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Experience } from './experience.entity';
import { Expertise } from '../expertises/entities/expertise.entity';
import { MentorStatus } from '../../enums/mentor.enum';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { User } from '../../entities/user.entity';

@Entity()
export class Mentor extends AbstractEntity {
  @Column({ type: 'int', default: 0 })
  years_experience: number;


  @Column({ nullable: true })
  cv: string;
  
  @Column({ type: 'enum', enum: MentorStatus, default: MentorStatus.PENDING })
  status: MentorStatus;

  @OneToOne(() => User, (user) => user.mentor)
  user: User;

  @OneToMany(() => Experience, (exp) => exp.mentor, { cascade: true })
  experiences: Experience[];

  @ManyToMany(() => Expertise, (expertise) => expertise.mentors)
  @JoinTable()
  expertises: Expertise[];
}
