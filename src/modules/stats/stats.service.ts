import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Venture } from '../ventures/core/entities/venture.entity';
import { IUSerStats } from './types/user-stats.type';

@Injectable()
export class StatsService {
  constructor(private readonly dataSource: DataSource) {}

  async findUserStats(user: User): Promise<IUSerStats> {
    const [totalVentures, referralsCount] = await Promise.all([
      this.#countUserVentures(user.id),
      this.#countUserReferrals(user.id)
    ]);
    return { totalVentures, referralsCount };
  }

  async #countUserVentures(userId: string): Promise<number> {
    return await this.dataSource.getRepository(Venture).count({
      where: { owner: { id: userId } }
    });
  }

  async #countUserReferrals(userId: string): Promise<number> {
    return await this.dataSource.getRepository(User).count({
      where: { referred_by: { id: userId } }
    });
  }
}
