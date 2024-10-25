import { Program } from 'src/modules/features/programs/programs/entities/program.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../../common/entities/base.entity';

@Entity()
export class Requirement extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Program, (program) => program.requirements)
  program: Program;
}
