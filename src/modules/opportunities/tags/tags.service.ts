import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpportunityTag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { FilterTagsDto } from './dto/filter-tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(OpportunityTag)
    private tagRepository: Repository<OpportunityTag>
  ) {}

  async create(dto: CreateTagDto): Promise<OpportunityTag> {
    try {
      return await this.tagRepository.save(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<OpportunityTag[]> {
    return await this.tagRepository.find();
  }

  async findFiltered(dto: FilterTagsDto): Promise<[OpportunityTag[], number]> {
    const { q, page } = dto;
    const query = this.tagRepository.createQueryBuilder('t');
    if (q) query.andWhere('t.name LIKE :q', { q: `%${q}%` });
    if (page) query.skip((+page - 1) * 10).take(10);
    return await query.getManyAndCount();
  }

  async findOne(id: string): Promise<OpportunityTag> {
    try {
      return await this.tagRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateTagDto): Promise<OpportunityTag> {
    try {
      await this.tagRepository.update(id, dto);
      return await this.tagRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.tagRepository.delete(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
