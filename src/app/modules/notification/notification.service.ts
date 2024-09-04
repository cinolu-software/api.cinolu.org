import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UsersService
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<{ data: Notification }> {
    const { title, message, recipientIds, senderId } = createNotificationDto;
    await this.userService.findOne(senderId);
    const data: Notification = await this.notificationRepository.save({
      title,
      message,
      sender: { id: senderId },
      recipients: recipientIds.map((id) => ({ id }))
    });
    return { data };
  }

  //   await this.notificationRepository.save(notification);

  //   for (const recipientId of recipientIds) {
  //     const recipientUser = await this.userRepository.findOne({ where: { id: recipientId } });
  //     const recipientRole = await this.roleRepository.findOne({ where: { id: recipientId } });

  //     if (recipientUser) {
  //       const recipient = this.notificationRecipientsRepository.create({
  //         notification,
  //         user: recipientUser
  //       });
  //       await this.notificationRecipientsRepository.save(recipient);
  //     } else if (recipientRole) {
  //       const recipient = this.notificationRecipientsRepository.create({
  //         notification,
  //         role: recipientRole
  //       });
  //       await this.notificationRecipientsRepository.save(recipient);
  //     }
  //   }

  //   return notification;
  // }

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['sender', 'recipients', 'attachments'] });
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['sender', 'recipients', 'attachments']
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.findOne(id);

    const updatedNotification = this.notificationRepository.merge(notification, updateNotificationDto);
    return this.notificationRepository.save(updatedNotification);
  }

  async remove(id: number): Promise<void> {
    const notification = await this.findOne(id);
    await this.notificationRepository.remove(notification);
  }
}
