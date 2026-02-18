import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { ReviewScope } from '../types/review-scope.enum';

export class MoveParticipantsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @IsUUID()
  phaseId: string;

  @IsOptional()
  @IsUUID()
  fromPhaseId?: string;

  @IsOptional()
  @IsEnum(ReviewScope)
  review_scope?: ReviewScope;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_success_rate?: number;
}
