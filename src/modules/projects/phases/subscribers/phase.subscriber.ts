import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import slugify from 'slugify';
import { Phase } from '../entities/phase.entity';

@EventSubscriber()
export class PhaseSubscriber implements EntitySubscriberInterface<Phase> {
  listenTo() {
    return Phase;
  }

  async beforeInsert(event: InsertEvent<Phase>): Promise<void> {
    const { name } = event.entity;
    event.entity.slug = slugify(name, { lower: true });
  }

  async beforeUpdate(event: UpdateEvent<Phase>): Promise<void> {
    const { name } = event.entity;
    if (!name) return;
    event.entity.slug = slugify(name, { lower: true });
  }
}
