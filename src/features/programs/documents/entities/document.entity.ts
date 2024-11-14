import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { BaseEntity } from '@core/utilities/base.entity';

@Entity()
export class Document extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  file_name: string;

  @ManyToOne(() => Program, (program) => program.documents)
  @JoinColumn({ name: 'programId' })
  program: Program;
}
