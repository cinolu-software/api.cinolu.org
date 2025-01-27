import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { BlogCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly categoryRepository: Repository<BlogCategory>
  ) {}

  async create(dto: CreateCategoryDto): Promise<{ data: BlogCategory }> {
    try {
      const data = await this.categoryRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ data: BlogCategory[] }> {
    const data = await this.categoryRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: BlogCategory }> {
    try {
      const data = await this.categoryRepository.findOneOrFail({ where: { id } });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<{ data: BlogCategory }> {
    try {
      const { data: category } = await this.findOne(id);
      const data = await this.categoryRepository.save({ ...category, ...dto });
      return { data };
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
