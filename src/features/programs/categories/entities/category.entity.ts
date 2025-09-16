import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../shared/utils/abstract.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class ProgramCategory extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Program, (p) => p.category)
  programs: Program[];
}
