import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../shared/utils/abstract.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class BlogCategory extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
