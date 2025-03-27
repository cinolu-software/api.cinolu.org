import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('postsCategory')
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
