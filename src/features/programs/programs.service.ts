import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProgramsDto } from './dto/filter-programs.dto';
import * as fs from 'fs-extra';
import { Indicator } from './entities/indicator.entity';
import { MetricsService } from './subprograms/metrics/metrics.service';
import { IndicatorDto } from './dto/indicator.dto';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
    @InjectRepository(Indicator)
    private indicatorRepository: Repository<Indicator>,
    private metricsService: MetricsService
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

  async addIndicators(id: string, dtos: IndicatorDto[]): Promise<Indicator[]> {
    try {
      const data = dtos.map((dto) =>
        this.indicatorRepository.create({
          ...dto,
          program: { id }
        })
      );
      const indicators = await this.indicatorRepository.save(data);
      const indicatorsIds = indicators.map((i) => i.id);
      await this.generateMetrics(id, indicatorsIds);
      return indicators;
    } catch {
      throw new BadRequestException();
    }
  }

  async findIndicators(id: string): Promise<Indicator[]> {
    try {
      return await this.indicatorRepository.find({
        where: { program: { id } },
        order: { created_at: 'ASC' }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async updateIndicators(id: string, dtos: { id: string; name: string }[]): Promise<Indicator[]> {
    try {
      dtos.forEach(async (dto) => {
        await this.indicatorRepository.findOneBy({ id: dto.id });
        await this.indicatorRepository.update(dto.id, dto);
      });
      return await this.findIndicators(id);
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
      .orderBy('p.updated_at', 'DESC');
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

  async removeIndicator(id: string): Promise<void> {
    try {
      await this.indicatorRepository.softDelete(id);
      await this.metricsService.removeMetric(id);
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

  private async generateMetrics(id: string, indicators: string[]): Promise<void> {
    try {
      const program = await this.programRepository.findOneOrFail({
        where: { id },
        relations: ['subprograms.projects', 'subprograms.events']
      });
      for (const sub of program.subprograms) {
        sub.projects.map(async (p) => await this.metricsService.generateMetrics('project', p.id, indicators));
        sub.events.map(async (e) => await this.metricsService.generateMetrics('event', e.id, indicators));
      }
    } catch {
      throw new BadRequestException();
    }
  }
}
