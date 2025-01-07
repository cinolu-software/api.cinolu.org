import { IsNotEmpty } from 'class-validator';

interface IRequirementDto {
  name: string;
  description: string;
}

export class CreateRequirementDto {
  @IsNotEmpty()
  phase: string;

  @IsNotEmpty()
  requirements: IRequirementDto[];
}
