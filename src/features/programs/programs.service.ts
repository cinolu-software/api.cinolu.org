import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProgramsDto } from './dto/filter-programs.dto';
import * as fs from 'fs-extra';
import { Indicator } from './entities/indicator.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
    @InjectRepository(Indicator)
    private indicatorRepository: Repository<Indicator>
  ) {}

  async create(dto: CreateProgramDto): Promise<Program> {
    try {
      return await this.programRepository.save({
        ...dto,
        category: { id: dto.category }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addIndicators(programId: string, dtos: string[]): Promise<Indicator[]> {
    try {
      const existing = await this.indicatorRepository.find({
        where: { program: { id: programId } }
      });
      const [updatedData, toDelete] = this.diffIndicators(existing, dtos, programId);
      await this.deleteIndicators(toDelete);
      return await this.indicatorRepository.save(updatedData);
    } catch {
      throw new BadRequestException();
    }
  }

  private diffIndicators(existing: Indicator[], dtos: string[], programId: string): Indicator[][] {
    const existingNames = new Set(existing.map((i) => i.name));
    const dtoNames = new Set(dtos);
    const toDelete = existing.filter((i) => !dtoNames.has(i.name));
    const toAdd = dtos
      .filter((name) => !existingNames.has(name))
      .map((name) =>
        this.indicatorRepository.create({
          name,
          program: { id: programId }
        })
      );
    const toUpdate = existing.filter((i) => dtoNames.has(i.name));
    const updatedData = [...toUpdate, ...toAdd];
    return [updatedData, toDelete];
  }

  private async deleteIndicators(toDelete: Indicator[]): Promise<void> {
    if (!toDelete.length) return;
    await this.indicatorRepository.softRemove(toDelete);
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
    const query = this.programRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.indicators', 'indicators')
      .orderBy('p.updated_at', 'DESC')
      .addOrderBy('indicators.created_at', 'ASC');
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
        relations: ['category', 'indicators']
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
        category: { id: dto.category }
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
