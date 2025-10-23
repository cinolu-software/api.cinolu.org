import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { FilterEventsDto } from './dto/filter-events.dto';
import * as fs from 'fs-extra';
import { GalleriesService } from 'src/features/galleries/galleries.service';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';
import { MetricsService } from '../metrics/metrics.service';
import { MetricDto } from '../metrics/dto/metric.dto';
import { Metric } from '../metrics/entities/metric.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private galleryService: GalleriesService,
    private metricsService: MetricsService
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    try {
      return await this.eventRepository.save({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addTargetMetrics(eventId: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      const metricsDto = dto.map((metric) => ({
        ...metric,
        event: { id: eventId }
      }));
      return await this.metricsService.addTarget(metricsDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async addAchievedMetrics(eventId: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      const metricsDto = dto.map((metric) => ({
        ...metric,
        event: { id: eventId }
      }));
      return await this.metricsService.addAchieved(metricsDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      const event = await this.findOne(id);
      const gallery = await this.galleryService.create(file);
      event.gallery = [...event.gallery, gallery];
      await this.eventRepository.save(event);
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

  async findAll(queryParams: FilterEventsDto): Promise<[Event[], number]> {
    const { page = 1, q, categories } = queryParams;
    const take = 40;
    const skip = (+page - 1) * take;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .orderBy('e.ended_at', 'DESC');
    if (q) query.andWhere('(e.name LIKE :q OR e.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(take).getManyAndCount();
  }

  async findPublished(queryParams: FilterEventsDto): Promise<[Event[], number]> {
    const { page = 1, q, categories } = queryParams;
    const take = 9;
    const skip = (+page - 1) * take;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .andWhere('e.is_published = :is_published', { is_published: true });
    if (q) query.andWhere('(e.name LIKE :q OR e.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(take).orderBy('e.started_at', 'DESC').getManyAndCount();
  }

  async highlight(id: string): Promise<Event> {
    try {
      const event = await this.findOne(id);
      return await this.eventRepository.save({
        ...event,
        is_highlighted: !event.is_highlighted
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async togglePublish(id: string): Promise<Event> {
    try {
      const event = await this.findOne(id);
      return await this.eventRepository.save({
        ...event,
        is_published: !event.is_published
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findRecent(): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        order: { ended_at: 'DESC' },
        relations: ['categories'],
        where: { is_published: true },
        take: 5
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Event> {
    try {
      const event = await this.findOne(id);
      if (event.cover) await fs.promises.unlink(`./uploads/events/${event.cover}`);
      return await this.eventRepository.save({ ...event, cover: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async removeCover(id: string): Promise<Event> {
    try {
      const event = await this.findOne(id);
      if (event.cover) await fs.promises.unlink(`./uploads/events/${event.cover}`);
      return await this.eventRepository.save({ ...event, cover: null });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'program', 'gallery']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'program', 'gallery']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.findOne(id);
      return await this.eventRepository.save({
        id,
        ...dto,
        program: { id: dto.program },
        categories: dto?.categories.map((type) => ({ id: type })) || event.categories
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.eventRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
