import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../../../../shared/utils/abstract.entity';
import { Phase } from '../../entities/phase.entity';

@Entity()
export class Document extends AbstractEntity {
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
