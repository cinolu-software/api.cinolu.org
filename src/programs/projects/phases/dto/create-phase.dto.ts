import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreatePhaseDto {
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
  project: string;

  @IsNotEmpty()
  requirements: JSON;
}
