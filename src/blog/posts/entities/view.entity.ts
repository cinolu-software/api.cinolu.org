import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Post } from './post.entity';
import { AbstractEntity } from 'src/shared/utils/abstract.entity';

@Entity('post_views')
export class View extends AbstractEntity {
  @Column()
  ip: string;

  @ManyToOne(() => Post, (post) => post.views)
  @JoinColumn()
  post: Post;
}
