import { Column, Entity, ManyToMany } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { BaseEntity } from 'src/shared/utils/abstract.entity';

@Entity()
export class PostCategory extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
