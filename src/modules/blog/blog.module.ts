import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
import { BLOG_RBAC } from './blog-rbac';

@Module({
  imports: [ArticlesModule, TagsModule, CommentsModule],
  providers: [BLOG_RBAC]
})
export class BlogModule {}
