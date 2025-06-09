import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/utils/abstract.entity';
import { User } from '../../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn()
  by: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn()
  post: Post;
}
