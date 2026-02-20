import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '@/modules/projects/entities/project.entity';
import { ProjectParticipation } from '@/modules/projects/entities/project-participation.entity';
import { Deliverable } from '@/modules/projects/phases/deliverables/entities/deliverable.entity';

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

  @ManyToOne(() => Project, (project) => project.phases)
  @JoinColumn()
  project: Project;

  @ManyToMany(() => ProjectParticipation, (participation) => participation.phases)
  participations: ProjectParticipation[];

  @OneToMany(() => Deliverable, (deliverable) => deliverable.phase)
  deliverables: Deliverable[];
}
