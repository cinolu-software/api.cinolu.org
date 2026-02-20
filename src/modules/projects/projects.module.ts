import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { UsersModule } from '@/modules/users/users.module';
import { VenturesModule } from '@/modules/ventures/ventures.module';
import { Project } from './entities/project.entity';
import { ProjectParticipation } from './entities/project-participation.entity';
import { ProjectsController } from './projects.controller';
import { ProjectCategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { ProjectMediaService } from './services/project-media.service';
import { ProjectParticipationService } from './services/project-participations.service';
import { ProjectNotificationService } from './services/project-notifications.service';
import { ProjectsEmailService } from './services/projects-email.service';
import { ProjectsService } from './services/projects.service';
import { ProjectSubscriber } from './subscribers/project.subscriber';

@Module({
  imports: [
    GalleriesModule,
    NotificationsModule,
    PhasesModule,
    ProjectCategoriesModule,
    UsersModule,
    VenturesModule,
    TypeOrmModule.forFeature([Project, ProjectParticipation])
  ],
  providers: [
    ProjectsService,
    ProjectParticipationService,
    ProjectNotificationService,
    ProjectMediaService,
    ProjectsEmailService,
    ProjectSubscriber
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService]
})
export class ProjectsModule {}
