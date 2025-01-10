import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './controllers/projects.controller';
import { TypesController } from './controllers/types.controller';
import { TypesService } from './services/types.service';
import { Type } from './entities/type.entity';
import { Category } from './entities/category.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Type, Category])],
  controllers: [ProjectsController, TypesController, CategoriesController],
  providers: [ProjectsService, TypesService, CategoriesService]
})
export class ProjectsModule {}
