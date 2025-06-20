import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { parseDate } from 'src/shared/utils/parse-date.fn';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsString()
  place: string;

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

  @IsNotEmpty()
  categories: string[];
}
