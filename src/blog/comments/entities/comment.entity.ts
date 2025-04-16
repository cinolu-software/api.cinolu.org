import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { User } from '../../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ type: 'int', default: 0 })
  dislikes: number;

  @ManyToOne(() => User)
  @JoinColumn()
  by: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn()
  post: Post;
}
