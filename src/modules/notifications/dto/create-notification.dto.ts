import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  title: string;

  @IsNotEmpty({ message: 'Le message est obligatoire' })
  message: string;

  @IsNotEmpty({ message: 'Les destinataires sont obligatoires' })
  recipients: string[] | string | boolean;
}
