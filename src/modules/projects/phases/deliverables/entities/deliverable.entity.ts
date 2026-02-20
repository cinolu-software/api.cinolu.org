import { AbstractEntity } from '@/core/helpers/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Phase } from '@/modules/projects/phases/entities/phase.entity';
import { DeliverableType } from '../types/deliverables.types';
import { DeliverableSubmission } from './deliverable-submission.entity';

@Entity()
export class Deliverable extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: DeliverableType })
  type: DeliverableType;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => Phase, (phase) => phase.deliverables, { onDelete: 'CASCADE' })
  @JoinColumn()
  phase: Phase;

  @OneToMany(() => DeliverableSubmission, (submission) => submission.deliverable)
  submissions: DeliverableSubmission[];
}
