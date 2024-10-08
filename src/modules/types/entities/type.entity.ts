import { Program } from 'src/modules/programs/entities/program.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class Type extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Program, (program) => program.types)
  programs: Program[];
}
