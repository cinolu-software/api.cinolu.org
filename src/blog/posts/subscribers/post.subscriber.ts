import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import slugify from 'slugify';
import { Post } from '../entities/post.entity';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
  listenTo() {
    return Post;
  }

  async beforeInsert(event: InsertEvent<Post>): Promise<void> {
    const { title } = event.entity;
    event.entity.slug = slugify(title, { lower: true });
  }
}
