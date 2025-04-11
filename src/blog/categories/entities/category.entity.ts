import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('postsCategory')
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
