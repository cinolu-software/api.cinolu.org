import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  message: string;

  @IsOptional()
  reply_to: string;

  @IsNotEmpty()
  sender: string;
}
