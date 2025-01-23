import { IsNotEmpty } from 'class-validator';
import { ReviewStatus } from '../../../utils/review-status.enum';

export class CreateReviewDto {
  @IsNotEmpty()
  status: ReviewStatus;

  @IsNotEmpty()
  note: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  application: string;
}
