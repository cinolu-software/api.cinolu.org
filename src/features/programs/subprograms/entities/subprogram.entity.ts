import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../shared/utils/abstract.entity';
import { Project } from '../projects/entities/project.entity';
import { Event } from '../events/entities/event.entity';
import { Program } from '../../entities/program.entity';

@Entity()
export class Subprogram extends BaseEntity {
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

  @ManyToOne(() => Program, (p) => p.subprograms)
  @JoinColumn()
  program: Program;

  @OneToMany(() => Project, (p) => p.program)
  projects: Project[];

  @OneToMany(() => Event, (e) => e.program)
  events: Event[];
}
