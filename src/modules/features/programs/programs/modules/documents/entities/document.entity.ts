import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from '../../../entities/program.entity';
import { BaseEntity } from 'src/modules/utilities/entities/base.entity';

@Entity()
export class ProgramDocument extends BaseEntity {
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
