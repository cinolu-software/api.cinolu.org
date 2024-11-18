import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhaseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  started_at: Date;

  @IsNotEmpty()
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsOptional()
  form: JSON;
}
