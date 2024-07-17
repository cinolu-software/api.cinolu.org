import { IsNotEmpty } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description est obligatoir' })
  description: string;
}
