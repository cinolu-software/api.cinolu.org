import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from './program.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class ProgramDocument extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  file_path: string;

  @ManyToOne(() => Program, (program) => program.documents)
  @JoinColumn({ name: 'programId' })
  program: Program;
}
