import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { Notification } from './entities/notification.entity';
import { NotificationAttachment } from './entities/attachment.entity';
import { UsersModule } from '../users/users.module';
import { NotificationAttachmentsService } from './services/notification-attachments.service';
import { NOTIFICATIONS_RBAC_POLICY } from './notifications-rbac';
import { RBACModule } from '@/core/auth/rbac/rbac.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationAttachment]),
    UsersModule,
    RBACModule.forFeature([NOTIFICATIONS_RBAC_POLICY])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationAttachmentsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
