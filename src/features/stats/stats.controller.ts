import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { UseRoles } from 'nest-access-control';
import { IUSerStats } from './types/user-stats.type';
import { IAdminStats } from './types/admin-stats.type';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../../core/users/entities/user.entity';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('admin')
  @UseRoles({ resource: 'stats', action: 'read' })
  async findAll(): Promise<IAdminStats> {
    return await this.statsService.findAdminStats();
  }

  @Get('user')
  async findUserStats(@CurrentUser() user: User): Promise<IUSerStats> {
    return await this.statsService.findUserStats(user);
  }
}
