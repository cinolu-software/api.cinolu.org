import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Detail } from '../details/entities/detail.entity';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Role } from '../roles/entities/role.entity';
import { Venture } from '../../ventures/entities/venture.entity';
import { Event } from '../../programs/events/entities/event.entity';
import { Project } from '../../programs/projects/entities/project.entity';
import { Post } from '../../blog/posts/entities/post.entity';
import { Comment } from '../../blog/comments/entities/comment.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  verified_at: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.by)
  comments: Comment[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToMany(() => Project)
  @JoinTable({ name: 'user_enrolled_projects' })
  enrolled_projects: Project[];

  @OneToOne(() => Detail, (detail) => detail.user)
  @JoinColumn()
  detail: Detail;

  @OneToMany(() => Event, (event) => event.responsible)
  events: Event[];

  @OneToMany(() => Venture, (venture) => venture.user)
  ventures: Venture[];
}
