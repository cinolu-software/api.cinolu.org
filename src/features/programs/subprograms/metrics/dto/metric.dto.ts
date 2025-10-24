import { IsNotEmpty, IsOptional } from 'class-validator';

export class MetricDto {
  @IsNotEmpty()
  indicatorId: string;

  @IsOptional()
  target: number;

  @IsOptional()
  achieved: number;
}
