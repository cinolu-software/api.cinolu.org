import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CategoriesModule } from '../categories/categories.module';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { MetricsModule } from '@/modules/programs/subprograms/metrics/metrics.module';
import { Subprogram } from '@/modules/programs/subprograms/core/entities/subprogram.entity';

@Module({
  imports: [GalleriesModule, CategoriesModule, MetricsModule, TypeOrmModule.forFeature([Project, Subprogram])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber],
  exports: [ProjectsService]
})
export class ProjectsModule {}
