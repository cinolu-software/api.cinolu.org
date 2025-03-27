import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
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
