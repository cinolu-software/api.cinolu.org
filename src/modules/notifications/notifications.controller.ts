import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { UseRoles } from 'nest-access-control';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NotificationAttachment } from './entities/attachment.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('project/:id')
  @UseRoles({ resource: 'projects', action: 'read' })
  findAllByProject(@Param('id') id: string): Promise<Notification[]> {
    return this.notificationsService.findAllByProject(id);
  }

  @Patch(':id/read')
  @UseRoles({ resource: 'notifications', action: 'update' })
  markRead(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.markRead(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'notifications', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto): Promise<Notification> {
    return this.notificationsService.update(id, dto);
  }

  @Post(':id/attachments')
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
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<NotificationAttachment[]> {
    return this.notificationsService.addAttachments(id, files);
  }

  @Delete(':id')
  @UseRoles({ resource: 'notifications', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.notificationsService.remove(id);
  }
}
