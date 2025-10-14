import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicator } from './entities/indicator.entity';

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicator)
    private indicatorRepository: Repository<Indicator>
  ) {}

  async create(dtos: CreateIndicatorDto[]): Promise<Indicator[]> {
    try {
      const indicators = dtos.map((data) => this.indicatorRepository.create(data));
      return await this.indicatorRepository.save(indicators);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeMany(ids: string[]): Promise<void> {
    try {
      await Promise.all(ids.map(async (id) => await this.indicatorRepository.delete(id)));
    } catch {
      throw new BadRequestException();
    }
  }
}
