import { AbstractEntity } from '@/core/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Project } from '@/modules/projects/entities/project.entity';

@Entity()
export class Phase extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column()
  started_at: Date;

  @Column()
  ended_at: Date;

  @ManyToOne(() => Project, (project) => project.phases, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @ManyToMany(() => User, (user) => user.participated_phases)
  participants: User[];
}
