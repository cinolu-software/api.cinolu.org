import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import slugify from 'slugify';
import { BlogCategory } from '../entities/category.entity';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<BlogCategory> {
  listenTo() {
    return BlogCategory;
  }

  async beforeInsert(event: InsertEvent<BlogCategory>): Promise<void> {
    const { slug } = event.entity;
    event.entity.slug = slugify(slug, { lower: true });
  }
}
