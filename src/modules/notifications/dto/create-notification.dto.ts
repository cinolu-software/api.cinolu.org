import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}
