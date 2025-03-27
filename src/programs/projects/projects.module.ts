import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { ProjectSubscriber } from './subscribers/project.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), PhasesModule, CategoriesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber]
})
export class ProjectsModule {}
