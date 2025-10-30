import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Event } from './entities/event.entity';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';
import { Metric } from '../metrics/entities/metric.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventsDto } from './dto/filter-events.dto';
import { MetricDto } from '../metrics/dto/metric.dto';
import { GalleriesService } from 'src/features/galleries/galleries.service';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly galleryService: GalleriesService,
    private readonly metricsService: MetricsService
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    try {
      const event = this.eventRepository.create({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((id) => ({ id }))
      });
      return await this.eventRepository.save(event);
    } catch {
      throw new BadRequestException();
    }
  }

  async addMetrics(eventId: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      return await this.metricsService.addMetrics('event', eventId, dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(id);
      const galleryDto = {
        image: file.filename,
        event: { id }
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
    const event = await this.findBySlug(slug);
    return event.gallery;
  }

  async findAll(queryParams: FilterEventsDto): Promise<[Event[], number]> {
    const { page = 1, q, categories } = queryParams;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .orderBy('e.ended_at', 'DESC');
    if (q) query.andWhere('(e.name LIKE :q OR e.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query
      .skip((+page - 1) * 40)
      .take(40)
      .getManyAndCount();
  }

  async findPublished(queryParams: FilterEventsDto): Promise<[Event[], number]> {
    const { page = 1, q, categories } = queryParams;
    const skip = (+page - 1) * 40;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .andWhere('e.is_published = :is_published', { is_published: true });
    if (q) query.andWhere('(e.name LIKE :q OR e.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(40).orderBy('e.started_at', 'DESC').getManyAndCount();
  }

  async highlight(id: string): Promise<Event> {
    const event = await this.findOne(id);
    event.is_highlighted = !event.is_highlighted;
    return await this.eventRepository.save(event);
  }

  async togglePublish(id: string): Promise<Event> {
    const event = await this.findOne(id);
    event.is_published = !event.is_published;
    return await this.eventRepository.save(event);
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
      await fs.unlink(`./uploads/events/${event.cover}`);
      return await this.eventRepository.save({
        ...event,
        cover: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'program.program', 'gallery', 'metrics.indicator']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'program', 'gallery']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    try {
      const event = await this.findOne(id);
      return await this.eventRepository.save({
        ...event,
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
      const event = await this.findOne(id);
      await this.eventRepository.softDelete(event.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
