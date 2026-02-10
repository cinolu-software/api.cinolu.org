import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { UseRoles } from 'nest-access-control';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NotificationAttachment } from './entities/attachment.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findByUser(@CurrentUser() user: User): Promise<Notification[]> {
    return this.notificationsService.findByUser(user);
  }

  @Patch(':id/read')
  @UseRoles({ resource: 'notifications', action: 'update', possession: 'own' })
  markRead(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.markRead(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'notifications', action: 'update', possession: 'own' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto): Promise<Notification> {
    return this.notificationsService.update(id, dto);
  }

  @Post(':id/attachments')
  @UseRoles({ resource: 'notifications', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads/notifications',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addAttachment(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<NotificationAttachment> {
    return this.notificationsService.addAttachment(id, file);
  }

  @Delete(':id')
  @UseRoles({ resource: 'notifications', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.notificationsService.remove(id);
  }
}
