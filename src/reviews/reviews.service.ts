import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>
  ) {}

  async create(user: User, dto: CreateReviewDto): Promise<{ data: Review }> {
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

  async findAll(): Promise<{ data: Review[] }> {
    const data = await this.reviewRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Review }> {
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

  async update(id: string, dto: UpdateReviewDto): Promise<{ data: Review }> {
    try {
      const { data: review } = await this.findOne(id);
      const data = await this.reviewRepository.save({
        ...dto,
        application: review.application,
        reviewer: review.reviewer
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
