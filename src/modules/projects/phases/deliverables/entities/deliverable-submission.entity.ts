import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { ProjectParticipation } from '@/modules/projects/entities/project-participation.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Deliverable } from './deliverable.entity';

@Entity()
@Unique(['deliverable', 'participation'])
export class DeliverableSubmission extends AbstractEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Deliverable, (deliverable) => deliverable.submissions, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  deliverable: Deliverable;

  @ManyToOne(() => ProjectParticipation, (participation) => participation.deliverable_submissions, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  participation: ProjectParticipation;
}
