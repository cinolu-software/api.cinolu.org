import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './entities/notification.entity';
import { Recipient } from './entities/recipient.entity';
import { UsersModule } from '@/modules/users/users.module';
import { ProgramsModule } from '@/modules/programs/programs.module';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { EventsModule } from '@/modules/events/events.module';

const NOTIFICATIONS_ENTITIES = [Notification, Recipient];

@Module({
  imports: [
    TypeOrmModule.forFeature(NOTIFICATIONS_ENTITIES),
    UsersModule,
    ProgramsModule,
    EventsModule,
    forwardRef(() => ProjectsModule)
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
