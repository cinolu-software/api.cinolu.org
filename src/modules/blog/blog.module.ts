import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
import { BLOG_RBAC_POLICY } from './blog-rbac';
import { RBACModule } from '@/core/auth/rbac/rbac.module';

@Module({
  imports: [ArticlesModule, TagsModule, CommentsModule, RBACModule.forFeature([BLOG_RBAC_POLICY])]
})
export class BlogModule {}
