import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UsersService } from '../users/users.service';
import { AttachmentsService } from '../attachments/attachments.service';
import { Notification } from './entities/notification.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private userService: UsersService,
    private attachmentsService: AttachmentsService,
    private eventEmitter: EventEmitter2,
    private configService: ConfigService
  ) {}

  async create(dto: CreateNotificationDto): Promise<{ data: Notification }> {
    await this.userService.findOne(dto.sender);
    const { data: recipients } = await this.userService.getUsersByIds(dto.recipients);
    recipients.forEach((recipient) => {
      this.eventEmitter.emit('user.notify', { user: recipient, link: this.configService.get('ACCOUNT_URI') });
    });
    const data = await this.notificationRepository.save({
      ...dto,
      sender: { id: dto.sender },
      recipients: dto.recipients.map((id) => ({ id }))
    });
    return { data };
  }

  async addAttachments(id: number, files: Express.Multer.File[]): Promise<{ data: Notification }> {
    await this.findOne(id);
    try {
      const attachments = await Promise.all(
        files.map(async (file) => {
          const { data: attachment } = await this.attachmentsService.create({ name: file.filename });
          return attachment;
        })
      );
      const data = await this.notificationRepository.save({ id, attachments });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout de la pièce jointe");
    }
  }

  async findUserNotifications(userId: number): Promise<{ data: Notification[] }> {
    const data = await this.notificationRepository.find({
      where: { recipients: { id: userId } },
      relations: ['sender', 'recipients', 'attachments']
    });
    return { data };
  }

  async filterUserNotifications(userId: number, isRead: boolean): Promise<{ data: Notification[] }> {
    const data = await this.notificationRepository.find({
      where: { recipients: { id: userId }, is_read: isRead },
      relations: ['sender', 'recipients', 'attachments']
    });
    return { data };
  }

  async markAsRead(id: number): Promise<{ data: Notification }> {
    const { data: notification } = await this.findOne(id);
    const updatedNotification = this.notificationRepository.merge(notification, { is_read: true });
    const data = await this.notificationRepository.save(updatedNotification);
    return { data };
  }

  async findAll(): Promise<{ data: Notification[] }> {
    const data = await this.notificationRepository.find({ relations: ['sender', 'recipients', 'attachments'] });
    return { data };
  }

  async findOne(id: number): Promise<{ data: Notification }> {
    try {
      const data = await this.notificationRepository.findOneOrFail({
        where: { id },
        relations: ['sender', 'recipients', 'attachments']
      });
      return { data };
    } catch {
      throw new NotFoundException('Notification not found');
    }
  }

  async update(id: number, dto: UpdateNotificationDto): Promise<{ data: Notification }> {
    const { data: notification } = await this.findOne(id);
    const updatedNotification = this.notificationRepository.merge(notification, dto);
    const data = await this.notificationRepository.save(updatedNotification);
    return { data };
  }

  async remove(id: number): Promise<void> {
    try {
      const { data: notification } = await this.findOne(id);
      await this.notificationRepository.remove(notification);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la notification');
    }
  }
}
