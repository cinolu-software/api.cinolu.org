import { IsNotEmpty, IsString } from 'class-validator';

export class BaseMessageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
