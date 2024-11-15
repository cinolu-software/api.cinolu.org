import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateApplicationDto {
  @IsObject()
  answer: JSON;

  @IsNotEmpty()
  program: string;
}
