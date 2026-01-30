import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [GalleriesModule, CategoriesModule, TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber],
  exports: [ProjectsService]
})
export class ProjectsModule {}
