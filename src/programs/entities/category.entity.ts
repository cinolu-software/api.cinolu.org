import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Program } from './program.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (program) => program.categories)
  programs: Program[];
}
