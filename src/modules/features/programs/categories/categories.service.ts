import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProgramCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(ProgramCategory)
    private categoryRepository: Repository<ProgramCategory>
  ) {}

  async create(dto: CreateCategoryDto): Promise<{ data: ProgramCategory }> {
    try {
      const data = await this.categoryRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<{ data: ProgramCategory[] }> {
    const data = await this.categoryRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: ProgramCategory }> {
    try {
      const data = await this.categoryRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<{ data: ProgramCategory }> {
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
      await this.categoryRepository.delete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le type');
    }
  }
}
