import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationAttachment } from './entities/attachment.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { promises as fs } from 'fs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationStatus } from './types/notification-status.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(NotificationAttachment)
    private attachmentsRepository: Repository<NotificationAttachment>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(projectId: string, senderId: string, dto: CreateNotificationDto): Promise<Notification> {
    try {
      const savedNotification = await this.notificationsRepository.save({
        ...dto,
        project: { id: projectId },
        sender: { id: senderId },
        phase: dto.phase_id ? { id: dto.phase_id } : null
      });
      const notification = await this.findOne(savedNotification.id);
      return notification;
    } catch {
      throw new BadRequestException();
    }
  }

  async sendNotification(id: string): Promise<Notification> {
    try {
      await this.notificationsRepository.update(id, { status: NotificationStatus.SENT });
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAllByProject(projectId: string): Promise<Notification[]> {
    return await this.notificationsRepository.find({
      where: { project: { id: projectId } },
      relations: ['phase', 'sender', 'attachments'],
      order: { created_at: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Notification> {
    try {
      return await this.notificationsRepository.findOneOrFail({
        where: { id },
        relations: ['phase', 'sender', 'attachments', 'project']
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

  async addAttachments(id: string, files: Express.Multer.File[]): Promise<NotificationAttachment[]> {
    try {
      const notification = await this.notificationsRepository.findOneOrFail({
        where: { id }
      });
      const attachments = files.map((file) => ({
        filename: file.filename,
        mimetype: file.mimetype,
        notification: { id: notification.id }
      }));
      return await this.attachmentsRepository.save(attachments);
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
