import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { IUSerStats } from './types/user-stats.type';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import { User } from '../../core/users/entities/user.entity';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('user')
  async findUserStats(@CurrentUser() user: User): Promise<IUSerStats> {
    return await this.statsService.findUserStats(user);
  }
}
