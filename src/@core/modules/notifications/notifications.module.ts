import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationAttachment } from './entities/attachment.entity';
import { UsersModule } from '../../../features/users/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationAttachment]), UsersModule],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
