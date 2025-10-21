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

  async generateMetrics(activity: 'project' | 'event', id: string, indicators: string[]): Promise<void> {
    try {
      const metrics = indicators.map((indicatorId) =>
        this.metricsRepository.create({
          [activity]: { id },
          indicator: { id: indicatorId }
        })
      );
      await this.metricsRepository.save(metrics);
    } catch {
      throw new BadRequestException();
    }
  }

  async findByActivity(activity: 'project' | 'event', id: string): Promise<Metric[]> {
    try {
      return await this.metricsRepository.find({
        where: { [activity]: { id } },
        relations: ['indicator'],
        order: { [activity]: { created_at: 'ASC' } }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async updateMetrics(dto: MetricDto[]): Promise<void> {
    try {
      await Promise.all(dto.map(async (item) => await this.metricsRepository.update(item.id, { ...item })));
    } catch {
      throw new BadRequestException();
    }
  }

  async removeMetric(indicatorId: string): Promise<void> {
    try {
      await this.metricsRepository.delete({ indicator: { id: indicatorId } });
    } catch {
      throw new BadRequestException();
    }
  }
}
