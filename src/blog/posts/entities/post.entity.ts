import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BlogCategory } from '../../categories/entities/category.entity';
import { User } from '../../../users/entities/user.entity';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => BlogCategory, (category) => category.posts)
  @JoinColumn()
  category: BlogCategory;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  author: User;
}
