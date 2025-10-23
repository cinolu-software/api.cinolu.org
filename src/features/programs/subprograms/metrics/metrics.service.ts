import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from './entities/metric.entity';
import { Repository } from 'typeorm';
import { MetricDto } from './dto/metric.dto';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>
  ) {}

  async addTarget(metricDto: MetricDto[]): Promise<Metric[]> {
    try {
      const metrics = metricDto.map((dto) =>
        this.metricsRepository.create({
          ...dto,
          target: dto.value,
          indicator: { id: dto.id }
        })
      );
      return await this.metricsRepository.save(metrics);
    } catch {
      throw new BadRequestException();
    }
  }

  async addAchieved(metricDto: MetricDto[]): Promise<Metric[]> {
    try {
      const metrics = metricDto.map((dto) =>
        this.metricsRepository.create({
          ...dto,
          achieved: dto.value,
          indicator: { id: dto.id }
        })
      );
      return await this.metricsRepository.save(metrics);
    } catch {
      throw new BadRequestException();
    }
  }
}
