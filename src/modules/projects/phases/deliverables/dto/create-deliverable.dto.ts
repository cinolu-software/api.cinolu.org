import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DeliverableType } from '../types/deliverables.types';

export class CreateDeliverableDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(DeliverableType)
  type: DeliverableType;

  @IsOptional()
  @IsString()
  content?: string;
}
