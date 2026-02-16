import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { IUSerStats } from './types/user-stats.type';
import { IAdminStatsGeneral, IAdminStatsByYear } from './types/admin-stats.type';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('me')
  async findMyStats(@CurrentUser() user: User): Promise<IUSerStats> {
    return await this.statsService.findUserStats(user);
  }

  @Get('admin/overview')
  @UseRoles({ resource: 'stats', action: 'read' })
  async findAdminOverview(): Promise<IAdminStatsGeneral> {
    return await this.statsService.findAdminStatsGeneral();
  }

  @Get('admin/year/:year')
  @Public()
  async findAdminStatsByYear(@Param('year') year: number): Promise<IAdminStatsByYear> {
    return await this.statsService.findAdminStatsByYear(+year);
  }
}
