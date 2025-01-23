import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { EventType } from './entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(EventType)
    private typeRepository: Repository<EventType>
  ) {}

  async create(dto: CreateTypeDto): Promise<{ data: EventType }> {
    try {
      const data = await this.typeRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<{ data: EventType[] }> {
    const data = await this.typeRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: EventType }> {
    try {
      const data = await this.typeRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: string, dto: UpdateTypeDto): Promise<{ data: EventType }> {
    try {
      const { data: type } = await this.findOne(id);
      const data = await this.typeRepository.save({ ...type, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la modification du type');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.typeRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le type');
    }
  }
}
