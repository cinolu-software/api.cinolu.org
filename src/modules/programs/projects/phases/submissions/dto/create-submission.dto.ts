import { IsArray, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  formId: string;

  @IsArray()
  responses: { label: string; value: string }[];

  @IsOptional()
  submitted_by_name?: string;

  @IsOptional()
  submitted_by_email?: string;

  @IsOptional()
  submitted_by_phone?: string;
}
