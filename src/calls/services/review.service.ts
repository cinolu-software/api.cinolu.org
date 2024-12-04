import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { CallApplicationReview } from '../entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(CallApplicationReview)
    private reviewRepository: Repository<CallApplicationReview>
  ) {}

  async create(user: User, dto: CreateReviewDto): Promise<{ data: CallApplicationReview }> {
    try {
      const data = await this.reviewRepository.save({
        ...dto,
        application: { id: dto.application },
        reviewer: user
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue lors du review');
    }
  }

  async findAll(): Promise<{ data: CallApplicationReview[] }> {
    const data = await this.reviewRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: CallApplicationReview }> {
    try {
      const data = await this.reviewRepository.findOneOrFail({
        where: { id },
        relations: ['application', 'reviewer']
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue lors de la lecture du review');
    }
  }

  async update(id: string, dto: UpdateReviewDto): Promise<{ data: CallApplicationReview }> {
    try {
      const { data: review } = await this.findOne(id);
      const data = await this.reviewRepository.save({
        ...dto,
        application: review.application
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue lors de la modification du review');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.reviewRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue lors du review');
    }
  }
}
