import { IsBoolean, IsOptional } from 'class-validator';
import { BaseMessageDto } from './base-message.dto';

export class NotifyMessageDto extends BaseMessageDto {
  @IsOptional()
  @IsBoolean()
  send_email?: boolean;
}
