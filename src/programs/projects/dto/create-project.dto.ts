import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

  @Type(() => Date)
  @IsDate()
  started_at: Date;

  @Type(() => Date)
  @IsDate()
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
