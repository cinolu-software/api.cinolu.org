import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Project } from './entities/project.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Metric } from '@/modules/programs/subprograms/metrics/entities/metric.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { MetricDto } from '@/modules/programs/subprograms/metrics/dto/metric.dto';
import { GalleriesService } from '@/modules/galleries/galleries.service';
import { MetricsService } from '@/modules/programs/subprograms/metrics/metrics.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly galleryService: GalleriesService,
    private readonly metricsService: MetricsService
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    try {
      const project = this.projectRepository.create({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((id) => ({ id }))
      });
      return await this.projectRepository.save(project);
    } catch {
      throw new BadRequestException();
    }
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(id);
      const galleryDto = {
        image: file.filename,
        project: { id }
      };
      await this.galleryService.create(galleryDto);
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
    const project = await this.findBySlug(slug);
    return project.gallery;
  }

  async findAll(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q } = queryParams;
    const skip = (+page - 1) * 40;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .orderBy('p.updated_at', 'DESC');
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(40).getManyAndCount();
  }

  async findPublished(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q } = queryParams;
    const skip = (+page - 1) * 40;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .andWhere('p.is_published = :is_published', { is_published: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(40).orderBy('p.started_at', 'DESC').getManyAndCount();
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
      await fs.unlink(`./uploads/projects/${project.cover}`);
      return await this.projectRepository.save({
        ...project,
        cover: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addMetrics(projectId: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      return await this.metricsService.addMetrics('project', projectId, dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'program.program', 'gallery', 'metrics.indicator']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'gallery', 'metrics']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async highlight(id: string): Promise<Project> {
    const project = await this.findOne(id);
    project.is_highlighted = !project.is_highlighted;
    return await this.projectRepository.save(project);
  }

  async togglePublish(id: string): Promise<Project> {
    const project = await this.findOne(id);
    project.is_published = !project.is_published;
    return await this.projectRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({
        ...project,
        ...dto,
        program: { id: dto.program },
        categories: dto?.categories.map((type) => ({ id: type })) || project.categories
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const project = await this.findOne(id);
      await this.projectRepository.softDelete(project.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
