import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CategoriesModule } from '../categories/categories.module';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { GalleriesModule } from '@/features/galleries/galleries.module';
import { MetricsModule } from '@/features/programs/subprograms/metrics/metrics.module';
import { Subprogram } from '@/features/programs/subprograms/core/entities/subprogram.entity';
import { PhasesModule } from '../phases/core/phases.module';

@Module({
  imports: [
    GalleriesModule,
    CategoriesModule,
    PhasesModule,
    MetricsModule,
    TypeOrmModule.forFeature([Project, Subprogram])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber],
  exports: [ProjectsService]
})
export class ProjectsModule {}
