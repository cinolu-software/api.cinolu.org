import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectParticipation } from './entities/project-participation.entity';
import { Phase } from './phases/entities/phase.entity';
import { PhaseDeliverable } from './phases/deliverables/entities/deliverable.entity';
import { ProjectsController } from './projects.controller';
import { ProjectSubscriber } from './subscribers/project.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { ProjectCategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { UsersModule } from '@/modules/users/users.module';
import { VenturesModule } from '@/modules/ventures/ventures.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { ProjectsEmailService } from './services/projects-email.service';
import { ProjectParticipationService } from './services/project-participation.service';
import { ProjectNotificationService } from './services/project-notification.service';
import { ProjectMediaService } from './services/project-media.service';

@Module({
  imports: [
    GalleriesModule,
    PhasesModule,
    ProjectCategoriesModule,
    UsersModule,
    VenturesModule,
    NotificationsModule,
    TypeOrmModule.forFeature([Project, ProjectParticipation, Phase, PhaseDeliverable])
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectParticipationService,
    ProjectNotificationService,
    ProjectMediaService,
    ProjectsEmailService,
    ProjectSubscriber
  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}
