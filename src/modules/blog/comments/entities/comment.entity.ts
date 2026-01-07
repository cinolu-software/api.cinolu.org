import { AbstractEntity } from '@/core/database/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity()
export class Comment extends AbstractEntity {
  @Column()
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article: Article;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  author: User;
}
