import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Program } from '../../programs/entities/program.entity';
import { Partnership } from './partnership.entity';

@Entity()
export class Partner extends AbstractEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  website_link: string;

  @Column({ nullable: true })
  profile: string;

  @ManyToMany(() => Partnership, (partnership) => partnership.partners)
  @JoinTable({ name: 'partner_partnerships' })
  partnerships: Partnership[];

  @ManyToMany(() => Program, (program) => program.partners)
  programs: Program[];
}
