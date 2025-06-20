import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

  @IsNotEmpty()
  @Type(() => Date)
  started_at: Date;

  @IsNotEmpty()
  @Type(() => Date)
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
