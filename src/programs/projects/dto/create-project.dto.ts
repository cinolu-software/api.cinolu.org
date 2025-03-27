import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  started_at: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  ended_at: Date;

  @IsNotEmpty()
  place: string;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
