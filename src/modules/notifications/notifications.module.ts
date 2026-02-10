import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { NotificationAttachment } from './entities/attachment.entity';
import { UsersModule } from '../users/users.module';
import { NotificationsEmailService } from './notifications-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationAttachment]), UsersModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsEmailService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
