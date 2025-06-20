import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  form_link: string;

  @IsNotEmpty()
  started_at: Date;

  @IsNotEmpty()
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsArray()
  categories: string[];
}
