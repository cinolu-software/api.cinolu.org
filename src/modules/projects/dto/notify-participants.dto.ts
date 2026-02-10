import { CreateNotificationDto } from '@/modules/notifications/dto/create-notification.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class NotifyParticipantsDto extends CreateNotificationDto {
  @IsOptional()
  @IsUUID()
  phase_id?: string;
}
