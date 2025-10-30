import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from './entities/metric.entity';
import { In, Repository } from 'typeorm';
import { MetricDto } from './dto/metric.dto';

type KeyType = 'event' | 'project';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>
  ) {}

  async addMetrics(key: KeyType, id: string, dto: MetricDto[]): Promise<Metric[]> {
    try {
      const metricsDto = this.prepareMetricsDto(key, id, dto);
      const existingMetrics = await this.fetchExistingMetrics(key, id, metricsDto);
      const updatedOrNewMetrics = this.mergeMetrics(metricsDto, existingMetrics);
      return await this.metricsRepository.save(updatedOrNewMetrics);
    } catch {
      throw new BadRequestException();
    }
  }

  private prepareMetricsDto(key: KeyType, id: string, dto: MetricDto[]): Partial<Metric>[] {
    return dto.map((metric) => ({
      ...metric,
      indicator: { id: metric.indicatorId },
      [key]: { id }
    })) as unknown as Partial<Metric>[];
  }

  private async fetchExistingMetrics(key: KeyType, id: string, dto: Partial<Metric>[]): Promise<Metric[]> {
    const indicatorIds = Array.from(new Set(dto.map((d) => d.indicator.id)));
    return this.metricsRepository.find({
      where: {
        indicator: { id: In(indicatorIds) },
        [key]: { id }
      },
      relations: ['indicator', key]
    });
  }

  private mergeMetrics(metricsDto: Partial<Metric>[], existingMetrics: Metric[]): Metric[] {
    const existingMap = new Map(existingMetrics.map((m) => [m.indicator.id, m]));
    return metricsDto.map((dto) => {
      const existing = existingMap.get(dto.indicator.id);
      if (existing) {
        Object.assign(existing, dto);
        return existing;
      }
      return this.metricsRepository.create(dto);
    });
  }
}
