import { IsNotEmpty } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
