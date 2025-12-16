import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Project } from '../../../core/entities/project.entity';
import { Phase } from '../../core/entities/phase.entity';

export enum ResourceType {
  PDF = 'PDF',
  LINK = 'LINK',
  IMAGE = 'IMAGE',
  OTHER = 'OTHER'
}

@Entity()
export class Resource extends AbstractEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ type: 'enum', enum: ResourceType, default: ResourceType.OTHER })
  type: ResourceType;

  @Column()
  url: string;

  @ManyToOne(() => Phase, (p) => p.resources, { nullable: true })
  @JoinColumn()
  phase: Phase;

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn()
  project: Project;
}
