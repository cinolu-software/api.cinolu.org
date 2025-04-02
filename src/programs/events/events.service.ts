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
      await this.eventRepository.findOneOrFail({
        where: { name: dto.name }
      });
      return await this.eventRepository.save({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((type) => ({ id: type }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find({
      relations: ['categories'],
      order: { ended_at: 'DESC' }
    });
  }

  async findPublished(queryParams: QueryParams): Promise<[Event[], number]> {
    const { page = 1, category } = queryParams;
    const take = 9;
    const skip = (page - 1) * take;
    const query = this.eventRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.categories', 'categories')
      .andWhere('e.is_published = :is_published', { is_published: true });
    if (category) query.andWhere('categories.id = :category', { category });
    return await query.skip(skip).take(take).orderBy('e.started_at', 'DESC').getManyAndCount();
  }

  async publish(id: string): Promise<Event> {
    try {
      await this.eventRepository.update(id, { is_published: true });
      return await this.findOne(id);
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

  async uploadImage(id: string, file: Express.Multer.File): Promise<Event> {
    try {
      const program = await this.findOne(id);
      if (program.image) await fs.promises.unlink(`./uploads/events/${program.image}`);
      return await this.eventRepository.save({ ...program, image: file.filename });
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
