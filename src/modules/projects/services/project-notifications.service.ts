import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationsService } from '@/modules/notifications/services/notifications.service';
import { Notification } from '@/modules/notifications/entities/notification.entity';
import { CreateNotificationDto } from '@/modules/notifications/dto/create-notification.dto';
import { User } from '@/modules/users/entities/user.entity';
import { ProjectsService } from './projects.service';
import { ProjectParticipationService } from './project-participations.service';

@Injectable()
export class ProjectNotificationService {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly projectsService: ProjectsService,
    private readonly participationService: ProjectParticipationService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createNotification(projectId: string, user: User, dto: CreateNotificationDto): Promise<Notification> {
    try {
      await this.projectsService.findOne(projectId);
      const notification = await this.notificationsService.create(projectId, user.id, dto);
      return this.notificationsService.findOne(notification.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async sendNotification(notificationId: string): Promise<Notification> {
    try {
      const notification = await this.notificationsService.findOne(notificationId);
      const recipients = notification.phase
        ? await this.participationService.findParticipantsByPhase(notification.phase.id)
        : await this.participationService.findParticipantsByProject(notification.project.id);
      this.eventEmitter.emit('notify.participants', recipients, notification);
      return await this.notificationsService.sendNotification(notificationId);
    } catch {
      throw new BadRequestException();
    }
  }
}
