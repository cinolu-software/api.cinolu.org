import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

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

  @IsOptional()
  partners: string[];
}
