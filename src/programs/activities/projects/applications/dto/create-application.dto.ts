import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateApplicationDto {
  @IsObject()
  answers: JSON;

  @IsNotEmpty()
  project: string;
}
