import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryParams } from './utils/query-params.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(EventCategory)
    private categoryRepository: Repository<EventCategory>
  ) {}

  async create(dto: CreateCategoryDto): Promise<EventCategory> {
    try {
      return await this.categoryRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<EventCategory[]> {
    return await this.categoryRepository.find();
  }

  async findAllPaginated(queryParams: QueryParams): Promise<[EventCategory[], number]> {
    const { page = 1, q } = queryParams;
    const query = this.categoryRepository.createQueryBuilder('c').orderBy('c.updated_at', 'DESC');
    if (q) query.where('c.name LIKE :q', { q: `%${q}%` });
    return await query
      .skip((+page - 1) * 40)
      .take(40)
      .getManyAndCount();
  }

  async findOne(id: string): Promise<EventCategory> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<EventCategory> {
    try {
      const category = await this.findOne(id);
      return await this.categoryRepository.save({ ...category, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.categoryRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
