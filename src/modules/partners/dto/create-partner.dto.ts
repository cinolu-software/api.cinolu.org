import { IsNotEmpty } from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty({ message: 'Le nom du partenaire est recquis' })
  name: string;

  @IsNotEmpty({ message: 'La description du partenaire est recquis' })
  description: string;

  @IsNotEmpty({ message: 'Le type de parteneriat est recquis' })
  partnerships: string[];
}
