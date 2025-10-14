import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { IndicatorsModule } from '../indicators/indicators.module';
import { GalleriesModule } from 'src/features/galleries/galleries.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), CategoriesModule, IndicatorsModule, GalleriesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber]
})
export class ProjectsModule {}
