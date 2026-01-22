import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateOpportunityDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @Transform(({ value }) => new Date(value))
  started_at: Date;

  @Transform(({ value }) => new Date(value))
  ended_at: string;

  @IsArray()
  @IsNotEmpty()
  tags: string[];
}
