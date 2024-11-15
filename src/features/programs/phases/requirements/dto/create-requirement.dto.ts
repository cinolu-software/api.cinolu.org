import { IsNotEmpty } from 'class-validator';
import { FieldType } from '../enum/form-type.enum';

interface IRequirementDto {
  name: string;
  description: string;
}

export class CreateRequirementDto {
  @IsNotEmpty()
  field_type: FieldType;

  @IsNotEmpty()
  is_formField: boolean;

  @IsNotEmpty()
  phase: string;

  @IsNotEmpty()
  requirements: IRequirementDto[];
}
