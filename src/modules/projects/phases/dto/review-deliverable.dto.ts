import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DeliverableReviewStatus } from '../types/deliverable-review-status.enum';

export class ReviewDeliverableDto {
  @IsEnum(DeliverableReviewStatus)
  status: DeliverableReviewStatus;

  @IsOptional()
  @IsString()
  feedback?: string;
}
