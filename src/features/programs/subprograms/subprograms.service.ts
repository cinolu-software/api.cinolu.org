import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubprogramDto } from './dto/create-subprogram.dto';
import { UpdateSubprogramDto } from './dto/update-subprogram.dto';
import { Repository } from 'typeorm';
import { Subprogram } from './entities/subprogram.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterSubprogramDto } from './dto/filter-subprogram.dto';
import * as fs from 'fs-extra';

@Injectable()
export class SubprogramsService {
  constructor(
    @InjectRepository(Subprogram)
    private subprogramRepository: Repository<Subprogram>
  ) {}

  async create(dto: CreateSubprogramDto): Promise<Subprogram> {
    try {
      return await this.subprogramRepository.save({
        ...dto,
        program: { id: dto.programId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Subprogram[]> {
    return await this.subprogramRepository.find({
      where: { is_published: true },
      order: { updated_at: 'DESC' }
    });
  }

  async findBySlug(slug: string): Promise<Subprogram> {
    try {
      return await this.subprogramRepository.findOneOrFail({
        where: { slug },
        relations: ['projects', 'events']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async togglePublish(id: string): Promise<Subprogram> {
    try {
      const subprogram = await this.findOne(id);
      return await this.subprogramRepository.save({
        ...subprogram,
        is_published: !subprogram.is_published
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAllPaginated(queryParams: FilterSubprogramDto): Promise<[Subprogram[], number]> {
    const { page = 1, q } = queryParams;
    const query = this.subprogramRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.program', 'program')
      .orderBy('p.updated_at', 'DESC');
    if (q) query.where('p.name LIKE :q OR p.description LIKE :q', { q: `%${q}%` });
    return await query
      .skip((+page - 1) * 40)
      .take(40)
      .getManyAndCount();
  }

  async findOne(id: string): Promise<Subprogram> {
    try {
      return await this.subprogramRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async addLogo(id: string, file: Express.Multer.File): Promise<Subprogram> {
    try {
      const subprogram = await this.findOne(id);
      if (subprogram.logo) await fs.unlink(`./uploads/subprograms/${subprogram.logo}`);
      return await this.subprogramRepository.save({ ...subprogram, logo: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateSubprogramDto): Promise<Subprogram> {
    try {
      const subprogram = await this.findOne(id);
      return await this.subprogramRepository.save({
        ...subprogram,
        ...dto,
        program: dto.programId ? { id: dto.programId } : subprogram.program
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.subprogramRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
