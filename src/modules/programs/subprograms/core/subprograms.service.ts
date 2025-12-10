import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Subprogram } from './entities/subprogram.entity';
import { CreateSubprogramDto } from './dto/create-subprogram.dto';
import { UpdateSubprogramDto } from './dto/update-subprogram.dto';
import { FilterSubprogramDto } from './dto/filter-subprogram.dto';

@Injectable()
export class SubprogramsService {
  constructor(
    @InjectRepository(Subprogram)
    private readonly subprogramRepository: Repository<Subprogram>
  ) {}

  async create(dto: CreateSubprogramDto): Promise<Subprogram> {
    delete dto['id'];
    try {
      const subprogram = this.subprogramRepository.create({
        ...dto,
        program: { id: dto.programId }
      });
      return await this.subprogramRepository.save(subprogram);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(programId: string): Promise<Subprogram[]> {
    return await this.subprogramRepository.find({
      where: { program: { id: programId } },
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

  async highlight(id: string): Promise<Subprogram> {
    const subprogram = await this.findOne(id);
    subprogram.is_highlighted = !subprogram.is_highlighted;
    return await this.subprogramRepository.save(subprogram);
  }

  async togglePublish(id: string): Promise<Subprogram> {
    const subprogram = await this.findOne(id);
    subprogram.is_published = !subprogram.is_published;
    return await this.subprogramRepository.save(subprogram);
  }

  async findAllPaginated(programId: string, queryParams: FilterSubprogramDto): Promise<[Subprogram[], number]> {
    const { page = 1, q } = queryParams;
    const query = this.subprogramRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.program', 'program')
      .orderBy('p.updated_at', 'DESC')
      .where('p.program.id = :programId', { programId });
    if (q) query.where('p.name LIKE :q OR p.description LIKE :q', { q: `%${q}%` });
    const skip = (+page - 1) * 10;
    return await query.skip(skip).take(10).getManyAndCount();
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
      await this.removeOldLogo(subprogram.logo);
      subprogram.logo = file.filename;
      return await this.subprogramRepository.save(subprogram);
    } catch {
      throw new BadRequestException();
    }
  }

  private async removeOldLogo(logoFilename?: string): Promise<void> {
    try {
      await fs.unlink(`./uploads/subprograms/${logoFilename}`);
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
      const subprogram = await this.findOne(id);
      await this.subprogramRepository.softDelete(subprogram.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
