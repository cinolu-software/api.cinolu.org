import { Program } from 'src/modules/programs/entities/program.entity';
import { Project } from 'src/modules/projects/entities/project.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project) => project.attachments)
  project: Project;

  @ManyToOne(() => Program, (program) => program.attachments)
  program: Program;
}
