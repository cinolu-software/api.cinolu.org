import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { Subprogram } from '../subprograms/entities/subprogram.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_published: boolean;

  @OneToMany(() => Subprogram, (sp) => sp.program)
  subprograms: Subprogram[];
}
