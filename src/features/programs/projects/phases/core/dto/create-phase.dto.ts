import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreatePhaseDto {
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  started_at?: Date;

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  ended_at?: Date;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsNotEmpty()
  project: string;
}
