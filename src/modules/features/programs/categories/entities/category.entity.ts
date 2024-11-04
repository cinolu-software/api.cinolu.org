import { Program } from 'src/modules/features/programs/programs/entities/program.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Program, (program) => program.categories)
  programs: Program[];
}
