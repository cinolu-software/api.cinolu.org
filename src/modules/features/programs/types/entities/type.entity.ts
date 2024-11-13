import { Program } from 'src/modules/features/programs/programs/entities/program.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../utilities/entities/base.entity';

@Entity()
export class ProgramType extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Program, (program) => program.types)
  programs: Program[];
}
