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

  async create(dto: CreateTypeDto): Promise<EventType> {
    try {
      return await this.typeRepository.save(dto);
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<EventType[]> {
    return await this.typeRepository.find();
  }

  async findOne(id: string): Promise<EventType> {
    try {
      return await this.typeRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: string, dto: UpdateTypeDto): Promise<EventType> {
    try {
      const type = await this.findOne(id);
      return await this.typeRepository.save({ ...type, ...dto });
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
