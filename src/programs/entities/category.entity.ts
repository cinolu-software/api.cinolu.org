import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Program } from './program.entity';

@Entity()
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (program) => program.categories)
  programs: Program[];
}
