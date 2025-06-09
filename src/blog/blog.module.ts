import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostsModule, CommentsModule]
})
export class BlogModule {}
