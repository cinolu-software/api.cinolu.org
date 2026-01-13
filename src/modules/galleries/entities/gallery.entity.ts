import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../core/database/abstract.entity';
import { Product } from '../../ventures/products/entities/product.entity';
import { Venture } from '../../ventures/entities/venture.entity';
import { Article } from '@/modules/blog/articles/entities/article.entity';
import { Project } from '@/modules/projects/entities/project.entity';
import { Event } from '@/modules/events/entities/event.entity';

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
