import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { Project } from '../../programs/projects/entities/project.entity';
import { Venture } from 'src/modules/ventures/entities/venture.entity';
import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Article } from 'src/modules/blog/articles/entities/article.entity';
import { Comment } from 'src/modules/blog/comments/entities/comment.entity';

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
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ nullable: true })
  reason: string;

  @OneToMany(() => Venture, (venture) => venture.owner)
  ventures: Venture[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
