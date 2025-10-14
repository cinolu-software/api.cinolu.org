import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesSubscriber } from './subscribers/articles.subscriber';
import { GalleriesModule } from 'src/features/galleries/galleries.module';

@Module({
  controllers: [ArticlesController, GalleriesModule],
  providers: [ArticlesService, ArticlesSubscriber],
  imports: [TypeOrmModule.forFeature([Article])]
})
export class ArticlesModule {}
