import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Project } from '@/modules/projects/entities/project.entity';
import { Venture } from '@/modules/ventures/entities/venture.entity';
import { Phase } from '@/modules/projects/phases/entities/phase.entity';

@Entity()
@Unique(['user.id', 'project.id'])
export class ProjectParticipation extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.project_participations, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Project, (project) => project.participations, { onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Venture, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  venture: Venture | null;

  @ManyToMany(() => Phase, (phase) => phase.participations)
  @JoinTable()
  phases: Phase[];
}
