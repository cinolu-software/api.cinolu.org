import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Phase } from '../../phases/phases/entities/phase.entity';

@Entity()
export class Document extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  file_name: string;

  @ManyToOne(() => Phase, (phase) => phase.documents)
  @JoinColumn({ name: 'programId' })
  phase: Phase;
}
