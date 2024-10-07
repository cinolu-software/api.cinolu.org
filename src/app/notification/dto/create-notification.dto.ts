import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  title: string;

  @IsNotEmpty({ message: 'Le message est obligatoire' })
  message: string;

  @IsArray({ message: 'Les destinataires sont obligatoires' })
  recipients: number[];
}
