import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Mentor } from '../../entities/mentor.entity';

@Entity('expertises')
export class Expertise extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Mentor, (mentor) => mentor.expertises)
  mentors: Mentor[];
}
