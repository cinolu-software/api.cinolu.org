import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../../shared/utils/abstract.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class ProgramCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (p) => p.categories)
  programs: Program[];
}
