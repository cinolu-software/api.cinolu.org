import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import slugify from 'slugify';
import { BlogCategory } from '../entities/category.entity';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<BlogCategory> {
  listenTo() {
    return BlogCategory;
  }

  async beforeInsert(event: InsertEvent<BlogCategory>): Promise<void> {
    const { name } = event.entity;
    event.entity.slug = slugify(name, { lower: true });
  }
}
