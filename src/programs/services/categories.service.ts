import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(dto: CreateCategoryDto): Promise<{ data: Category }> {
    try {
      const data = await this.categoryRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<{ data: Category[] }> {
    const data = await this.categoryRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Category }> {
    try {
      const data = await this.categoryRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<{ data: Category }> {
    try {
      const { data: type } = await this.findOne(id);
      const data = await this.categoryRepository.save({ ...type, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la modification du type');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.categoryRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le type');
    }
  }
}
