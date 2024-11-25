import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from './entities/notification.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Rights } from '../auth/decorators/rights.decorators';
import { RightsEnum } from '../auth/enums/rights.enum';
import { User } from '../users/users/entities/user.entity';

@Controller('notifications')
@Rights(RightsEnum.Staff)
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
  @Rights(RightsEnum.User)
  async findUserNotifications(@Param('id') id: string): Promise<{ data: Notification[] }> {
    return await this.notificationService.findUserNotifications(id);
  }

  @Get('user/:id/:isRead')
  @Rights(RightsEnum.User)
  async filterUserNotifications(
    @Param() id: string,
    @Param('isRead') isRead: boolean
  ): Promise<{ data: Notification[] }> {
    return await this.notificationService.filterUserNotifications(id, isRead);
  }

  @Patch('read/:id')
  @Rights(RightsEnum.User)
  async markAsRead(@Param('id') id: string): Promise<{ data: Notification }> {
    return await this.notificationService.markAsRead(id);
  }

  @Post('send/:id')
  async send(@Param('id') id: string): Promise<{ data: Notification }> {
    return this.notificationService.send(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ data: Notification }> {
    return this.notificationService.findOne(id);
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
