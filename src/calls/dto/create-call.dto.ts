import { IsNotEmpty } from 'class-validator';

export class CreateCallDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  form: JSON;
}
