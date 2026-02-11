import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsOptional()
  phase_id?: string;
}
