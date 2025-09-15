import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { Subprogram } from '../subprograms/entities/subprogram.entity';
import { ProgramCategory } from '../categories/entities/category.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_highlighted: boolean;

  @Column({ nullable: true })
  logo: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @OneToMany(() => Subprogram, (sp) => sp.program)
  subprograms: Subprogram[];

  @ManyToMany(() => ProgramCategory, (category) => category.programs)
  @JoinTable()
  categories: ProgramCategory[];
}
