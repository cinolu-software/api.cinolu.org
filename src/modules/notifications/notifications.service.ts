import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Recipient } from './entities/recipient.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationAudience } from './types/audience.enum';
import { User } from '@/modules/users/entities/user.entity';
import { FilterNotificationsDto } from './dto/filter-notifications.dto';
import { NotificationStatus } from './types/status.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>
  ) {}

  async create(dto: CreateNotificationDto, currentUser: User): Promise<Notification> {
    try {
      return await this.notificationRepository.save({
        ...dto,
        role_name: dto.audience === NotificationAudience.ROLE ? dto.role_name : null,
        created_by: { id: currentUser.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findMyNotifications(user: User, status?: NotificationStatus): Promise<Recipient[]> {
    try {
      const query = this.recipientRepository
        .createQueryBuilder('recipient')
        .leftJoinAndSelect('recipient.notification', 'notification')
        .leftJoinAndSelect('notification.program', 'program')
        .leftJoinAndSelect('notification.created_by', 'created_by')
        .where('recipient.userId = :userId', { userId: user.id })
        .orderBy('notification.created_at', 'DESC');
      if (status === 'read') query.andWhere('recipient.is_read = :isRead', { isRead: true });
      if (status === 'unread') query.andWhere('recipient.is_read = :isRead', { isRead: false });
      return await query.getMany();
    } catch {
      throw new BadRequestException();
    }
  }

  async findSentNotifications(queryParams: FilterNotificationsDto): Promise<[Notification[], number]> {
    try {
      const { page = 1 } = queryParams;
      const take = 30;
      const skip = (+page - 1) * take;
      const query = this.notificationRepository
        .createQueryBuilder('notification')
        .leftJoinAndSelect('notification.program', 'program')
        .leftJoinAndSelect('notification.created_by', 'created_by')
        .loadRelationCountAndMap('notification.recipientsCount', 'notification.recipients')
        .orderBy('notification.created_at', 'DESC')
        .skip(skip)
        .take(take);
      return await query.getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async markAsRead(notificationId: string, user: User): Promise<Recipient> {
    try {
      const recipient = await this.recipientRepository.findOneOrFail({
        where: {
          notification: { id: notificationId },
          user: { id: user.id }
        }
      });
      if (!recipient.is_read) {
        return await this.recipientRepository.save({
          ...recipient,
          is_read: true,
          read_at: new Date()
        });
      }
      return recipient;
    } catch {
      throw new BadRequestException();
    }
  }
}
