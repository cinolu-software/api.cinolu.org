import { Program } from 'src/modules/features/programs/programs/entities/program.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/utilities/entities/base.entity';

@Entity()
export class ProgramCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (program) => program.categories)
  programs: Program[];
}
