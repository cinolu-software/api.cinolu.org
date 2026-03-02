import { NotificationStatus } from '../types/notification-status.enum';
import { PaginatedQueryDto } from '@/core/dto/paginated-query.dto';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class FilterNotificationsDto extends PaginatedQueryDto {
  @IsOptional()
  @IsUUID()
  phaseId?: string;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;
}
