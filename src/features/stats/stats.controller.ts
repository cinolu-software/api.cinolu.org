import { Controller, Get } from '@nestjs/common';
import { IAdminStats, StatsService } from './stats.service';
import { UseRoles } from 'nest-access-control';

@Controller('stats')
export class StatsController {
  constructor(private highlightsService: StatsService) {}

  @Get()
  @UseRoles({ resource: 'stats', action: 'read' })
  async findAll(): Promise<IAdminStats> {
    return await this.highlightsService.findAdminStats();
  }
}
