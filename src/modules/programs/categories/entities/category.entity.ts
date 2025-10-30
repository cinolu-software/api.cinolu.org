import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../../core/database/abstract.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class ProgramCategory extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Program, (p) => p.category)
  programs: Program[];
}
