import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FilterProgramsDto } from './dto/filter-programs.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>
  ) {}

  async create(dto: CreateProgramDto): Promise<Program> {
    try {
      const program = this.programRepository.create({
        ...dto,
        category: { id: dto.category }
      });
      return await this.programRepository.save(program);
    } catch {
      throw new BadRequestException();
    }
  }

  async findPublished(): Promise<Program[]> {
    return await this.programRepository.find({
      where: { is_published: true },
      order: { updated_at: 'DESC' },
      relations: ['category', 'subprograms']
    });
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find({
      where: { is_published: true },
      order: { updated_at: 'DESC' },
      relations: ['category']
    });
  }

  async findBySlug(slug: string): Promise<Program> {
    try {
      return await this.programRepository.findOneOrFail({
        where: { slug },
        relations: ['category', 'subprograms']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async highlight(id: string): Promise<Program> {
    const program = await this.findOne(id);
    program.is_highlighted = !program.is_highlighted;
    return await this.programRepository.save(program);
  }

  async togglePublish(id: string): Promise<Program> {
    const program = await this.findOne(id);
    program.is_published = !program.is_published;
    return await this.programRepository.save(program);
  }

  async findFiltered(queryParams: FilterProgramsDto): Promise<[Program[], number]> {
    const { page = 1, q, filter = 'all' } = queryParams;
    const query = this.programRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .orderBy('p.updated_at', 'DESC');
    if (filter === 'published') query.andWhere('p.is_published = :isPublished', { isPublished: true });
    if (filter === 'drafts') query.andWhere('p.is_published = :isPublished', { isPublished: false });
    if (filter === 'highlighted') query.andWhere('p.is_highlighted = :isHighlighted', { isHighlighted: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    const skip = (+page - 1) * 10;
    return await query.skip(skip).take(10).getManyAndCount();
  }

  async findOne(id: string): Promise<Program> {
    try {
      return await this.programRepository.findOneOrFail({
        where: { id },
        relations: ['category', 'indicators']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Program> {
    try {
      const program = await this.findOne(id);
      if (program.logo) fs.unlink(`./uploads/programs/${program.logo}`);
      program.logo = file.filename;
      return await this.programRepository.save(program);
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateProgramDto): Promise<Program> {
    try {
      const program = await this.findOne(id);
      return await this.programRepository.save({
        ...program,
        ...dto,
        category: dto.category ? { id: dto.category } : program.category
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const program = await this.findOne(id);
      await this.programRepository.softDelete(program.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
