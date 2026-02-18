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
import { UseRoles } from 'nest-access-control';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
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
  @UseRoles({ resource: 'projects', action: 'read' })
  findAllByProject(
    @Param('projectId') projectId: string,
    @Query() query: FilterNotificationsDto
  ): Promise<[Notification[], number]> {
    return this.notificationsService.findAllByProject(projectId, query);
  }

  @Patch(':notificationId/read')
  @UseRoles({ resource: 'notifications', action: 'update' })
  markRead(@Param('notificationId') notificationId: string): Promise<Notification> {
    return this.notificationsService.markRead(notificationId);
  }

  @Patch(':notificationId')
  @UseRoles({ resource: 'notifications', action: 'update' })
  update(@Param('notificationId') notificationId: string, @Body() dto: UpdateNotificationDto): Promise<Notification> {
    return this.notificationsService.update(notificationId, dto);
  }

  @Post(':notificationId/attachments')
  @UseRoles({ resource: 'notifications', action: 'update' })
  @UseInterceptors(
    FilesInterceptor('attachments', 10, {
      storage: diskStorage({
        destination: './uploads/notifications',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addAttachments(
    @Param('notificationId') notificationId: string,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<NotificationAttachment[]> {
    return this.notificationAttachmentsService.addAttachments(notificationId, files);
  }

  @Delete(':notificationId')
  @UseRoles({ resource: 'notifications', action: 'delete' })
  remove(@Param('notificationId') notificationId: string): Promise<void> {
    return this.notificationsService.remove(notificationId);
  }
}
