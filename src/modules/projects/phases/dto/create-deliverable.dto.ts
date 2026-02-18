import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { DeliverableType } from '../types/deliverable-type.enum';

export class CreateDeliverableDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(DeliverableType)
  type: DeliverableType;

  @IsOptional()
  @IsBoolean()
  is_required?: boolean;
}
