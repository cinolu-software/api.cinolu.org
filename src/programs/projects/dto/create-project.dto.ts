import { IsArray, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

  @IsDate()
  @Type(() => Date)
  started_at: string;

  @IsDate()
  @Type(() => Date)
  ended_at: string;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
