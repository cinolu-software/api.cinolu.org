import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from '../users/users.module';
import { AttachmentsModule } from '../attachments/attachments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule, AttachmentsModule],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
