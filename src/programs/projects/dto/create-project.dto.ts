import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  review_form: JSON;

  @IsOptional()
  form: JSON;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  started_at: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];

  @IsArray()
  partners: string[];
}
