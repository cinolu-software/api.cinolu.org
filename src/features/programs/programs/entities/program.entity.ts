import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Partner } from '../../partners/entities/partner.entity';
import { Type } from '../../types/entities/type.entity';
import { Category } from '../../categories/entities/category.entity';
import { Requirement } from '../../requirements/entities/requirement.entity';
import { ProgramPhase } from '../../phases/entities/phase.entity';
import { Document } from '../../documents/entities/document.entity';
import { Application } from '../../applications/entities/application.entity';
import { BaseEntity } from '@core/utilities/base.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @Column()
  targeted_audience: string;

  @OneToMany(() => ProgramPhase, (phase) => phase.program)
  phases: ProgramPhase[];

  @OneToMany(() => Application, (application) => application.program)
  applications: Application[];

  @OneToMany(() => Requirement, (requirement) => requirement.program)
  requirements: Requirement[];

  @ManyToMany(() => Type, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: Type[];

  @ManyToMany(() => Category, (category) => category.programs)
  @JoinTable({ name: 'program_categories' })
  categories: Category[];

  @ManyToMany(() => Partner, (partner) => partner.programs)
  @JoinTable({ name: 'program_partners' })
  partners: Partner[];

  @OneToMany(() => Document, (document) => document.program)
  documents: Document[];
}
