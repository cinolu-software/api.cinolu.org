import { IsNotEmpty } from 'class-validator';

export class CreateExpertiseDto {
  @IsNotEmpty()
  name: string;
}
