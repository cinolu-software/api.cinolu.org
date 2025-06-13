import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsString()
  place: string;

  @IsOptional()
  form_link: string;

  @IsNotEmpty()
  started_at: Date;

  @IsNotEmpty()
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  categories: string[];
}
