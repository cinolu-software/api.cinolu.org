import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProgramsDto } from './dto/filter-programs.dto';
import * as fs from 'fs-extra';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>
  ) {}

  async create(dto: CreateProgramDto): Promise<Program> {
    try {
      return await this.programRepository.save({
        ...dto,
        categories: dto.categories.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findPublished(): Promise<Program[]> {
    return await this.programRepository.find({
      where: { is_published: true },
      order: { updated_at: 'DESC' },
      relations: ['categories', 'subprograms'],
    });
  }

  async findAll(): Promise<Program[]> {
    return await this.programRepository.find({
      where: { is_published: true },
      order: { updated_at: 'DESC' },
    });
  }

  async findBySlug(slug: string): Promise<Program> {
    try {
      return await this.programRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'subprograms']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async highlight(id: string): Promise<Program> {
    try {
      const program = await this.findOne(id);
      return await this.programRepository.save({
        ...program,
        is_highlighted: !program.is_highlighted
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async togglePublish(id: string): Promise<Program> {
    try {
      const program = await this.findOne(id);
      return await this.programRepository.save({
        ...program,
        is_published: !program.is_published
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAllPaginated(queryParams: FilterProgramsDto): Promise<[Program[], number]> {
    const { page = 1, q } = queryParams;
    const query = this.programRepository.createQueryBuilder('p').orderBy('p.updated_at', 'DESC');
    if (q) query.where('p.name LIKE :q OR p.description LIKE :q', { q: `%${q}%` });
    return await query
      .skip((+page - 1) * 40)
      .take(40)
      .getManyAndCount();
  }

  async findOne(id: string): Promise<Program> {
    try {
      return await this.programRepository.findOneOrFail({
        where: { id },
        relations: ['categories']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Program> {
    try {
      const program = await this.findOne(id);
      if (program.logo) await fs.unlink(`./uploads/programs/${program.logo}`);
      return await this.programRepository.save({ ...program, logo: file.filename });
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
        categories: dto?.categories ? dto.categories.map((id) => ({ id })) : program.categories
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.programRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
