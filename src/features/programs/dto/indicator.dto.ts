import { IsNotEmpty } from 'class-validator';

export class IndicatorDto {
  @IsNotEmpty()
  name: string;
}
