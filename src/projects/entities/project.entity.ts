import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Status } from 'src/status/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
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

@Entity()
export class Project {
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

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @ManyToOne(() => Status, (status) => status.projects)
  status: Status;

  @OneToMany(() => Attachment, (attachment) => attachment.project)
  attachments: Attachment[];

  @ManyToMany(() => Category, (category) => category.projects)
  @JoinTable({ name: 'project_categories' })
  categories: Category[];
}
