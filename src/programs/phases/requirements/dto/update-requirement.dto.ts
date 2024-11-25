import { IsNotEmpty } from 'class-validator';

export class UpdateRequirementDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  phase: string;
}
