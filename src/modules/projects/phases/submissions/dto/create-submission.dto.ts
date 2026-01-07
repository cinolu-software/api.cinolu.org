import { IsArray } from 'class-validator';

export class CreateSubmissionDto {
  formId: string;

  @IsArray()
  responses: Record<string, unknown>[];
}
