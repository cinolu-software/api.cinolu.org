import { Module } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Project } from '@/features/programs/projects/core/entities/project.entity';
import { Event } from '@/features/programs/events/core/entities/event.entity';
import { Product } from '@/features/ventures/products/core/entities/product.entity';
import { Venture } from '@/features/ventures/core/entities/venture.entity';
import { Article } from '@/features/blog/articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery, Project, Event, Product, Venture, Article])],
  providers: [GalleriesService],
  exports: [GalleriesService]
})
export class GalleriesModule {}
