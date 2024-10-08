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
import { v4 as uuidv4 } from 'uuid';
import { Notification } from './entities/notification.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@CurrentUser() user: User, @Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(user, createNotificationDto);
  }

  @Post('attachment/:id')
  @UseInterceptors(
    FilesInterceptor('attachment', 4, {
      storage: diskStorage({
        destination: './uploads/attachments',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addAttachments(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[]
  ): Promise<{ data: Notification }> {
    return this.notificationService.addAttachments(id, files);
  }

  @Get()
  async findAll(): Promise<{ data: Notification[] }> {
    return await this.notificationService.findAll();
  }

  @Get('user/:id')
  async findUserNotifications(@Param('id') id: string): Promise<{ data: Notification[] }> {
    return await this.notificationService.findUserNotifications(id);
  }

  @Get('user/:id/:isRead')
  async filterUserNotifications(
    @Param('id') id: string,
    @Param('isRead') isRead: boolean
  ): Promise<{ data: Notification[] }> {
    return await this.notificationService.filterUserNotifications(id, isRead);
  }

  @Patch('read/:id')
  async markAsRead(@Param('id') id: string): Promise<{ data: Notification }> {
    return await this.notificationService.markAsRead(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ data: Notification }> {
    const notification = await this.notificationService.findOne(id);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ): Promise<{ data: Notification }> {
    return await this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notificationService.remove(id);
  }
}
