import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Notification } from './entities/notification.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('')
  @UseInterceptors(
    FilesInterceptor('attachment', 4, {
      storage: diskStorage({
        destination: './uploads/attachments'
      })
    })
  )
  addAttachments(
    @Body() dto: CreateNotificationDto,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<{ data: Notification }> {
    return this.notificationService.create(dto, files);
  }

  @Get()
  async findAll(): Promise<{ data: Notification[] }> {
    return await this.notificationService.findAll();
  }

  @Get('user/:id')
  async findUserNotifications(@Param('id') id: number): Promise<{ data: Notification[] }> {
    return await this.notificationService.findUserNotifications(id);
  }

  @Get('user/:id/:isRead')
  async filterUserNotifications(
    @Param('id') id: number,
    @Param('isRead') isRead: boolean
  ): Promise<{ data: Notification[] }> {
    return await this.notificationService.filterUserNotifications(id, isRead);
  }

  @Patch('read/:id')
  async markAsRead(@Param('id') id: number): Promise<{ data: Notification }> {
    return await this.notificationService.markAsRead(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<{ data: Notification }> {
    const notification = await this.notificationService.findOne(id);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNotificationDto: UpdateNotificationDto
  ): Promise<{ data: Notification }> {
    return await this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.notificationService.remove(id);
  }
}
