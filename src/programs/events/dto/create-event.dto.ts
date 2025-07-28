import { Transform } from 'class-transformer';
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

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  started_at: Date;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  categories: string[];
}
