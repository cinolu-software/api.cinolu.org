import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsString()
  place: string;

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

  @IsNotEmpty()
  categories: string[];
}
