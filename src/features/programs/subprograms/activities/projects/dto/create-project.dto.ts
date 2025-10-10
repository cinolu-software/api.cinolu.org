import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

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

  @IsArray()
  categories: string[];
}
