import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { Venture } from '@/modules/ventures/core/entities/venture.entity';
import { AbstractEntity } from '@/core/database/abstract.entity';
import { Article } from '@/modules/blog/articles/entities/article.entity';
import { Comment } from '@/modules/blog/comments/entities/comment.entity';
import { Project } from '@/modules/projects/entities/project.entity';
import { Event } from '@/modules/events/entities/event.entity';
import { Mentor } from '../mentors/entities/mentor.entity';

@Entity()
export class User extends AbstractEntity {
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

  @ManyToMany(() => Project, (project) => project.participants)
  @JoinTable()
  participated_projects: Project[];

  @ManyToMany(() => Event, (event) => event.participants)
  @JoinTable()
  participated_events: Event[];

  @OneToMany(() => Project, (project) => project.project_manager)
  managed_projects: Project[];

  @OneToMany(() => Event, (event) => event.event_manager)
  managed_events: Event[];

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToOne(() => Mentor, (mentor) => mentor.user)
  mentor: Mentor;
}
