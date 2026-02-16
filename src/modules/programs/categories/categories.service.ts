import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProgramCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryParams } from './utils/query-params.type';

@Injectable()
export class ProgramCategoriesService {
  constructor(
    @InjectRepository(ProgramCategory)
    private readonly categoryRepository: Repository<ProgramCategory>
  ) {}

  async create(dto: CreateCategoryDto): Promise<ProgramCategory> {
    try {
      return await this.categoryRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<ProgramCategory[]> {
    return await this.categoryRepository.find();
  }

  async findPaginated(queryParams: QueryParams): Promise<[ProgramCategory[], number]> {
    const { page = 1, q } = queryParams;
    const query = this.categoryRepository.createQueryBuilder('c').orderBy('c.updated_at', 'DESC');
    if (q) query.where('c.name LIKE :q', { q: `%${q}%` });
    return await query
      .skip((+page - 1) * 10)
      .take(10)
      .getManyAndCount();
  }

  async findOne(id: string): Promise<ProgramCategory> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<ProgramCategory> {
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
