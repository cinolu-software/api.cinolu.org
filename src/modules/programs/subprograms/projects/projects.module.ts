import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), CategoriesModule, GalleriesModule, MetricsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber]
})
export class ProjectsModule {}
