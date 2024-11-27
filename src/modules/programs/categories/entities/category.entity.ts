import { Column, Entity, ManyToMany } from 'typeorm';
import { Program } from '../../programs/entities/program.entity';
import { BaseEntity } from '../../../../shared/utils/base.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (program) => program.categories)
  programs: Program[];
}
