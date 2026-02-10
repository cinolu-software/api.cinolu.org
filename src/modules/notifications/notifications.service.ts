import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from '@/modules/users/entities/user.entity';
import { NotificationAttachment } from './entities/attachment.entity';
import { UsersService } from '../users/users.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { promises as fs } from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationAttachment)
    private attachmentsRepository: Repository<NotificationAttachment>,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(userIds: string[], dto: CreateNotificationDto): Promise<Notification> {
    try {
      const uniqueUserIds = [...new Set(userIds)];
      const recipients = await this.usersService.findByIds(uniqueUserIds);
      const savedNotification = await this.notificationsRepository.save({ ...dto, recipients });
      const notification = await this.findOne(savedNotification.id);
      this.eventEmitter.emit('notification.created', notification);
      return notification;
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Notification> {
    try {
      return await this.notificationsRepository.findOneOrFail({
        where: { id },
        relations: ['recipients', 'sender', 'attachments']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateNotificationDto): Promise<Notification> {
    try {
      const notification = await this.findOne(id);
      this.notificationsRepository.merge(notification, dto);
      const savedNotification = await this.notificationsRepository.save(notification);
      const withRelations = await this.findOne(savedNotification.id);
      this.eventEmitter.emit('notification.updated', withRelations);
      return withRelations;
    } catch {
      throw new BadRequestException();
    }
  }

  async findByUser(user: User): Promise<Notification[]> {
    return await this.notificationsRepository.find({
      where: { recipients: { id: user.id } },
      relations: ['attachments'],
      order: { created_at: 'DESC' }
    });
  }

  async markRead(id: string): Promise<Notification> {
    try {
      const notification = await this.notificationsRepository.findOneOrFail({
        where: { id },
        relations: ['attachments']
      });
      return await this.notificationsRepository.save({
        ...notification,
        is_read: true,
        read_at: new Date()
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addAttachment(id: string, file: Express.Multer.File): Promise<NotificationAttachment> {
    try {
      const notification = await this.notificationsRepository.findOneOrFail({
        where: { id }
      });
      const attachment = this.attachmentsRepository.create({
        filename: file.filename,
        mimetype: file.mimetype,
        notification: { id: notification.id }
      });
      return await this.attachmentsRepository.save(attachment);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAttachment(id: string): Promise<NotificationAttachment> {
    try {
      return await this.attachmentsRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async removeAttachment(id: string): Promise<void> {
    try {
      const attachment = await this.findAttachment(id);
      if (attachment.filename) fs.unlink(`./uploads/notifications/${attachment.filename}`);
      await this.attachmentsRepository.delete(attachment);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const notification = await this.notificationsRepository.findOneOrFail({
        where: { id }
      });
      await this.notificationsRepository.softDelete(notification);
    } catch {
      throw new BadRequestException();
    }
  }
}
