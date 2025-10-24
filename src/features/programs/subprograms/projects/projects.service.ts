import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { GalleriesService } from 'src/features/galleries/galleries.service';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';
import { MetricsService } from '../metrics/metrics.service';
import { MetricDto } from '../metrics/dto/metric.dto';
import { Metric } from '../metrics/entities/metric.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private galleryService: GalleriesService,
    private metricsService: MetricsService
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectRepository.save({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(id);
      const dto = {
        image: file.filename,
        project: { id }
      };
      await this.galleryService.create(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeGallery(id: string): Promise<void> {
    try {
      await this.galleryService.remove(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findGallery(slug: string): Promise<Gallery[]> {
    try {
      return (await this.findBySlug(slug)).gallery;
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q } = queryParams;
    const take = 40;
    const skip = (+page - 1) * take;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .orderBy('p.updated_at', 'DESC');
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(take).getManyAndCount();
  }

  async findPublished(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q } = queryParams;
    const take = 9;
    const skip = (+page - 1) * take;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .andWhere('p.is_published = :is_published', { is_published: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(take).orderBy('p.started_at', 'DESC').getManyAndCount();
  }

  async findRecent(): Promise<Project[]> {
    try {
      return await this.projectRepository.find({
        order: { ended_at: 'DESC' },
        where: { is_published: true },
        take: 5
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Project> {
    try {
      const project = await this.findOne(id);
      if (project.cover) await fs.unlink(`./uploads/projects/${project.cover}`);
      return await this.projectRepository.save({ ...project, cover: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async removeCover(id: string): Promise<Project> {
    try {
      const project = await this.findOne(id);
      if (!project.cover) return project;
      await fs.unlink(`./uploads/projects/${project.cover}`);
      return await this.projectRepository.save({ ...project, cover: null });
    } catch {
      throw new BadRequestException();
    }
  }

  async addTargetMetrics(projectId: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      const metricsDto = dto.map((metric) => ({
        ...metric,
        project: { id: projectId }
      }));
      return await this.metricsService.addTarget(metricsDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async addAchievedMetrics(projectId: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      const metricsDto = dto.map((metric) => ({
        ...metric,
        project: { id: projectId }
      }));
      return await this.metricsService.addAchieved(metricsDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'program.program.indicators', 'gallery', 'metrics.indicator'],
        order: { program: { program: { indicators: { created_at: 'ASC' } } } }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'gallery', 'metrics']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async highlight(id: string): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({
        ...project,
        is_highlighted: !project.is_highlighted
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async togglePublish(id: string): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({ ...project, is_published: !project.is_published });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({
        id,
        ...dto,
        program: { id: dto.program || project.program.id },
        categories: dto.categories.map((category) => ({ id: category })) ?? project.categories
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.projectRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
