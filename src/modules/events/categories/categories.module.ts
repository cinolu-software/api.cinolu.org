import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class EventCategoriesModule {}
