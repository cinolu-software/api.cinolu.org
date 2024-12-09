import { BadRequestException, Injectable } from '@nestjs/common';
import { Position } from '../entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>
  ) {}

  async create(dto: CreatePositionDto): Promise<{ data: Position }> {
    try {
      const data = await this.positionRepository.save({ ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Position[] }> {
    const data = await this.positionRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Position }> {
    try {
      const data = await this.positionRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdatePositionDto): Promise<{ data: Position }> {
    try {
      const { data: expertise } = await this.findOne(id);
      const data = await this.positionRepository.save({ ...expertise, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.positionRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
