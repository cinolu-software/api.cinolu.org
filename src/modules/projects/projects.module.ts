import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectParticipation } from './entities/participation.entity';
import { ProjectsController } from './projects.controller';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { UsersModule } from '@/modules/users/users.module';
import { VenturesModule } from '@/modules/ventures/ventures.module';

@Module({
  imports: [
    GalleriesModule,
    PhasesModule,
    CategoriesModule,
    UsersModule,
    VenturesModule,
    TypeOrmModule.forFeature([Project, ProjectParticipation])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectSubscriber],
  exports: [ProjectsService]
})
export class ProjectsModule {}
