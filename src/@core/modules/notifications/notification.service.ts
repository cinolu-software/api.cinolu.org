import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { NotificationAttachment } from './entities/attachment.entity';
import { User } from '../users/users/entities/user.entity';
import { UsersService } from '../users/users/users.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationAttachment)
    private attachmentRepository: Repository<NotificationAttachment>,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(@CurrentUser() user: User, dto: CreateNotificationDto): Promise<{ data: Notification }> {
    const recipients = await this.findRecipients(dto.recipients);
    const data = await this.notificationRepository.save({
      ...dto,
      sender: { id: user.id },
      recipients,
      to_all: dto.to_all || false,
      to_group: dto.to_group || null
    });
    return { data };
  }

  async addAttachments(id: string, files: Express.Multer.File[]): Promise<{ data: Notification }> {
    try {
      const { data: notification } = await this.findOne(id);
      const attachments = await Promise.all(
        files.map((file) => this.attachmentRepository.save({ name: file.filename }))
      );
      const data = await this.notificationRepository.save({ ...notification, attachments });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout de la pièce jointe");
    }
  }

  async send(id: string): Promise<{ data: Notification }> {
    try {
      const { data } = await this.findOne(id);
      const recipients = await this.getRecipients(data);
      recipients.forEach((recipient) => {
        this.eventEmitter.emit('user.notify', { user: recipient, data });
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'envoi");
    }
  }

  async findUserNotifications(userId: string): Promise<{ data: Notification[] }> {
    try {
      const data = await this.notificationRepository.find({
        where: { recipients: { id: userId } },
        relations: ['sender', 'recipients', 'attachments']
      });
      return { data };
    } catch {
      throw new NotFoundException('Une erreur est survenue sur le serveur');
    }
  }

  async filterUserNotifications(userId: string, isRead: boolean): Promise<{ data: Notification[] }> {
    try {
      const data = await this.notificationRepository.find({
        where: { recipients: { id: userId }, is_read: isRead },
        relations: ['sender', 'recipients', 'attachments']
      });
      return { data };
    } catch {
      throw new NotFoundException('Une erreur est survenue sur le serveur');
    }
  }

  async markAsRead(id: string): Promise<{ data: Notification }> {
    try {
      const { data: notification } = await this.findOne(id);
      const data = await this.notificationRepository.save({
        ...notification,
        is_read: true
      });
      return { data };
    } catch {
      throw new NotFoundException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Notification[] }> {
    const data = await this.notificationRepository.find({ relations: ['sender', 'recipients', 'attachments'] });
    return { data };
  }

  async findOne(id: string): Promise<{ data: Notification }> {
    try {
      const data = await this.notificationRepository.findOneOrFail({
        where: { id },
        relations: ['sender', 'recipients', 'attachments']
      });
      return { data };
    } catch {
      throw new NotFoundException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateNotificationDto): Promise<{ data: Notification }> {
    try {
      const recipients = await this.findRecipients(dto.recipients);
      const { data: notification } = await this.findOne(id);
      const data = await this.notificationRepository.save({
        ...notification,
        ...dto,
        recipients
      });
      return { data };
    } catch {
      throw new NotFoundException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const { data: notification } = await this.findOne(id);
      await this.notificationRepository.remove(notification);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la notification');
    }
  }

  private async getRecipients(notification: Notification): Promise<User[]> {
    if (notification.to_all) {
      const { data: users } = await this.usersService.findAll();
      return users;
    } else if (notification.to_group) {
      const { data: users } = await this.usersService.findByRole(notification.to_group);
      return users;
    }
    return notification.recipients;
  }

  private async findRecipients(dto: string[]): Promise<User[]> {
    if (typeof dto !== 'object') return;
    const { data } = await this.usersService.findByIds(dto);
    return data;
  }
}
