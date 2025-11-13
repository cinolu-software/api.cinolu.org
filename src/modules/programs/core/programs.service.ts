import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Program } from './entities/program.entity';
import { Indicator } from './entities/indicator.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FilterProgramsDto } from './dto/filter-programs.dto';
import { IndicatorDto } from './dto/indicator.dto';

type ProgramWithIndicators = Program & { indicators_grouped?: Record<string, Indicator[]> };

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>
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

  async addIndicators(programId: string, dto: IndicatorDto): Promise<Indicator[]> {
    try {
      const [indicatorsToSave, indicatorsToDelete] = await this.diffIndicators(dto, programId);
      await this.deleteIndicators(indicatorsToDelete);
      return await this.indicatorRepository.save(indicatorsToSave);
    } catch {
      throw new BadRequestException();
    }
  }

  private async diffIndicators(dto: IndicatorDto, programId: string): Promise<[Indicator[], Indicator[]]> {
    const existingIndicators = await this.findIndicatorsByYearAndCategory(programId, dto.year, dto.category);
    const existingIndicatorsMap = new Map(existingIndicators.map((i) => [i.name, i]));
    const newIndicatorNames = new Set(dto.metrics.flatMap((metric) => Object.keys(metric)));
    const indicatorsToDelete = existingIndicators.filter((i) => !newIndicatorNames.has(i.name));
    const indicatorsToAdd = this.createNewIndicatorsFromMetrics(dto, existingIndicatorsMap, programId);
    const indicatorsToUpdate = this.updateExistingIndicatorsFromMetrics(dto, existingIndicatorsMap);
    return [[...indicatorsToUpdate, ...indicatorsToAdd], indicatorsToDelete];
  }

  private createNewIndicatorsFromMetrics(
    dto: IndicatorDto,
    existings: Map<string, Indicator>,
    programId: string
  ): Indicator[] {
    return dto.metrics.flatMap((metric) =>
      Object.entries(metric)
        .filter(([name]) => !existings.has(name))
        .map(([name, target]) =>
          this.indicatorRepository.create({
            name,
            target,
            year: dto.year,
            category: dto.category,
            program: { id: programId }
          })
        )
    );
  }

  private updateExistingIndicatorsFromMetrics(dto: IndicatorDto, existings: Map<string, Indicator>): Indicator[] {
    return dto.metrics.flatMap((metric) =>
      Object.entries(metric)
        .filter(([name]) => existings.has(name))
        .map(([name, target]) => {
          const existing = existings.get(name);
          if (!existing) throw new BadRequestException();
          existing.target = target;
          existing.category = dto.category;
          return existing;
        })
    );
  }

  private async deleteIndicators(toDelete: Indicator[]): Promise<void> {
    if (!toDelete.length) return;
    await this.indicatorRepository.softRemove(toDelete);
  }

  private async findIndicatorsByYearAndCategory(
    programId: string,
    year: number,
    category: string
  ): Promise<Indicator[]> {
    return await this.indicatorRepository.find({
      where: { program: { id: programId }, year, category },
      order: { created_at: 'ASC' }
    });
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

  async findBySlug(slug: string): Promise<ProgramWithIndicators> {
    try {
      const program = await this.programRepository.findOneOrFail({
        where: { slug },
        relations: ['category', 'subprograms']
      });
      const indicators = await this.findProgramIndicators(program.id);
      const indicators_grouped = this.groupIndicatorsByYear(indicators);
      return { ...program, indicators_grouped };
    } catch {
      throw new NotFoundException();
    }
  }

  private async findProgramIndicators(programId: string): Promise<Indicator[]> {
    return await this.indicatorRepository.find({
      where: { program: { id: programId } },
      order: { year: 'ASC', created_at: 'ASC' }
    });
  }

  private groupIndicatorsByYear(indicators: Indicator[]): Record<string, Indicator[]> {
    return indicators.reduce((grouped: Record<string, Indicator[]>, indicator: Indicator) => {
      const year = String(indicator.year);
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(indicator);
      return grouped;
    }, {});
  }

  async findIndicatorsByYear(programId: string, year: number): Promise<Indicator[]> {
    try {
      return await this.indicatorRepository.find({
        where: { program: { id: programId }, year },
        order: { created_at: 'ASC' }
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

  async findAllPaginated(queryParams: FilterProgramsDto): Promise<[Program[], number]> {
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
      await this.removeOldLogo(program.logo);
      program.logo = file.filename;
      return await this.programRepository.save(program);
    } catch {
      throw new BadRequestException();
    }
  }

  private async removeOldLogo(logoFilename?: string): Promise<void> {
    try {
      await fs.unlink(`./uploads/programs/${logoFilename}`);
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
