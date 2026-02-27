import { Module } from '@nestjs/common';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesSubscriber } from './subscribers/articles.subscriber';
import { ArticleMediaService } from './services/article-media.service';
import { GalleriesModule } from '@/shared/galleries/galleries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), GalleriesModule],
  providers: [ArticlesService, ArticleMediaService, ArticlesSubscriber],
  controllers: [ArticlesController]
})
export class ArticlesModule {}
