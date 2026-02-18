import { Module } from '@nestjs/common';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesSubscriber } from './subscribers/articles.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { ArticleMediaService } from './services/article-media.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleMediaService, ArticlesSubscriber],
  imports: [TypeOrmModule.forFeature([Article]), GalleriesModule]
})
export class ArticlesModule {}
