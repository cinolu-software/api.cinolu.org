import { IsArray, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Le nom du projet est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description du projet est obligatoire' })
  description: string;

  @IsDateString({}, { message: 'La date de début doit être une date valide' })
  start_at: Date;

  @IsDateString({}, { message: 'La date de fin doit être une date valide' })
  end_at: Date;

  @IsNotEmpty({ message: 'Le statut du projet est obligatoire' })
  status: number;

  @IsArray({ message: 'Les catégories du projet doivent être un tableau' })
  categories: number[];
}
