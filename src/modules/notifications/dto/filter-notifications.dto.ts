import { NotificationStatus } from '../types/notification-status.enum';

export class FilterNotificationsDto {
  phaseId?: string | null;
  page: string | null;
  status?: NotificationStatus | null;
}
