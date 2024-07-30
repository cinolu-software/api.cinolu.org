import { Attachment } from 'src/app/modules/attachments/entities/attachment.entity';
import { Requirement } from 'src/app/modules/requirements/entities/requirement.entity';
import { Type } from 'src/app/modules/types/entities/type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  start_at: Date;

  @Column({ type: 'date' })
  end_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.programs)
  user: User;

  @OneToMany(() => Attachment, (attachment) => attachment.program)
  attachments: Attachment[];

  @OneToMany(() => Requirement, (requirement) => requirement.program)
  requirements: Requirement[];

  @ManyToMany(() => Type, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: Type[];
}
