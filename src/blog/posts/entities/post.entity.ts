import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../../users/entities/user.entity';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Post extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  views: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  author: User;
}
