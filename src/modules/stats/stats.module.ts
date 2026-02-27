import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './services/stats.service';
import { STATS_RBAC } from './stats-rbac';

@Module({
  controllers: [StatsController],
  providers: [StatsService, STATS_RBAC]
})
export class StatsModule {}
