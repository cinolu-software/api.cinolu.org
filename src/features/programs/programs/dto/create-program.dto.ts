import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty({ message: 'Le nom du programme est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description du programme est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'La date de début du programme est obligatoire' })
  started_at: Date;

  @IsNotEmpty({ message: 'La date de fin du programme est obligatoire' })
  ended_at: Date;

  @IsNotEmpty()
  targeted_audience: string;

  @IsArray({ message: 'Le type est obligatoire' })
  types: string[];

  @IsArray({ message: 'La catégorie est obligatoire' })
  categories: string[];

  @IsNotEmpty({ message: 'Les partenaires sont recquis' })
  partners: string[];
}
