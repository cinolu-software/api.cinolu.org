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

  async create(dto: CreateCategoryDto): Promise<BlogCategory> {
    try {
      return await this.categoryRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<BlogCategory[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<BlogCategory> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<BlogCategory> {
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
