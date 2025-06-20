import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

  @IsDate()
  @Type(() => Date)
  started_at: Date;

  @IsDate()
  @Type(() => Date)
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
