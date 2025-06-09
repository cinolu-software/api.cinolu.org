import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import slugify from 'slugify';
import { Enterprise } from '../entities/enterprise.entity';

@EventSubscriber()
export class EnterpriseSubscriber implements EntitySubscriberInterface<Enterprise> {
  listenTo() {
    return Enterprise;
  }

  async beforeInsert(event: InsertEvent<Enterprise>): Promise<void> {
    const { name } = event.entity;
    event.entity.slug = slugify(name, { lower: true });
  }
}
