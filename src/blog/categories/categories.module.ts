import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogCategory } from './entities/category.entity';
import { CategorySubscriber } from './subscribers/category.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategorySubscriber]
})
export class CategoriesModule {}
