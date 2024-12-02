import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/base.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class Type extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Program, (program) => program.types)
  programs: Program[];
}
