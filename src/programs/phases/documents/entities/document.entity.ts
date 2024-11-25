import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Phase } from '../../phases/entities/phase.entity';
import { BaseEntity } from '../../../../shared/utils/base.entity';

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
