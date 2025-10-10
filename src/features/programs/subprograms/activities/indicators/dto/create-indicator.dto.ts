import { IsNotEmpty } from 'class-validator';

export class CreateIndicatorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: number;
}
