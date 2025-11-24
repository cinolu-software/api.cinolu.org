import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { SubmissionResponse } from '../entities/submission.entity';

export class SubmissionResponseDto implements SubmissionResponse {
  @IsString()
  @IsNotEmpty()
  fieldId: string;

  @IsOptional()
  @IsArray()
  values?: Array<string | number | boolean>;

  @IsOptional()
  metadata?: Record<string, unknown>;

  @IsOptional()
  value?: string | number | boolean | string[] | number[] | null;
}

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  form: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SubmissionResponseDto)
  responses: SubmissionResponseDto[];

  @IsOptional()
  @IsString()
  submitted_by_name?: string;

  @IsOptional()
  @IsEmail()
  submitted_by_email?: string;

  @IsOptional()
  @IsString()
  submitted_by_phone?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
