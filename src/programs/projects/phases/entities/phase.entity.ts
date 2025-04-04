import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../../shared/utils/abstract.entity';
import { Project } from '../../entities/project.entity';
import { Document } from '../documents/entities/document.entity';

@Entity()
export class Phase extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  started_at: Date;

  @Column({ type: 'datetime' })
  ended_at: Date;

  @Column({ type: 'json', nullable: true })
  requirements: JSON;

  @OneToMany(() => Document, (document) => document.phase)
  documents: Document[];

  @ManyToOne(() => Project, (project) => project.phases)
  @JoinColumn()
  project: Project;
}
