import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicator } from './entities/indicator.entity';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicator)
    private indicatorRepository: Repository<Indicator>
  ) {}

  async createForEvent(id: string, dto: CreateIndicatorDto): Promise<Indicator> {
    try {
      return await this.indicatorRepository.save({
        ...dto,
        event: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async createForProject(id: string, dto: CreateIndicatorDto): Promise<Indicator> {
    try {
      return await this.indicatorRepository.save({
        ...dto,
        project: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  findByEvent(eventId: string): Promise<Indicator[]> {
    try {
      return this.indicatorRepository.find({
        where: { event: { id: eventId } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  findByProject(projectId: string): Promise<Indicator[]> {
    try {
      return this.indicatorRepository.find({
        where: { project: { id: projectId } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Indicator> {
    try {
      return await this.indicatorRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateIndicatorDto): Promise<Indicator> {
    try {
      const indicator = await this.findOne(id);
      return await this.indicatorRepository.save({ ...indicator, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.indicatorRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
