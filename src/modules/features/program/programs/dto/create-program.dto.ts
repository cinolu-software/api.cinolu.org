import { IsArray, IsNotEmpty } from 'class-validator';
import { CreateRequirementDto } from 'src/modules/features/program/requirements/dto/create-requirement.dto';

export class CreateProgramDto {
  @IsNotEmpty({ message: 'Le nom du programme est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description du programme est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'La date de début du programme est obligatoire' })
  started_at: Date;

  @IsNotEmpty({ message: 'La date de fin du programme est obligatoire' })
  ended_at: Date;

  @IsArray({ message: 'Le type est obligatoire' })
  types: string[];

  @IsNotEmpty({ message: 'Les conditions du programme sont obligatoires' })
  requirements: CreateRequirementDto[];

  @IsNotEmpty({ message: 'Les partenaires sont recquis' })
  partners: string[];
}