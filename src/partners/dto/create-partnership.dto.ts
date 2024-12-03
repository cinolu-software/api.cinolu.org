import { IsNotEmpty } from 'class-validator';

export class CreatePartnershipDto {
  @IsNotEmpty({ message: 'Le nom est recquis' })
  name: string;
}
