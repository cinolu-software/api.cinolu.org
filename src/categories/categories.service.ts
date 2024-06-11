import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<{ data: Category }> {
    try {
      const data: Category = await this.categoryRepository.save(createCategoryDto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création de la catégorie');
    }
  }

  async findAll(): Promise<{ data: Category[] }> {
    const data: Category[] = await this.categoryRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Category }> {
    try {
      const data: Category = await this.categoryRepository.findOneOrFail({ where: { id } });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération de la catégorie');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{ data: Category }> {
    await this.findOne(id);
    try {
      const data = await this.categoryRepository.save({ id, ...updateCategoryDto });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification de la catégorie');
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    try {
      await this.categoryRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la catégorie');
    }
  }
}
