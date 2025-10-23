import { IsNotEmpty } from 'class-validator';

export class MetricDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  value: number;
}
