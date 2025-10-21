import { IsNotEmpty, IsOptional } from 'class-validator';

export class MetricDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  target: number;

  @IsOptional()
  achieved: number;

  @IsOptional()
  is_public: boolean;
}
