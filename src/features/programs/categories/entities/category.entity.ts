import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/utils/abstract.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class ProgramCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Program, (p) => p.categories)
  programs: Program[];
}
