import { BaseEntity } from 'src/shared/utils/abstract.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from 'src/core/users/entities/user.entity';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';

@Entity()
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_highlighted: boolean;

  @Column({ type: 'longtext' })
  summary: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ type: 'datetime', nullable: true })
  published_at: Date;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @OneToMany(() => Gallery, (gallery) => gallery.article)
  gallery: Gallery[];
}
