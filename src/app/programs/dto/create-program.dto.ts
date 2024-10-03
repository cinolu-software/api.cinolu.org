import { IsArray, IsNotEmpty } from 'class-validator';
import { CreateRequirementDto } from 'src/app/requirements/dto/create-requirement.dto';

export class CreateProgramDto {
  @IsNotEmpty({ message: 'Le nom du programme est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description du programme est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'La date de début du programme est obligatoire' })
  start_at: Date;

  @IsNotEmpty({ message: 'La date de fin du programme est obligatoire' })
  end_at: Date;

  @IsArray({ message: 'Le type est obligatoire' })
  types: number[];

  @IsNotEmpty({ message: 'Les conditions du programme sont obligatoires' })
  requirements: CreateRequirementDto[];
}
