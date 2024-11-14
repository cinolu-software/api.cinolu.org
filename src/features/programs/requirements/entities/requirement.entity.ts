import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Program } from '../../programs/entities/program.entity';

@Entity()
export class Requirement extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Program, (program) => program.requirements)
  program: Program;
}
