import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  title: string;

  @IsNotEmpty({ message: 'Le message est obligatoire' })
  message: string;

  @IsOptional()
  recipients: string[];

  @IsOptional()
  to_group: string;

  @IsOptional()
  to_all: boolean;
}
