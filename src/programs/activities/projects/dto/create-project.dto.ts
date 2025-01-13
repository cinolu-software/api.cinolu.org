import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Le nom du programme est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description du programme est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'La date de début du programme est obligatoire' })
  @Transform(({ value }) => new Date(value))
  started_at: Date;

  @IsNotEmpty({ message: 'La date de fin du programme est obligatoire' })
  @Transform(({ value }) => new Date(value))
  ended_at: Date;

  @IsNotEmpty()
  targeted_audience: string;

  @IsNotEmpty()
  aim: string;

  @IsNotEmpty()
  prize: string;

  @IsNotEmpty()
  town: string;

  @IsNotEmpty()
  program: string;

  @IsArray({ message: 'Le type est obligatoire' })
  types: string[];

  @IsArray({ message: 'La  catégorie est obligatoire' })
  categories: string[];

  @IsNotEmpty({ message: 'Les partenaires sont recquis' })
  partners: string[];
}
