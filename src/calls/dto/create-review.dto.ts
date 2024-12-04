import { IsNotEmpty, IsOptional } from 'class-validator';
import { ReviewStatus } from '../../programs/utils/review-status.enum';

export class CreateReviewDto {
  @IsNotEmpty()
  status: ReviewStatus;

  @IsNotEmpty()
  application: string;

  @IsOptional()
  comment: string;
}
