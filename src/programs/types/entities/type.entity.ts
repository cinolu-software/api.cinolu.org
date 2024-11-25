import { Column, Entity, ManyToMany } from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { BaseEntity } from '../../../shared/utils/base.entity';

@Entity()
export class Type extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Program, (program) => program.types)
  programs: Program[];
}
