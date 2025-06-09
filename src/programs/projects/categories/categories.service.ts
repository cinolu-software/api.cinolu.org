import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ProjectCategory)
    private categoryRepository: Repository<ProjectCategory>
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
