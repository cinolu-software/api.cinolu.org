import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { View } from './view.entity';
import { PostCategory } from '../categories/entities/category.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => View, (view) => view.post)
  views: View[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => PostCategory, (category) => category.posts)
  @JoinTable()
  categories: PostCategory[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  author: User;
}
