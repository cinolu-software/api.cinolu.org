import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { NotificationAudience } from '../types/audience.enum';
import { BaseMessageDto } from './base-message.dto';

export class CreateNotificationDto extends BaseMessageDto {
  @IsEnum(NotificationAudience)
  audience: NotificationAudience;

  @IsOptional()
  @IsString()
  role_name?: string;

  @IsOptional()
  @IsUUID()
  project_id?: string;
}
