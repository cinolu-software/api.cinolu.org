import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../../users/entities/user.entity';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from './like.entity';
import { View } from './view.entity';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => View, (view) => view.post)
  views: View[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  author: User;
}
