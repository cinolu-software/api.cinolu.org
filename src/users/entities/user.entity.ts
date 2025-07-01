import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/abstract.entity';
import { Role } from '../roles/entities/role.entity';
import { Project } from '../../programs/projects/entities/project.entity';
import { Post } from '../../blog/posts/entities/post.entity';
import { Position } from '../positions/entities/position.entity';
import { Expertise } from '../expertises/entities/expertise.entity';
import { Enterprise } from 'src/enterprises/entities/enterprise.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Enterprise, (enterprise) => enterprise.owner)
  enterprises: Enterprise[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];

  @ManyToMany(() => Position)
  @JoinTable()
  postions: Position[];

  @ManyToMany(() => Expertise)
  @JoinTable()
  expertises: Expertise[];
}
