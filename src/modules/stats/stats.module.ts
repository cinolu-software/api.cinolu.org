import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './services/stats.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
