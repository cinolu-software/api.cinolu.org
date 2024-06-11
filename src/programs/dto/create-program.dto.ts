import { IsNotEmpty } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty({ message: 'Le nom du programme est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description du programme est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'La date de début du programme est obligatoire' })
  start_at: Date;

  @IsNotEmpty({ message: 'La date de fin du programme est obligatoire' })
  end_at: Date;
}
