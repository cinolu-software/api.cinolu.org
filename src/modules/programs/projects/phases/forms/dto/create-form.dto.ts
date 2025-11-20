import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { FormFieldType } from '../types/form-field.type';

export class FormFieldOptionDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class PhaseFormFieldDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsIn(Object.values(FormFieldType))
  type: FormFieldType;

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsString()
  helperText?: string;

  @IsOptional()
  validation?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormFieldOptionDto)
  options?: FormFieldOptionDto[];
}

export class PhaseFormSettingsDto {
  @IsOptional()
  @IsBoolean()
  allowMultipleSubmissions?: boolean;

  @IsOptional()
  @IsString()
  confirmationMessage?: string;

  @IsOptional()
  @IsString()
  submissionNote?: string;
}

export class CreatePhaseFormDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  welcome_message?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsNotEmpty()
  @IsString()
  phase: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PhaseFormFieldDto)
  fields: PhaseFormFieldDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PhaseFormSettingsDto)
  settings?: PhaseFormSettingsDto;
}
