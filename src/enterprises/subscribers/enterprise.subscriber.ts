import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
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

  async beforeUpdate(event: UpdateEvent<Enterprise>): Promise<void> {
    const { name } = event.entity;
    if (!name) return;
    event.entity.slug = slugify(name, { lower: true });
  }
}
