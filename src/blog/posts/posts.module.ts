import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostSubscriber } from './subscribers/post.subscriber';
import { View } from './entities/view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, View])],
  controllers: [PostsController],
  providers: [PostsService, PostSubscriber]
})
export class PostsModule {}
