import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { QueryParams } from './types/query-params.type';
import * as fs from 'fs-extra';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async create(dto: CreateEventDto): Promise<{ data: Event }> {
    try {
      await this.throwIfExist(dto.name);
      const data = await this.eventRepository.save({
        ...dto,
        responsible: { id: dto.responsible },
        types: dto.types.map((type) => ({ id: type }))
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la création de l'événement");
    }
  }

  async throwIfExist(name: string): Promise<void> {
    const program = await this.eventRepository.findOne({
      where: { name }
    });
    if (program) throw new BadRequestException("l'événement existe déjà");
  }

  async findIds(): Promise<{ data: Event[] }> {
    const data = await this.eventRepository.createQueryBuilder('e').select(['e.id']).getMany();
    return { data };
  }

  async findAll(queryParams: QueryParams): Promise<{ data: { events: Event[]; count: number } }> {
    const { page, type, eventType } = queryParams;
    const query = this.eventRepository.createQueryBuilder('p').leftJoinAndSelect('p.types', 'types');
    if (type) query.andWhere('types.name = :type', { type });
    if (eventType) query.andWhere('event_type = :eventType', { eventType });
    const take: number = 6;
    const skip = ((page || 1) - 1) * take;
    const events: Event[] = await query.skip(skip).take(take).orderBy('p.ended_at', 'DESC').getMany();
    const count = await query.getCount();
    return { data: { events, count } };
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<{ data: Event }> {
    try {
      const { data: program } = await this.findOne(id);
      if (program.image) await fs.promises.unlink(`./uploads/events/${program.image}`);
      const data = await this.eventRepository.save({ ...program, image: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async findOne(id: string): Promise<{ data: Event }> {
    try {
      const data = await this.eventRepository.findOneOrFail({
        where: { id },
        relations: ['types']
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la récupération de l'événement");
    }
  }

  async update(id: string, dto: UpdateEventDto): Promise<{ data: Event }> {
    try {
      const { data: event } = await this.findOne(id);
      const data = await this.eventRepository.save({
        id,
        ...dto,
        responsible: { id: dto.responsible },
        types: dto?.types.map((type) => ({ id: type })) || event.types
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la modification de l'événement");
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
      throw new BadRequestException("Erreur lors de la suppression de l'événement");
    }
  }
}
