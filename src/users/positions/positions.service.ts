import { BadRequestException, Injectable } from '@nestjs/common';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>
  ) {}

  async create(dto: CreatePositionDto): Promise<Position> {
    try {
      return await this.positionRepository.save({ ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async findOne(id: string): Promise<Position> {
    try {
      const position = await this.positionRepository.findOneOrFail({
        where: { id }
      });
      return position;
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdatePositionDto): Promise<Position> {
    try {
      const position = await this.findOne(id);
      return await this.positionRepository.save({ ...position, ...dto });
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
