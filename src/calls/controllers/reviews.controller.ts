import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { CallApplicationReview } from '../entities/review.entity';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('application-reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateReviewDto): Promise<{ data: CallApplicationReview }> {
    return this.reviewsService.create(user, dto);
  }

  @Get()
  findAll(): Promise<{ data: CallApplicationReview[] }> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: CallApplicationReview }> {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto): Promise<{ data: CallApplicationReview }> {
    return this.reviewsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewsService.remove(id);
  }
}
