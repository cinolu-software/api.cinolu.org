import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { IUSerStats } from './types/user-stats.type';
import { IAdminStats } from './types/admin-stats.type';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { UseRoles } from 'nest-access-control';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('user')
  async findUserStats(@CurrentUser() user: User): Promise<IUSerStats> {
    return await this.statsService.findUserStats(user);
  }

  @Get('admin')
  @UseRoles({ resource: 'stats', action: 'read' })
  async findAdminStats(): Promise<IAdminStats> {
    return await this.statsService.findAdminStats();
  }
}
