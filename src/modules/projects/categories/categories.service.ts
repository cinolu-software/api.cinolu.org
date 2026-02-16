import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryParams } from './utils/query-params.type';

@Injectable()
export class ProjectCategoriesService {
  constructor(
    @InjectRepository(ProjectCategory)
    private readonly categoryRepository: Repository<ProjectCategory>
  ) {}

  async create(dto: CreateCategoryDto): Promise<ProjectCategory> {
    try {
      return await this.categoryRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<ProjectCategory[]> {
    return await this.categoryRepository.find();
  }

  async findAllPaginated(params: QueryParams): Promise<[ProjectCategory[], number]> {
    const { page = 1, q } = params;
    const queryBuilder = this.categoryRepository.createQueryBuilder('c').orderBy('c.updated_at', 'DESC');
    if (q) queryBuilder.where('c.name LIKE :q', { q: `%${q}%` });
    return await queryBuilder
      .skip((+page - 1) * 10)
      .take(10)
      .getManyAndCount();
  }

  async findOne(id: string): Promise<ProjectCategory> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<ProjectCategory> {
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
