import { IsNotEmpty } from 'class-validator';

export class CreateRequirementDto {
  @IsNotEmpty({ message: "Le nom de l'exigence est obligatoire" })
  name: string;

  @IsNotEmpty({ message: "La description de l'exigence est obligatoire" })
  description: string;
}
