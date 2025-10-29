import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../core/users/entities/user.entity';
import { Article } from '../blog/articles/entities/article.entity';
import { Venture } from '../ventures/entities/venture.entity';
import { Program } from '../programs/entities/program.entity';
import { Subprogram } from '../programs/subprograms/entities/subprogram.entity';
import { Project } from '../programs/subprograms/projects/entities/project.entity';
import { Event } from '../programs/subprograms/events/entities/event.entity';
import { IAdminStats } from './types/admin-stats.type';
import { IUSerStats } from './types/user-stats.type';

@Injectable()
export class StatsService {
  constructor(private readonly dataSource: DataSource) {}

  async findAdminStats(): Promise<IAdminStats> {
    const [totalUsers, totalPrograms, totalSubprograms, totalProjects, totalEvents, totalArticles] = await Promise.all([
      this.countUsers(),
      this.countPrograms(),
      this.countSubprograms(),
      this.countProjects(),
      this.countEvents(),
      this.countArticles()
    ]);

    return {
      totalUsers,
      totalPrograms,
      totalSubprograms,
      totalProjects,
      totalEvents,
      totalArticles
    };
  }

  async findUserStats(user: User): Promise<IUSerStats> {
    const [totalVentures, referralsCount] = await Promise.all([
      this.countUserVentures(user.id),
      this.countUserReferrals(user.id)
    ]);

    return { totalVentures, referralsCount };
  }

  private async countUsers(): Promise<number> {
    return await this.dataSource.getRepository(User).count();
  }

  private async countPrograms(): Promise<number> {
    return await this.dataSource.getRepository(Program).count();
  }

  private async countSubprograms(): Promise<number> {
    return await this.dataSource.getRepository(Subprogram).count();
  }

  private async countProjects(): Promise<number> {
    return await this.dataSource.getRepository(Project).count();
  }

  private async countEvents(): Promise<number> {
    return await this.dataSource.getRepository(Event).count();
  }

  private async countArticles(): Promise<number> {
    return await this.dataSource.getRepository(Article).count();
  }

  private async countUserVentures(userId: string): Promise<number> {
    return await this.dataSource.getRepository(Venture).count({
      where: { owner: { id: userId } }
    });
  }

  private async countUserReferrals(userId: string): Promise<number> {
    return await this.dataSource.getRepository(User).count({
      where: { referred_by: { id: userId } }
    });
  }
}
