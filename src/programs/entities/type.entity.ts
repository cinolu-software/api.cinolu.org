import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Program } from './program.entity';

@Entity()
export class Type extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Program, (program) => program.types)
  programs: Program[];
}
