import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { Notification } from './entities/notification.entity';
import { NotificationAttachment } from './entities/attachment.entity';
import { UsersModule } from '../users/users.module';
import { NotificationAttachmentsService } from './services/notification-attachments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationAttachment]), UsersModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationAttachmentsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
