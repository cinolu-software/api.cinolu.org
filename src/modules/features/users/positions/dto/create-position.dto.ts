import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty({ message: "Le champ nom de l'expertise est recquis" })
  name: string;

  @IsNotEmpty({ message: "Le champ description l'expertise est recquis" })
  description: string;
}
