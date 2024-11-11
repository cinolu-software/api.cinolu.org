import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { ProgramType } from '../../types/entities/type.entity';
import { ProgramCategory } from '../../categories/entities/category.entity';
import { Requirement } from './requirement.entity';
import { ProgramPhase } from './phase.entity';
import { ProgramDocument } from './document.entity';
import { ProgramApplication } from './application.entity';

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

  @OneToMany(() => ProgramApplication, (application) => application.program)
  applications: ProgramApplication[];

  @OneToMany(() => Requirement, (requirement) => requirement.program)
  requirements: Requirement[];

  @ManyToMany(() => ProgramType, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: ProgramType[];

  @ManyToMany(() => ProgramCategory, (category) => category.programs)
  @JoinTable({ name: 'program_categories' })
  categories: ProgramCategory[];

  @ManyToMany(() => Partner, (partner) => partner.programs)
  @JoinTable({ name: 'program_partners' })
  partners: Partner[];

  @OneToMany(() => ProgramDocument, (document) => document.program)
  documents: ProgramDocument[];
}
