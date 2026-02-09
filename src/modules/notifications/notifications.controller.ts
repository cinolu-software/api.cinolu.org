import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { Recipient } from './entities/recipient.entity';
import { FilterNotificationsDto } from './dto/filter-notifications.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('')
  @UseRoles({ resource: 'notifications', action: 'create' })
  create(@Body() dto: CreateNotificationDto, @CurrentUser() user: User): Promise<Notification> {
    return this.notificationsService.create(dto, user);
  }

  @Get('')
  @UseRoles({ resource: 'notifications', action: 'read', possession: 'own' })
  findMyNotifications(@CurrentUser() user: User, @Query() queryParams: FilterNotificationsDto): Promise<Recipient[]> {
    return this.notificationsService.findMyNotifications(user, queryParams.status);
  }

  @Get('sent')
  @UseRoles({ resource: 'notifications', action: 'read' })
  findSentNotifications(@Query() queryParams: FilterNotificationsDto): Promise<[Notification[], number]> {
    return this.notificationsService.findSentNotifications(queryParams);
  }

  @Patch(':id/read')
  @UseRoles({ resource: 'notifications', action: 'update', possession: 'own' })
  markAsRead(@Param('id') id: string, @CurrentUser() user: User): Promise<Recipient> {
    return this.notificationsService.markAsRead(id, user);
  }
}
