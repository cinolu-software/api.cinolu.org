import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@core/utilities/base.entity';
import { Program } from '../../programs/entities/program.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (program) => program.categories)
  programs: Program[];
}
