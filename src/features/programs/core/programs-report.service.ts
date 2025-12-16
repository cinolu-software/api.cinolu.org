import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { Indicator } from './entities/indicator.entity';
import { ProgramReport, IndicatorReport, CategoryPerformance } from './types/program-report.type';

@Injectable()
export class ProgramsReportService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>
  ) {}

  async generateReport(year: number): Promise<ProgramReport[]> {
    try {
      const programs = await this.findProgramsByYear(year);
      return programs.map((program) => this.mapProgramToReport(program));
    } catch {
      throw new BadRequestException();
    }
  }

  private async findProgramsByYear(year: number): Promise<Program[]> {
    return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.indicators', 'indicator')
      .leftJoinAndSelect('indicator.metrics', 'metric')
      .where('indicator.year = :year', { year })
      .getMany();
  }

  private mapProgramToReport(program: Program): ProgramReport {
    const indicatorsReport = program.indicators.map((indicator) => this.mapIndicatorToReport(indicator));
    const categoriesPerformance = this.groupIndicatorsByCategory(indicatorsReport);
    return {
      name: program.name,
      categories: categoriesPerformance
    };
  }

  private groupIndicatorsByCategory(indicators: IndicatorReport[]): CategoryPerformance[] {
    const grouped = indicators.reduce(
      (acc, indicator) => {
        const category = indicator.category || 'uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(indicator);
        return acc;
      },
      {} as Record<string, IndicatorReport[]>
    );
    return Object.entries(grouped).map(([category, categoryIndicators]) => ({
      category,
      performance: this.roundToDecimals(this.calculateCategoryPerformance(categoryIndicators))
    }));
  }

  private calculateCategoryPerformance(indicators: IndicatorReport[]): number {
    if (indicators.length === 0) return 0;
    const totalPerformance = indicators.reduce((sum, ind) => sum + ind.performance, 0);
    return totalPerformance / indicators.length;
  }

  private mapIndicatorToReport(indicator: Indicator): IndicatorReport {
    const achieved = this.calculateTotalAchieved(indicator);
    const totalTarget = this.calculateTotalTarget(indicator);
    const performance = this.calculatePerformanceRate(achieved, totalTarget);
    return {
      name: indicator.name,
      target: indicator.target,
      category: indicator.category,
      achieved,
      performance: this.roundToDecimals(performance)
    };
  }

  private calculateTotalAchieved(indicator: Indicator): number {
    return indicator.metrics?.reduce((sum, metric) => sum + (metric.achieved || 0), 0) || 0;
  }

  private calculateTotalTarget(indicator: Indicator): number {
    return indicator.metrics?.reduce((sum, metric) => sum + (metric.target || 0), 0) || 0;
  }

  private calculatePerformanceRate(achieved: number, target: number): number {
    if (target === 0) return 0;
    return (achieved / target) * 100;
  }

  private roundToDecimals(value: number): number {
    return Math.round(value * 10) / 10;
  }
}
