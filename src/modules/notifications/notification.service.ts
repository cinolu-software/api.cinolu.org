import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AttachmentsService } from '../attachments/attachments.service';
import { Notification } from './entities/notification.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private attachmentsService: AttachmentsService,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2
  ) {}

  async findRecipients(dto: string[] | string | boolean): Promise<User[]> {
    let recipients: User[];
    if (typeof dto === 'string') {
      const { data } = await this.usersService.findByRole(dto);
      recipients = data;
    }
    if (typeof dto === 'boolean') {
      const { data } = await this.usersService.findAll();
      recipients = data;
    }
    if (typeof dto === 'object') {
      const { data } = await this.usersService.findByIds(dto);
      recipients = data;
    }
    return recipients;
  }

  async create(@CurrentUser() user: User, dto: CreateNotificationDto): Promise<{ data: Notification }> {
    const recipients = await this.findRecipients(dto.recipients);
    const data: Notification = await this.notificationRepository.save({
      ...dto,
      sender: { id: user.id },
      recipients
    });
    return { data };
  }

  async addAttachments(id: string, files: Express.Multer.File[]): Promise<{ data: Notification }> {
    try {
      const { data: notification } = await this.findOne(id);
      const attachments = await Promise.all(
        files.map(async (file) => {
          const { data: attachment } = await this.attachmentsService.create({ name: file.filename });
          return attachment;
        })
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
      const recipients = data.recipients;
      recipients.forEach((recipient) => {
        this.eventEmitter.emit('user.notify', { user: recipient, data });
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout de l'envoie");
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
}
