import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { QueryParams } from './utils/query-params.type';
import * as fs from 'fs-extra';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
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

  async findAll(queryParams: QueryParams): Promise<[Event[], number]> {
    const { page = 1, categories } = queryParams;
    const take = 40;
    const skip = (+page - 1) * take;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .orderBy('e.ended_at', 'DESC');
    if (categories) {
      const categoriesArray = categories.split(',');
      query.andWhere('categories.id IN (:categoriesArray)', { categoriesArray });
    }
    return await query.skip(skip).take(take).getManyAndCount();
  }

  async findPublished(queryParams: QueryParams): Promise<[Event[], number]> {
    const { page = 1, categories } = queryParams;
    const take = 9;
    const skip = (+page - 1) * take;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .andWhere('e.is_published = :is_published', { is_published: true });
    if (categories) {
      const categoriesArray = categories.split(',');
      query.andWhere('categories.id IN (:categoriesArray)', { categoriesArray });
    }
    return await query.skip(skip).take(take).orderBy('e.started_at', 'DESC').getManyAndCount();
  }

  async togglePublish(id: string): Promise<Event> {
    try {
      const event = await this.findOne(id);
      await this.eventRepository.update(id, { is_published: !event.is_published });
      return event;
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
        relations: ['categories']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'program']
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

  async restore(id: string): Promise<void> {
    await this.eventRepository.restore(id);
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
