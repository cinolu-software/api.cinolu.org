import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { Venture } from 'src/features/ventures/entities/venture.entity';
import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Article } from 'src/features/blog/articles/entities/article.entity';
import { Comment } from 'src/features/blog/comments/entities/comment.entity';
import { Project } from '../../../features/programs/subprograms/projects/entities/project.entity';

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

  @Column({ unique: true, nullable: true })
  referral_code: string;

  @ManyToOne(() => User, (user) => user.referrals, { nullable: true })
  referred_by: User;

  @OneToMany(() => User, (user) => user.referred_by, { nullable: true })
  referrals: User[];

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
