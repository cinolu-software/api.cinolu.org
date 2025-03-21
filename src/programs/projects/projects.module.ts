import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { CategoriesModule } from './categories/categories.module';
import { TypesModule } from './types/types.module';
import { PhasesModule } from './phases/phases.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), PhasesModule, CategoriesModule, TypesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
