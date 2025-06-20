import { IsArray, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseDate } from 'src/shared/utils/parse-date.fn';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

  @Transform(({ value }) => parseDate(value))
  @IsDate()
  started_at: Date;

  @Transform(({ value }) => parseDate(value))
  @IsDate()
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
