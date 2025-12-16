import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesSubscriber } from './subscribers/articles.subscriber';
import { GalleriesModule } from '@/features/galleries/galleries.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesSubscriber],
  imports: [TypeOrmModule.forFeature([Article]), GalleriesModule]
})
export class ArticlesModule {}
