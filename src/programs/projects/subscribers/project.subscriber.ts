import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import slugify from 'slugify';
import { Project } from '../entities/project.entity';

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {
  listenTo() {
    return Project;
  }

  async beforeInsert(event: InsertEvent<Project>): Promise<void> {
    const { name } = event.entity;
    event.entity.slug = slugify(name, { lower: true });
  }
}
