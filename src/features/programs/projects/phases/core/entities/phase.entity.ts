import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Resource } from '../../resources/entities/resource.entity';
import { Project } from '../../../core/entities/project.entity';
import { PhaseForm } from '../../forms/entities/form.entity';

@Entity()
export class Phase extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  started_at: Date;

  @Column({ type: 'date', nullable: true })
  ended_at: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  'order': number;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @ManyToOne(() => Project, (p) => p.phases)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Resource, (r) => r.phase)
  resources: Resource[];

  @OneToMany(() => PhaseForm, (form) => form.phase)
  forms: PhaseForm[];
}
