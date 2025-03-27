import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  attendees: number;

  @IsString()
  location: string;

  @IsOptional()
  online_link: string;

  @IsNotEmpty()
  started_at: Date;

  @IsNotEmpty()
  ended_at: Date;

  @IsNotEmpty()
  responsible: string;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  categories: string[];
}
