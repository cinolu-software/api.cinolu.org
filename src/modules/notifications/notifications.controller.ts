import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { NotificationAttachmentsService } from './services/notification-attachments.service';
import { Notification } from './entities/notification.entity';
import { Rbac } from 'nestjs-session-auth';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { NotificationAttachment } from './entities/attachment.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotificationsDto } from './dto/filter-notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationAttachmentsService: NotificationAttachmentsService
  ) {}

  @Get('project/:projectId')
  @Rbac({ resource: 'projects', action: 'read' })
  findAllByProject(
    @Param('projectId') projectId: string,
    @Query() query: FilterNotificationsDto
  ): Promise<[Notification[], number]> {
    return this.notificationsService.findByProject(projectId, query);
  }

  @Patch(':notificationId')
  @Rbac({ resource: 'notifications', action: 'update' })
  update(@Param('notificationId') notificationId: string, @Body() dto: UpdateNotificationDto): Promise<Notification> {
    return this.notificationsService.update(notificationId, dto);
  }

  @Post(':notificationId/attachments')
  @Rbac({ resource: 'notifications', action: 'update' })
  @UseInterceptors(FilesInterceptor('attachments', 10, createDiskUploadOptions('./uploads/notifications')))
  addAttachments(
    @Param('notificationId') notificationId: string,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<NotificationAttachment[]> {
    return this.notificationAttachmentsService.addAttachments(notificationId, files);
  }

  @Delete(':notificationId')
  @Rbac({ resource: 'notifications', action: 'delete' })
  remove(@Param('notificationId') notificationId: string): Promise<void> {
    return this.notificationsService.remove(notificationId);
  }
}
