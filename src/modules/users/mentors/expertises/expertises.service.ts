import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
import { UpdateExpertiseDto } from './dto/update-expertise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expertise } from './entities/expertise.entity';
import { FilterExpertisesDto } from './dto/filter-expertises.dto';

@Injectable()
export class ExpertisesService {
  constructor(
    @InjectRepository(Expertise)
    private expertiseRepository: Repository<Expertise>
  ) {}

  async create(dto: CreateExpertiseDto): Promise<Expertise> {
    try {
      return await this.expertiseRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findFiltered(dto: FilterExpertisesDto): Promise<[Expertise[], number]> {
    const { q, page } = dto;
    const query = this.expertiseRepository.createQueryBuilder('e');
    if (q) query.andWhere('e.name LIKE :search', { search: `%${q}%` });
    if (page) query.skip((+page - 1) * 10).take(10);
    return await query.getManyAndCount();
  }

  async findAll(): Promise<Expertise[]> {
    return await this.expertiseRepository.find();
  }

  async findOne(id: string): Promise<Expertise> {
    try {
      return await this.expertiseRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateExpertiseDto): Promise<Expertise> {
    try {
      const expertise = await this.findOne(id);
      return await this.expertiseRepository.save({ ...expertise, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.expertiseRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
