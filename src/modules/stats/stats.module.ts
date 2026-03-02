import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './services/stats.service';
import { STATS_RBAC_POLICY } from './stats-rbac';
import { RBACModule } from '@/core/auth/rbac/rbac.module';

@Module({
  imports: [RBACModule.forFeature([STATS_RBAC_POLICY])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
