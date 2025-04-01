import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReviewStatus } from '../../../utils/review-status.enum';

export class CreateReviewDto {
  @IsEnum(ReviewStatus)
  status: ReviewStatus;

  @IsNotEmpty()
  data: JSON;

  @IsNotEmpty()
  application: string;
}
