import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>
  ) {}

  async create(dto: CreateCategoryDto): Promise<ProductCategory> {
    try {
      return await this.productCategoryRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<ProductCategory[]> {
    return await this.productCategoryRepository.find();
  }

  async findOne(id: string): Promise<ProductCategory> {
    try {
      return await this.productCategoryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<ProductCategory> {
    try {
      await this.productCategoryRepository.update(id, dto);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.productCategoryRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
