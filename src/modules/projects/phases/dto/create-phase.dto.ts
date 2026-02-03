import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreatePhaseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  started_at: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  ended_at: Date;
}
