import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';
import { AbstractEntity } from 'src/shared/utils/abstract.entity';

@Entity('post_likes')
export class Like extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn()
  post: Post;
}
