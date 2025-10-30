import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramCategory } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramCategory])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
