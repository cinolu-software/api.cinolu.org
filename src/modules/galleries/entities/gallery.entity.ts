import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../core/database/abstract.entity';
import { Product } from '../../ventures/products/core/entities/product.entity';
import { Venture } from '../../ventures/core/entities/venture.entity';
import { Article } from '@/modules/blog/articles/entities/article.entity';
import { Project } from '@/modules/programs/projects/core/entities/project.entity';
import { Event } from '@/modules/programs/events/core/entities/event.entity';

@Entity()
export class Gallery extends AbstractEntity {
  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Project)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Event)
  @JoinColumn()
  event: Event;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Venture)
  @JoinColumn()
  venture: Venture;

  @ManyToOne(() => Article)
  @JoinColumn()
  article: Article;
}
