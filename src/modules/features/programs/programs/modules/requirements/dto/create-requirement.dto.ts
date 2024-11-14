import { IsNotEmpty } from 'class-validator';

export class CreateRequirementDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  program: string;
}
