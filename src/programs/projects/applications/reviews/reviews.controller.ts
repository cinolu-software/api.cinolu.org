import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Authorization } from '../../../../shared/decorators/rights.decorators';
import { CurrentUser } from '../../../../shared/decorators/user.decorator';
import { RoleEnum } from '../../../../shared/enums/roles.enum';
import { User } from '../../../../users/entities/user.entity';
import { ReviewsService } from './reviews.service';

@Controller('application-reviews')
@Authorization(RoleEnum.Coach)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateReviewDto): Promise<{ data: Review }> {
    return this.reviewsService.create(user, dto);
  }

  @Get()
  findAll(): Promise<{ data: Review[] }> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Review }> {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto): Promise<{ data: Review }> {
    return this.reviewsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewsService.remove(id);
  }
}
