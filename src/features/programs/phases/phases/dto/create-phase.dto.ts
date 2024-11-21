import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePhaseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(+year, +month - 1, +day);
  })
  started_at: Date;

  @IsNotEmpty()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(+year, +month - 1, +day);
  })
  ended_at: Date;

  @IsNotEmpty()
  program: string;

  @IsOptional()
  form: JSON;
}
